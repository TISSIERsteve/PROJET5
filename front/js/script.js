// J récupère Id de la page index.html
const resultat = document.getElementById("items")

// Je donne un nom à mon adresse
url = `http://localhost:3000/api/products`
console.log(url);


// Je créais une variable annonyme pour pouvoir passer ma data dedans
let details;

// J'utilise la méthode Fetch pour récupèrer mon url
// Je créais une fonction au chargement de la page avec la méthode fetch

function get() {
    fetch(url)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        console.log("Chargement API réussi");
                        console.log(data);
                        // Je passe la data dans ma fonction annonyme
                        details = data

                        // Je lance une fonction pour afficher détails
                        affichage()
                    })

            } else {
                // Si erreur je renvois un console log erreur
                console.log("Echec du chargement de l API");
                return
            }
        }
        )
}

// Je fais la méthode map pour récupérer mes produits
// avec la fonction qui lance au chargement de la page
// Et je récupère ma const avec Id de la page index.html
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

// Fonction qui se charge automatiquement pour récupèrer mon api
get()





