const resultat = document.getElementById("items")

url = `http://localhost:3000/api/products`

let details;

// Fetch
// Je créais une fonction au chargement de la page avec la méthode 
// fetch pour récupérer mon api 

function get() {
    fetch(url)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        console.log("Chargement API réussi");
                        console.log(data);
                        details = data

                        // Je lance une fonction pour afficher détails
                        affichage()
                    })
            } else {
                console.log("Echec du chargement de l API");
                return
            }
        }
        )
}

// Je fais la méthode map pour récupérer mes produits
function affichage() {

    resultat.innerHTML =
        details.map((x) =>
            `
                  <a href="./product.html?_id=${x._id}">
                        <article>
                            <img src="${x.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                            <h3 class="productName">${x.name}</h3>
                            <p class="productDescription">${x.description}</p>
                        </article>
                    </a>
             `
        ).join('')
}
get()





