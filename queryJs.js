// le stockage dans temporaire fonctionement


 /* recuper et ajouter dans la page vue ou (accueil) */
 //differencier les pages
let titrePage = document.querySelector("title");
let valeurTitre = titrePage.textContent;
let ajouterProduit = document.querySelector("a");

 
 
 /* mes variables superglobales */
 let productScroll = document.querySelector(".productScroll");
 

 let cpt = 0;
 let reponse;
/* fin des variables supergloables */

//déclaration fonction qui insere les elements dans le dom
function recupInserer(){
    //boucle de création insertion
while(cpt < reponse.length){
    let btnAjout = document.createElement("button");
    let linkAjout = document.createElement("a");

    linkAjout.setAttribute("class",reponse[cpt]._id);
    linkAjout.setAttribute("target","_blank");
    btnAjout.textContent = "Ajouter";
    linkAjout.appendChild(btnAjout);

    let divInfo = document.createElement("div");
    divInfo.setAttribute("id","divInfo");
    let article = document.createElement("article");
    let name = document.createElement("h3");
    let imageArticle = document.createElement("img");
    let description = document.createElement("p");
    let prix = document.createElement("h4");
        ///attribution de class et de valeur
    article.setAttribute("class","product");
    imageArticle.setAttribute("src",reponse[cpt].imageUrl);
    name.textContent = reponse[cpt].name;
    prix.textContent = String(reponse[cpt].price);
    description.textContent = reponse[cpt].description;
        ///
    
        ///
    
    article.appendChild(imageArticle);
    
    divInfo.appendChild(name);
    divInfo.appendChild(description);
    divInfo.appendChild(prix);

        // verifier si c'est la page produit ou pas
        if(valeurTitre !== "produit - orinico"){
                productScroll.appendChild(article);
        }else{
                console.log("c'est la page produit");
        }
    
    article.appendChild(divInfo); 
    article.appendChild(linkAjout);  
    console.log(article);

    

    cpt++;
    }            
}

// fontion page produit


function pageProduit(){

}









 // fonction get (recuperer les elements du backend )
 function get(){
     /* variable et fct global à get */

    // inserer dans le dom element recuperer */
    let req = new XMLHttpRequest(); 
    //fonction d'ecoute des requetes
    req.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && 
            this.status == 200){
                //reponse json convertit en objet js
                //la solution c'est recuperer la propriete response
                reponse = JSON.parse(this.response);
                    //appel de la fonction
                          recupInserer();          
            }
        // fin de si
    }
    // fin de la fonction d'ecoute

    req.open("GET","http://localhost:3000/api/cameras");
    req.send();
 }
// fin de fonction get
get();
//appel de la fonction

/* recuperer et ajouter dans la page vue ou accueil */

