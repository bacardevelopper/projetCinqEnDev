 /* recuper et ajouter dans la page vue ou (accueil) */
  
 /* mes variables superglobales */
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
     ////////////////// * *////////////////////////////////////////
 
 /***************************************************** debut fonction get */
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
 
 /* fin de fonction get */
 get();
 //appel de la fonction
 ///////////////////////////////////////////////////////////////////////////////////////////////////////

 
 

 
 
 
 