//Page de confirmation
const numeroCommande = document.getElementById("orderId");

//Extraire l'id
const params = new URLSearchParams(window.location.search);
const numeroId = params.get("id");
console.log(numeroId);

//Affichage du numéro de commande 
if (numeroId) {
    numeroCommande.innerHTML = numeroId;

    //Effacer le numéro de commande
    const storage = window.localStorage;
    storage.clear();
}