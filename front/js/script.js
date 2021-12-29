// Je récupère Id de la page index.html
const resultat = document.getElementById("items")

// Je donne un nom à mon API
url = `http://localhost:3000/api/products`

// Je créais une variable annonyme pour pouvoir passer ma data dedans
let details;

// J'utilise Fetch pour récupèrer mon API
// Je créais une fonction au chargement de la page pour lancer fetch
function get() {
    fetch(url)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        // Je passe la data dans ma fonction annonyme
                        details = data

                        // Je lance une fonction pour afficher détails
                        affichage()
                    })

            } else {
                // Si erreur je renvois une alerte
                alert("Echec du chargement de données");
                return
            }
        }
        )
}

// Fonction qui lance au chargement de la page
// Je fais la méthode map pour récupérer mes produits
// Et je récupère ma const RESULTAT de la page index.html
// Et j'affiche mes produit dynamiquement
function affichage() {

    resultat.innerHTML =
        details.map((x) =>
            `
                  <a href="./product.html?_id=${x._id}">
                        <article>
                            <img src="${x.imageUrl}" alt="${x.altTxt}">
                            <h3 class="productName">${x.name}</h3>
                            <p class="productDescription">${x.description}</p>
                        </article>
                    </a>
             `
        ).join('')
}

// Fonction qui se charge automatiquement pour récupèrer mon API
get()





