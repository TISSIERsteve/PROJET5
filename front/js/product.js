// Récupère les élèments avec leur Id
const item = document.querySelector(".item")

// Récupère le produit par son Id
const search = new URLSearchParams(location.search)
const obtenir = search.get("_id")

url2 = `http://localhost:3000/api/products/${obtenir}`

// Récupèrer détails du produit avec fetch
function get2() {
    fetch(url2)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        console.log("chargement réussis détails produits");
                        // console.log(data);
                        affichage2(data)

                        // console.log(data.colors);
                        for (const user of data.colors) {
                            const choixCouleur = document.getElementById("colors")
                            // console.log(choixCouleur);
                            // console.log(user);
                            choixCouleur.innerHTML += `<option value="${user}">${user}</option>`
                        }
                    })
            } else {
                console.log("Echec chargement détails produits");
                return
            }
        }
        )
}

// Détails produits
function affichage2(infos) {

    item.innerHTML =

        `
        <article>
                    <div class="item__img">
                        <img src="${infos.imageUrl}" alt="${infos.name}"> 
                    </div>
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

    // Récupère id
    const addToCart = document.getElementById("addToCart")
    const quantiter = document.getElementById("quantity")
    const couleur = document.getElementById("colors")

    // =============== COULEUR ============================
    // Function récupère couleur
    couleur.addEventListener("click", color)

    // =====Evenement=====
    // Mis la première couleur par défaut car change ne fonctionne pas bien sinon
    let resultColor = `${infos.colors[0]}`
    // console.log(resultColor);

    function color(e) {
        resultColor = e.target.value
        // console.log(resultColor);
    }

    // =============== QUANTITER ==============================
    // Function récupère quantiter
    quantiter.addEventListener("change", number)

    // =====Evenement=====
    // Mis la quantitée à 0 par défaut
    let resultNumber = 0

    function number(e) {
        resultNumber = e.target.value
        // console.log(resultNumber);
    }

    // ================ AJOUT LOCAL STORAGE ================================
    // Function ajout Local Storage
    addToCart.addEventListener("click", ajouter)

    function ajouter() {

        if (resultNumber <= 0) {
            alert("Veuillez renseigner une quantitée supérieure à zéro");
            console.log("Veuillez renseigner une quantitée supérieure à zéro");
            return
        }

        const details = {
            image: `${infos.imageUrl}`,
            nom: `${infos.name}`,
            prix: `${infos.price}`,
            couleur: resultColor,
            quantiter: resultNumber
        }

        let cart = []
        const storageCart = JSON.parse(localStorage.getItem("cart"))

        if (storageCart && storageCart.length) {
            cart = JSON.parse(localStorage.getItem("cart"))
            // console.log(cart);

            const filtre = cart.filter((x) => x.nom === infos.name && x.couleur === resultColor)

            // console.log(cart);
            if (filtre && filtre.length) {
                filtre[0].quantiter++

            } else {
                cart.push(details)
            }

            alert("Vous venez d'ajouter au panier" + " " + `${infos.name}` + " de couleur" + " " + resultColor);
            console.log(cart);
            localStorage.setItem("cart", JSON.stringify(cart))
            return

        } else {
            cart.push(details)
            localStorage.setItem("cart", JSON.stringify(cart))
            alert("Vous venez d'ajouter au panier" + " " + `${infos.name}` + " de couleur" + " " + resultColor);
            console.log(cart);
            return
        }

    }
}
get2()


