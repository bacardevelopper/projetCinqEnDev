
 let productScroll = document.querySelector(".productScroll");
  
 let cpt = 0;
 let reponse;
 
 /* fin des variables supergloables */
 
 //déclaration fonction qui insere les elements dans le dom de la page accueil (page vue)
 function recupInserer(){
     //boucle de création insertion
 while(cpt < reponse.length){
     
     let linkAjout = document.createElement("a");
 
     linkAjout.setAttribute("class",reponse[cpt]._id);
     linkAjout.setAttribute("id","elementatester"+""+[cpt]+"");
     linkAjout.setAttribute("rel","noreferrer");
     linkAjout.setAttribute("href","produit.html#"+reponse[cpt]._id);
     linkAjout.textContent = "Personnaliser";
     
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
     
     article.appendChild(imageArticle);
     
     divInfo.appendChild(name);
     divInfo.appendChild(description);
     divInfo.appendChild(prix);
 
         // verifier si c'est la page produit ou pas
         
    productScroll.appendChild(article);
         
     article.appendChild(divInfo); 
     article.appendChild(linkAjout);  
     console.log(article);
 
     cpt++;
     }
 }

 /////////////////////////////////////////////////////////////////


 //declaration e la fonction promise
const accueilProducts = (url) =>{
  /*on revoie une promesse qui prend en argument une fonction qui
   possede lui meme deux parametre la resolution et le reject */
  return new Promise((resolve, reject)=>{
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
     //fonction d'ecoute des requetes
    req.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                 //reponse json convertit en objet js
                 reponse = JSON.parse(this.response);
                 resolve(recupInserer());
                     //appel de la fonction              
        }
        reject(req.status);
    }
     // fin de la fonction d'ecoute
     req.send(null);
  });
}
//appel de la fonction promise
accueilProducts("http://localhost:3000/api/cameras")
  .then((reponse)=>{
      //pas d'erreur
  })
  .catch((req)=>{
      //erreur
  });