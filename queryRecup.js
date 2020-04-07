/* fonction recup et ajouter dans la page proudit */
//varaible superglobales
let produitPage = document.querySelector(".produitPage");
console.log(produitPage);

function recupAjouterPageProduit(){
    let cpt = 0;

    //boucle de création insertion
    while(cpt < localStorage.length){
        console.log(localStorage.getItem(localStorage.key(cpt)));

        let elementRecupStorage = JSON.parse(localStorage.getItem(localStorage.key(cpt)));
        let linkAjoutPp = document.createElement("a");

        linkAjoutPp.setAttribute("class",elementRecupStorage.id);
        linkAjoutPp.textContent = "Personnaliser";
        
        let divInfoPp = document.createElement("div");
        divInfoPp.setAttribute("id","divInfo");
        let articlePp = document.createElement("article");
        let namePp = document.createElement("h3");
        let imageArticlePp = document.createElement("img");
        let descriptionPp = document.createElement("p");
        let prixPp = document.createElement("h4");
        
            ///attribution de class et de valeur
        
        imageArticlePp.setAttribute("src",elementRecupStorage.urlimg);
        namePp.textContent = elementRecupStorage.nom;
        prixPp.textContent = String(elementRecupStorage.prix);
        descriptionPp.textContent = elementRecupStorage.description;
        
        divInfoPp.appendChild(imageArticlePp);
        divInfoPp.appendChild(namePp);
        divInfoPp.appendChild(descriptionPp);
        divInfoPp.appendChild(prixPp);
        divInfoPp.appendChild(linkAjoutPp);

        produitPage.appendChild(divInfoPp);

        cpt++;
        }
}
//appel 
recupAjouterPageProduit();
