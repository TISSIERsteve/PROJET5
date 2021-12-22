// =========================================== ID =============================================================
// Je récupère mes Id de ma page cart.html
const cartItems = document.getElementById("cart__items")
let quantiter = document.getElementById("totalQuantity")
let totalAchats = document.getElementById("totalPrice")

// ===================================== LOCAL STORAGE=========================================================
// Je récupère le localStorage pour pouvoir afficher dans ma page cart.js
const PanierResult = JSON.parse(localStorage.cart)
// console.log(PanierResult);

// ================================= AFFICHAGE QUANTITER ARTICLES ==============================================
// Je filtre à travers mon tableau pour récupérer la quantitée d'articles
let quantiterArticle = 0

PanierResult.filter((x) => {
    // console.log(x.quantiter);
    quantiterArticle += parseInt(x.quantiter)
    // console.log(quantiterArticle);
    quantiter.innerHTML = quantiterArticle
})

// ==================================== AFFICHAGE TOTAL PRIX ==================================================
// Je filtre à travers mon tableau pour récupèrer le prix
let totalPrix = 0

PanierResult.filter((x) => {
    // console.log(x.prix);
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
// console.log(changeQuantiter);

let resultSupplement = 0

// Je fais une boucle pour voyager dans mes class
for (const item of changeQuantiter) {
    // console.log(item);

    item.addEventListener("change", ecouteChangementQuantiter)
    // console.log(item);

    function ecouteChangementQuantiter(e) {
        // console.log(e.target.value);
        e.preventDefault()
        // console.log(item.value)
        let resultSupplement = parseInt(e.target.value)
        console.log(resultSupplement);
        quantiter.innerHTML = resultSupplement

        // Je récupère l'élèments ancêtre le plus proche
        const productId = item.closest('article').dataset.id
        // console.log(productId);

        const productColor = item.closest('article').dataset.color
        // console.log(productColor);

        // Je creais une condition pour les produit à comparer
        const filtre = PanierResult.filter((x) => x.id === productId && x.couleur === productColor)
        // console.log(filtre[0]);

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
// console.log(effacer);

// Je fais une boucle pour voyager dans mes class
for (const item1 of effacer) {

    item1.addEventListener("click", index)
    // console.log(item);

    function index(productId, productColor) {
        PanierResult.splice(
            PanierResult.findIndex((x) => x.id === productId && x.couleur === productColor), 1
        )
        console.log(PanierResult);

        // Je remets à jour mon local Storage
        window.localStorage.setItem("cart", JSON.stringify(PanierResult))
        window.location.reload()
        alert("Votre produit à été supprimé du panier")
    }
}

// ===================================== VALIDATION FORMULAIRE ==================================================
// Je récupère mes Id de mon formulaire
const prenom = document.getElementById("firstName")
const nom = document.getElementById("lastName")
const adresse = document.getElementById("address")
const ville = document.getElementById("city")
const mail = document.getElementById("email")
const erreurprenom = document.getElementById("firstNameErrorMsg")
const erreurNom = document.getElementById("lastNameErrorMsg")
const erreurAdresse = document.getElementById("addressErrorMsg")
const erreurVille = document.getElementById("cityErrorMsg")
const erreurMail = document.getElementById("emailErrorMsg")
const soumettre = document.getElementById("order")

// Ecouteurs d'évenements
prenom.addEventListener("change", VerifFirstName)
nom.addEventListener("change", VerifLastName)
adresse.addEventListener("change", VerifAdress)
ville.addEventListener("change", VerifCity)
mail.addEventListener("change", VerifEmail)
soumettre.addEventListener("click", submit)


// Fonction vérification des champs
function VerifFirstName(e) {
    const acceptPrenom = (/^([^0-9]*)$/)

    if (acceptPrenom.test && (e.target.value.length >= 3)) {
        erreurprenom.innerHTML = "Prenom valide"
        return true

    } else {
        erreurprenom.innerHTML = "Veuillez renseigner un prénom valide"
        return false
    }
}


function VerifLastName(e) {
    const acceptNom = (/^([^0-9]*)$/)

    if (acceptNom.test && (e.target.value.length > 3)) {
        erreurNom.innerHTML = "Nom valide"
        return true

    } else {
        erreurNom.innerHTML = "Veuillez renseigner un nom valide"
        return false
    }
}

function VerifAdress(e) {
    const acceptAdress = (/^[a-zA-Z0-9\s,.'-]{3,}$/)

    if (acceptAdress.test && (e.target.value.length > 5)) {
        erreurAdresse.innerHTML = "Adresse valide"
        return true

    } else {
        erreurAdresse.innerHTML = "Veuillez renseigner une adresse valide"
        return false
    }
}

function VerifCity(e) {
    const acceptVille = (/^[a-zA-Z0-9\s,.'-]{3,}$/)

    if (acceptVille.test && (e.target.value.length >= 3)) {
        erreurVille.innerHTML = "Ville valide"
        return true

    } else {
        erreurVille.innerHTML = "Veuillez renseigner une Ville valide"
        return false
    }
}

function VerifEmail(e) {
    const acceptEmail = (/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)

    if (acceptEmail.test(e.target.value)) {
        erreurMail.innerHTML = "E-mail valide"
        return true

    } else {
        erreurMail.innerHTML = "Veuillez renseigner un E-mail valide"
        return false
    }
}

// Fonction pour envoyer à l'api

function submit(e) {
    // e.preventDefault()

    if (VerifFirstName.test && VerifLastName.test && VerifAdress.test && VerifCity.test && VerifEmail.test) {

        const produitValid = PanierResult.map((x) => x)
        // console.log(produitValid);

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produitValid),
        })
            .then((res) => res.json())
            .then((res) => {

                window.location.replace(`./confirmation.html?id=${res.orderId}`);
            })
            .catch((error) => console.log(error));
    }

    else {
        console.log("erreur");
    }

}




