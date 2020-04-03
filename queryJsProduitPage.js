/* déclaration des variables globaux */
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

function changementEtatEnr(){
    // variable qui recuperer definitivement les produits
    let store = localStorage.getItem("produitStorage");

    
    
    let clickO = document.querySelector(".lol");
        clickO.addEventListener("click", ()=>{
            let storeDef = localStorage.setItem("definitif", store);
    });
    


}

changementEtatEnr();
