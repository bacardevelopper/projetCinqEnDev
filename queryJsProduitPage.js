let productPage = document.querySelector(".productPage");
function testerProduit(){
    let produitAjouterPage = JSON.parse(localStorage.getItem("produitStorage"));
    let iPcpt = 0;
    console.log(produitAjouterPage.length);
    if(produitAjouterPage.length !== 0){
        while(iPcpt < produitAjouterPage.length){

            let articleProduit = document.createElement("article");
            let imageProduit = document.createElement("img");
            let prixProduit = document.createElement("span"); 
            let nameProduit = document.createElement("span");
            let description = document.createElement("p");;
            let divProduit = document.createElement("div");
            divProduit.setAttribute("class","boite");
            let convertPrix = String(produitAjouterPage[iPcpt].prix);
            imageProduit.setAttribute("src", produitAjouterPage[iPcpt].url);
            prixProduit.textContent = convertPrix;
            nameProduit.textContent = produitAjouterPage[iPcpt].nom;
            description.textContent = produitAjouterPage[iPcpt].description;
    
            articleProduit.appendChild(imageProduit);
            articleProduit.appendChild(nameProduit);
            articleProduit.appendChild(prixProduit);
            articleProduit.appendChild(description);
            
            divProduit.appendChild(articleProduit)
            productPage.appendChild(divProduit);
            iPcpt++;
        }
    }

}

testerProduit();




////////////////////////////////////////////////////////////////////////////////////






/* déclarer des une fonction qui recupere et qui met dans le panier */

////

function panierGestion(){
    //recuperer la table produit storage et mis en objet js
    let pSJSON = JSON.parse(localStorage.getItem("produitStorage"));
    let panierPersist = [];

    //données creer
    localStorage.setItem("panierAttente", JSON.stringify(pSJSON));
    localStorage.setItem("panierValider", JSON.stringify(panierPersist));

    let panierPersistRecup = localStorage.getItem("panierValider");
    let pPrP = JSON.stringify(panierPersistRecup);
    let panierAttente = localStorage.getItem("panierAttente");



    
    if(pSJSON.length > 0){
        console.log(" element tester "+pSJSON.length);

            for(let num = 0; num < pSJSON.length; num++){
                if(panierPersistRecup.length >= 0){
                    if(pSJSON[num].cle !== pPrP[num].cle){
                        console.log("la comparaison marche");
    
                        panierPersist.push(pSJSON[num]);
                        localStorage.setItem("panierValider", JSON.stringify(panierPersist));
                    }
                }
                
            }
    }else{

    }
}

panierGestion();


