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
        // console.log(PanierResult);

        // Je remets à jour mon local Storage
        window.localStorage.setItem("cart", JSON.stringify(PanierResult))
        window.location.reload()
        alert("Votre produit à été supprimé du panier")
    }
}

// ===================================== VALIDATION FORMULAIRE ==================================================
// Ecouteurs d'évenements
// prenom.addEventListener("change", VerifFirstName)
// nom.addEventListener("change", VerifLastName)
// adresse.addEventListener("change", VerifAdress)
// ville.addEventListener("change", VerifCity)
// mail.addEventListener("change", VerifEmail)

// ===================================== FONCTIONS VERIFICATION DES CHAMPS======================================


function verif() {

    // =================== Prenom ===================
    const acceptPrenom = (/^[a-zA-Z ,.'-]+$/)

    firstName.addEventListener("change", (e) => {
        if (acceptPrenom.test(e.target.value) && (e.target.value.length >= 3)) {
            document.getElementById("firstNameErrorMsg").innerHTML = "Prénom valide"
        } else {
            document.getElementById("firstNameErrorMsg").innerHTML = "Prénom invalide"
        }
    })

    // =================== Nom ===================
    const acceptNom = (/^[a-zA-Z ,.'-]+$/)

    lastName.addEventListener("change", (e) => {
        if (acceptNom.test(e.target.value) && (e.target.value.length >= 3)) {
            document.getElementById("lastNameErrorMsg").innerHTML = "Nom valide"
        } else {
            document.getElementById("lastNameErrorMsg").innerHTML = "Nom invalide"
        }
    })

    // =================== Adresse ===================
    const acceptAdress = (/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/)

    address.addEventListener("change", (e) => {
        if (acceptAdress.test(e.target.value) && (e.target.value.length >= 3)) {
            document.getElementById("addressErrorMsg").innerHTML = "Adresse valide"
        } else {
            document.getElementById("addressErrorMsg").innerHTML = "Adresse invalide"
        }
    })

    // =================== Ville ===================
    const acceptVille = (/^[a-zA-Z0-9\s,.'-]{3,}$/)

    city.addEventListener("change", (e) => {
        if (acceptVille.test(e.target.value) && (e.target.value.length >= 3)) {
            document.getElementById("cityErrorMsg").innerHTML = "Ville valide"
        } else {
            document.getElementById("cityErrorMsg").innerHTML = "Ville invalide"
        }
    })

    // =================== E-mail ===================
    const acceptEmail = (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)

    email.addEventListener("change", (e) => {
        if (acceptEmail.test(e.target.value) && (e.target.value.length >= 3)) {
            document.getElementById("emailErrorMsg").innerHTML = "E-mail valide"
        } else {
            document.getElementById("emailErrorMsg").innerHTML = "E-mail invalide"
        }
    })

}
verif()
//================================ FONCTION POUR ALLER SUR LA PAGE CONFIRMATION ===============================
const arrayInfosClient =
    products = PanierResult.map((x) => x.id);

console.log(arrayInfosClient);


// Je creais un stockage dans le local Je récupère mon Id dans une const
const storage = window.localStorage;
console.log(storage);

//  Je récupère mon Id dans une const



// Je creais ma méthode POST
const init2 = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        NuméroId: products,
        Clients: '',
    }),

};
console.log(init2.body);

//requête POST sur l'API et récupération de l'id de commande
const soumettre = document.querySelector(".cart__order__form")
soumettre.addEventListener("submit", () => {

    if (init2.ok) {
        fetch("http://localhost:3000/api/products/order", init2)
            .then(() => {
                console.log("Data envoyer sur POST ORDER API");

                window.location.replace(`./confirmation.html?id=${res.orderId}`);
            })

    } else {
        console.log("Erreur avec la méthode Post");
    }

})






