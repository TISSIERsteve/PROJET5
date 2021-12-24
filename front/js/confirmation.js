//Page de confirmation
const orderDiv = document.getElementById("orderId");

//Extraire l'id
const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
console.log(orderId);

//Affichage du numéro de commande 
if (orderId.ok) {
    orderDiv.innerHTML = orderId;

    //Effacer le numéro de commande
    const storage = window.localStorage;
    storage.clear();
} else {
    orderDiv.innerHTML = "Echec de l'enregistrement"
}