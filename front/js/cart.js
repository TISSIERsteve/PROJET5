// ======================= ID ========================================
// Je récupère mes Id de ma page cart.html
const cartItems = document.getElementById("cart__items")
let quantiter = document.getElementById("totalQuantity")
let totalAchats = document.getElementById("totalPrice")

// ====================== LOCAL STORAGE===============================
// Je récupère le localStorage pour pouvoir afficher dans ma page cart.js
const PanierResult = JSON.parse(localStorage.cart)
// console.log(PanierResult);

// ====================== AFFICHAGE QUANTITER ARTICLES ===============
// Je filtre à travers mon tableau pour récupérer la quantitée d'articles
let quantiterArticle = 0

PanierResult.filter((x) => {
    // console.log(x.quantiter);
    quantiterArticle += parseInt(x.quantiter)
    // console.log(quantiterArticle);
    quantiter.innerHTML = quantiterArticle
})

// ====================== AFFICHAGE TOTAL PRIX =======================
// Je filtre à travers mon tableau pour récupèrer le prix
let totalPrix = 0

PanierResult.filter((x) => {
    // console.log(x.prix);
    totalPrix += parseInt(x.prix)
    totalAchats.innerHTML = totalPrix
})

// =============== AFFICHAGE DYNAMIQUE DE LA PAGE CART.JS ============
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

// ============= MODIFICATION DE LA QUANTITER SUR LA PAGE DYNAMIQUE ===================
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

        for (i of PanierResult) {
            // console.log([i]);
            // console.log("Nom :" + i.nom);
            // console.log("Prix :" + i.prix);
            // console.log("Couleur :" + i.couleur)
            // console.log("Quantiter :" + parseInt(i.quantiter))
            // // console.log("Quantiter :" + resultSupplement)
            // console.log("Identifiant :" + i.id)
            // if (i.id === x.id) {
            //     console.log('identique');
            // }
        }
    }
}
