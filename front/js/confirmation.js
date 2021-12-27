//Page de confirmation
const numberCommande = document.getElementById("orderId");

//Extraire l'id
const params = new URLSearchParams(window.location.search);
const Id = params.get("id");
console.log(Id);

//Affichage du numéro de commande 
if (Id.ok) {
    numberCommande.innerHTML = Id;

    //Effacer le numéro de commande
    // const storage = window.localStorage;
    // storage.clear();
} else {
    numberCommande.innerHTML = "Echec de l'enregistrement"
}