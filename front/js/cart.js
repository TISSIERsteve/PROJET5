// Je récupère mes Id
const cartItems = document.getElementById("cart__items")
let quantiter = document.getElementById("totalQuantity")

let quantiterArticle = 0

// Je récupère le localStorage
const PanierResult = JSON.parse(localStorage.cart)
// console.log(PanierResult);

PanierResult.forEach((x) => filtre = (x.prix))
console.log(filtre);

// Je map le la const du localStorage
cartItems.innerHTML = PanierResult.map((x) =>
    `

             <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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