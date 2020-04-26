//declaration
let produitPage = document.querySelector(".produitPage")
//recuperation de l'url actuelle
var parsedUrl = new URL(window.location);
//recuperation du hash de l'url actuelle
console.log(parsedUrl.hash);
let urlHashTag = parsedUrl.hash;

console.log("le hash : "+urlHashTag);
let tabHash = Array.from(urlHashTag);
console.log(tabHash.shift());
//supprimer le premier element du tabaleaux
let tabSimple = tabHash.splice(0);
//convertit tableaux en chaine de caracteres
let idSansHash = tabSimple.join("");
let idSansHashString = String(idSansHash); 
///////////////////////////////////////////////////
console.log(" id sans hash "+idSansHash);
///////////////////////////////////////////////////
//fonction affichage d'erreur
let bodyElt = document.body;
let messageDerreur = document.createElement("h6");
    messageDerreur.setAttribute("id","erreur");
    messageDerreur.textContent = "selectionner produit à l'accueil";

    function erreurMsg(){
        setTimeout(function(){
            bodyElt.appendChild(messageDerreur);
        }, 500);

        setTimeout(function(){
            bodyElt.removeChild(messageDerreur);
        }, 8400);
        
    }

if(idSansHash !== ""){
    console.log("produit selectionner");
}else{
    erreurMsg();
    console.log("produit non selectionner");
}

//fonction recuper et ajouter dans le panier storage
function ajouterPanier(){
    let cleMagique = Math.random() * 10;
    //class pour instancier les objets à ajouter au panier
    class ProduitAjout{
        constructor(id){
            this.id = id;
        }
    }
    //evenement qui recuperer et ajoute au panier
    document.addEventListener("click", function(e){
        let attributeVerif = e.target.getAttribute("class");
        if(attributeVerif === reponse._id){
            let ajoutPorduitStroage = new ProduitAjout(reponse._id);
            localStorage.setItem("panier"+cleMagique, JSON.stringify(ajoutPorduitStroage));
            cleMagique = Math.random() * 10;
        }
    });
}
//fin de fonction ajout au panier (storage)

/* fonction recuperer et ajoute dans la page de personnalisation */
async function recupArticleUrl(){
    if(idSansHash !== ""){
        // inserer dans le dom element recuperer */
     let req = new XMLHttpRequest(); 
     //fonction d'ecoute des requetes
     req.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE && 
             this.status == 200){
                 //reponse json convertit en objet js
                 //la solution c'est recuperer la propriete response
                 reponse = JSON.parse(this.response);
                     //appel de la fonction affiche produit et personnaliser
                        let linkAjout = document.createElement("a");
 
                        linkAjout.setAttribute("class",reponse._id);
                        linkAjout.setAttribute("href","panier.html");
                        linkAjout.textContent = "Ajouter";
                        
                        let divInfo = document.createElement("div");
                        divInfo.setAttribute("id","divInfo");
                        
                        let name = document.createElement("h3");
                        let imageArticle = document.createElement("img");
                        let description = document.createElement("p");
                        let prix = document.createElement("h4");
                            ///attribution de class et de valeur
                        
                        imageArticle.setAttribute("src",reponse.imageUrl);
                        name.textContent = reponse.name;
                        prix.textContent = String(reponse.price);
                        description.textContent = reponse.description;
                        //les touches personnalistaion
                        
                        produitPage.appendChild(imageArticle);
                        
                        divInfo.appendChild(name);
                        divInfo.appendChild(description);
                        divInfo.appendChild(prix);

                        produitPage.appendChild(divInfo); 
                        produitPage.appendChild(linkAjout);  
                        
                                 
             }else if(this.status == 500){
                 console.log("erreur de connexion");
                 //ajouter une petite animation pour l'erreur dans le dom
             }else if(this.status == 404){
                 console.log("ressource non trouvée");
             }
        }
        req.open("GET","http://localhost:3000/api/cameras/"+idSansHashString);
        req.send();

        //appel de la fonction ajoute au panier
        ajouterPanier();
    }
    //passage des parametres
//fin de la fonction
}
/* appel de la fonction */
recupArticleUrl();














