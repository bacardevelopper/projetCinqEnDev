 /* recuper et ajouter dans la page vue ou (accueil) */
 /* mes variables superglobales */
 let productScroll = document.querySelector(".productScroll");
 console.log(productScroll);

 let cpt = 0;
 let reponse;
/* fin des variables supergloables */
//fonction qui inserer les elements dans le dom
 function recupInserer(){
    while(cpt < reponse.length){
        let article = document.createElement("article");
        article.setAttribute("class","product");
        console.log(article);
        let imageArticle = document.createElement("img");
        imageArticle.setAttribute("src",reponse[cpt].imageUrl);
        imageArticle.style.borderRadius = "25px";
        productScroll.appendChild(article);
        article.appendChild(imageArticle);
        cpt++;
    }            
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

get();
//appel de la fonction

/* recuperer et ajouter dans la page vue ou accueil */

