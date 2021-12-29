// =========================================== ID =============================================================
// Je récupère mes Id de ma page cart.html
const cartItems = document.getElementById("cart__items")
let quantiter = document.getElementById("totalQuantity")
let totalAchats = document.getElementById("totalPrice")

// ===================================== LOCAL STORAGE=========================================================
// Je récupère le localStorage pour pouvoir afficher dans ma page cart.js
if (!localStorage.cart) {
    alert("Panier vide")
} else {

    const PanierResult = JSON.parse(localStorage.cart)

    // ================================= AFFICHAGE QUANTITER ARTICLES ==============================================
    // Je filtre à travers mon tableau pour récupérer la quantitée d'articles
    let quantiterArticle = 0

    PanierResult.filter((x) => {
        quantiterArticle += parseInt(x.quantiter)

        quantiter.innerHTML = quantiterArticle
    })

    // ==================================== AFFICHAGE TOTAL PRIX ==================================================
    // Je filtre à travers mon tableau pour récupèrer le prix
    let totalPrix = 0

    PanierResult.filter((x) => {
        totalPrix += parseInt(x.prix * x.quantiter)
        totalAchats.innerHTML = totalPrix
    })

    // ============================== AFFICHAGE DYNAMIQUE DE LA PAGE CART.JS ======================================
    // Je map la const du localStorage que j'ai créer au dessus
    cartItems.innerHTML = PanierResult.map((x) =>

        `
            <article class="cart__item" data-id="${x.id}" data-color="${x.couleur}">
                <div class="cart__item__img">
                  <img src="${x.image}" alt="">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${x.nom}</h2>
                    <p>${x.couleur}</p>
                    <p>${x.prix} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${x.quantiter}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article> 
    `
    ).join('')

    // ============================ MODIFICATION DE LA QUANTITER SUR LA PAGE DYNAMIQUE ============================
    // Je récupère mes class
    const changeQuantiter = document.querySelectorAll(".itemQuantity")

    let resultSupplement = 0

    // Je fais une boucle pour voyager dans mes class
    for (const item of changeQuantiter) {

        item.addEventListener("change", ecouteChangementQuantiter)

        function ecouteChangementQuantiter(e) {
            e.preventDefault()

            let resultSupplement = parseInt(e.target.value)
            if (resultSupplement <= 0 || resultSupplement > 100) {
                alert("Veuillez renseigner une quantitée 1 et 100")

                window.location.reload()
                return
            }
            quantiter.innerHTML = resultSupplement

            // Je récupère l'élèments ancêtre le plus proche pour la quantitée el la couleur
            const productId = item.closest('article').dataset.id

            const productColor = item.closest('article').dataset.color

            // Je creais une condition pour les produit à comparer
            const filtre = PanierResult.filter((x) => x.id === productId && x.couleur === productColor)

            if (filtre && filtre.length) {
                filtre[0].quantiter = resultSupplement
            }

            // Je remets à jour mon local Storage
            window.localStorage.setItem("cart", JSON.stringify(PanierResult))
            window.location.reload()

        }
    }

    // ===================================== FONCTION SUPPRIMER PRODUIT ============================================
    // Je récupère mes class
    const effacer = document.querySelectorAll(".deleteItem")

    // Je fais une boucle pour voyager dans mes class
    for (const item1 of effacer) {

        item1.addEventListener("click", index)

        function index(productId, productColor) {
            PanierResult.splice(
                PanierResult.findIndex((x) => x.id === productId && x.couleur === productColor), 1
            )

            // Je remets à jour mon local Storage
            window.localStorage.setItem("cart", JSON.stringify(PanierResult))
            window.location.reload()
            alert("Votre produit à été supprimé du panier")
        }
    }
    // =========================== FONCTION VERIFICATION DES CHAMPS FORMULAIRE ======================================
    // Fonction qui s'effectue au chargement de la page
    function verif() {

        // =================== Prenom ===================
        acceptPrenom = (/^[a-zA-Z ,.'-]+$/)

        firstName.addEventListener("change", (e) => {
            if (acceptPrenom.test(e.target.value) && (e.target.value.length >= 3)) {
                document.getElementById("firstNameErrorMsg").innerHTML = "Prénom valide"
            } else {
                document.getElementById("firstNameErrorMsg").innerHTML = "Prénom invalide"
            }
        })

        // =================== Nom ===================
        acceptNom = (/^[a-zA-Z ,.'-]+$/)

        lastName.addEventListener("change", (e) => {
            if (acceptNom.test(e.target.value) && (e.target.value.length >= 3)) {
                document.getElementById("lastNameErrorMsg").innerHTML = "Nom valide"
            } else {
                document.getElementById("lastNameErrorMsg").innerHTML = "Nom invalide"
            }
        })

        // =================== Adresse ===================
        acceptAdress = (/^[a-zA-Z ,.'-]+$/)

        address.addEventListener("change", (e) => {
            if (acceptAdress.test(e.target.value) && (e.target.value.length >= 3)) {
                document.getElementById("addressErrorMsg").innerHTML = "Adresse valide"
            } else {
                document.getElementById("addressErrorMsg").innerHTML = "Adresse invalide"
            }
        })

        // =================== Ville ===================
        acceptVille = (/^[a-zA-Z0-9\s,.'-]{3,}$/)

        city.addEventListener("change", (e) => {
            if (acceptVille.test(e.target.value) && (e.target.value.length >= 3)) {
                document.getElementById("cityErrorMsg").innerHTML = "Ville valide"
            } else {
                document.getElementById("cityErrorMsg").innerHTML = "Ville invalide"
            }
        })

        // =================== E-mail ===================
        acceptEmail = (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)

        email.addEventListener("change", (e) => {
            if (acceptEmail.test(e.target.value) && (e.target.value.length >= 3)) {
                document.getElementById("emailErrorMsg").innerHTML = "E-mail valide"
            } else {
                document.getElementById("emailErrorMsg").innerHTML = "E-mail invalide"
            }
        })
    }
    verif()

    // =================== Condition pour vérifier si il y a un achats ===================
    // Condition au submit du formulaire
    // Si panier vide
    if (PanierResult.length <= 0) {
        alert("Votre panier est vide")

        // =================== Submit ===================
        // Sinon au submit
    } else {
        const form = document.querySelector(".cart__order__form")

        form.addEventListener("submit", (e) => {

            if (acceptPrenom.test(firstName.value) &&
                acceptNom.test(lastName.value) &&
                acceptAdress.test(address.value) &&
                acceptVille.test(city.value) &&
                acceptEmail.test(email.value)) {

                validation(e)
            } else {
                alert("Veuillez remplir les champs correctement")
            }
        })

    }
    // ============== Récapitulatif commande ====================
    const validation = (e) => {
        e.preventDefault()

        // Je récupére mes Id
        let firstName = document.getElementById("firstName")
        let lastName = document.getElementById("lastName")
        let address = document.getElementById("address")
        let city = document.getElementById("city")
        let email = document.getElementById('email')

        // Je faits un tableau pour savoir qui à pris quoi
        const clients = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,

            },
            products: PanierResult.map((x) => (x.id))
        }

        // =================== Objet local storage clients ===================
        // Je fais un fetch avec POST
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                clients
            ),
        })
            .then((res) => res.json())
            .then((res) => {

                // Je remplace l'adresse http par mon id de mon api et renvois sur la page confirmation
                alert("Commande validée");
                window.location.replace(`./confirmation.html?id=${res.orderId}`);

            })
            .catch((error) => {
                alert("Erreur sur la validation de la commande");
            })
    }
}
