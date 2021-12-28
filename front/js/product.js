// Récupère l'élèment avec la class de la page product.html
const item = document.querySelector(".item")

// Récupère le produit par son Id pour afficher le produit et ses détails
const search = new URLSearchParams(location.search)
const obtenir = search.get("_id")

// Je donne un nom à mon adresse
url2 = `http://localhost:3000/api/products/${obtenir}`

// J'utilise Fetch pour récupèrer mon url
// Je créais une fonction au chargement de la page pour lancer fetch

function get2() {
    fetch(url2)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {

                        // Je passe ma data dans ma fonction
                        affichage2(data)

                        // Je fais une boucle dans la data du produit pour récupèrer ses différentes couleurs
                        for (const user of data.colors) {
                            const choixCouleur = document.getElementById("colors")

                            // Je renvois les couleurs dynamiquement avec la const
                            choixCouleur.innerHTML += `<option value="${user}">${user}</option>`
                        }
                    })
            } else {
                alert("Echec chargement détails produits");
                return
            }
        }
        )
}

// Détails produits
function affichage2(infos) {

    // J'affiche dynamiquement les infos du produit avec la const
    item.innerHTML =

        `
        <article>
                    <div class="item__img">
                        <img src="${infos.imageUrl}" alt="${infos.altTxt}"> 
                    </div >
        <div class="item__content">

            <div class="item__content__titlePrice">
                <h1 id="title">
                    ${infos.name}
                </h1>
                <p>Prix : <span id="price">
                    ${infos.price}
                </span>€</p>
            </div>

            <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">
                    ${infos.description}
                </p>
            </div>

            <div class="item__content__settings">
                <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors">

                    </select>
                </div>

                <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
            </div>

            <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
            </div>
        </div>
                </article >
        `
    // _________________________________LOCAL STORAGE__________________________________________

    // ================= ID ========================
    // Récupère id
    const addToCart = document.getElementById("addToCart")
    const quantiter = document.getElementById("quantity")
    const couleur = document.getElementById("colors")

    // =============== COULEUR ============================
    // Function récupère couleur
    couleur.addEventListener("click", color)

    function color(e) {
        resultColor = e.target.value
    }

    // Je lui met la premiére couleur par défaut
    let resultColor = `${infos.colors[0]} `;

    // =============== QUANTITER ==============================
    // Function récupère quantiter
    quantiter.addEventListener("change", number)

    // Mis la quantitée à 0 par défaut
    let resultNumber = 0

    function number(e) {
        resultNumber = parseInt(e.target.value)
    }

    // ================ AJOUT LOCAL STORAGE ================================
    // Function ajout Local Storage
    addToCart.addEventListener("click", ajouter)

    function ajouter() {

        // Condition si la quantitée n'est pas renseigner
        if (resultNumber <= 0 || resultNumber > 100) {
            alert("Veuillez renseigner une quantitée entre 1 et 100");

            return
        }

        const details = {
            id: `${infos._id}`,
            image: `${infos.imageUrl}`,
            nom: `${infos.name}`,
            prix: `${infos.price}`,
            couleur: resultColor,
            quantiter: resultNumber
        }

        // Je créais un tableau vide si plusieurs achats
        let cart = []

        // Je créais une const stockage avec get item
        const storageCart = JSON.parse(localStorage.getItem("cart"))

        // Je fais une condition pour vérifier d'abord si mon tableau est vide
        if (storageCart && storageCart.length) {
            cart = JSON.parse(localStorage.getItem("cart"))

            // Je filtre dans mon array cart si plusierurs achats du même genre pour éviter trop de ligne d'achats
            // Et je le met dans une const
            const filtre = cart.filter((x) => x.nom === infos.name && x.couleur === resultColor)

            // Condition je récupère la quantitée
            if (filtre && filtre.length) {
                filtre[0].quantiter++

            } else {
                cart.push(details)
            }

            alert("Vous venez d'ajouter au panier" + " " + `${infos.name} ` + " de couleur" + " " + resultColor);
            localStorage.setItem("cart", JSON.stringify(cart))
            return

        } else {
            cart.push(details)
            localStorage.setItem("cart", JSON.stringify(cart))
            alert("Vous venez d'ajouter au panier" + " " + `${infos.name} ` + " de couleur" + " " + resultColor);

            return
        }
    }
}
get2()


