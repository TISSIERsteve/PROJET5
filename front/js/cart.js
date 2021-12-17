// ======================= ID ========================================
// Je récupère mes Id de ma page cart.html
const cartItems = document.getElementById("cart__items")
let quantiter = document.getElementById("totalQuantity")
let totalAchats = document.getElementById("totalPrice")

// ====================== LOCAL STORAGE===============================
// Je récupère le localStorage pour pouvoir afficher dans ma page cart.js
const PanierResult = JSON.parse(localStorage.cart)
console.log(PanierResult);

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
    console.log(x.prix);
    totalPrix += parseInt(x.prix) * quantiterArticle
    totalAchats.innerHTML = totalPrix
})

// =============== AFFICHAGE DYNAMIQUE DE LA PAGE CART.JS ============
// Je map le la const du localStorage que j'ai créer au dessus
cartItems.innerHTML = PanierResult.map((x) =>

    `
            <article class="cart__item" data-id="${x._id}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${x.image}" alt="Photographie d'un canapé">
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
// Je récupère ma class
const changeQuantiter = document.querySelector(".itemQuantity")
// console.log(changeQuantiter.value);

changeQuantiter.addEventListener("change", ecouteChangementQuantiter)

function ecouteChangementQuantiter(e) {
    e.preventDefault()
    for (i of PanierResult) {

        console.log(i.id);
    }

}