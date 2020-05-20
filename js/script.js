let productScroll = document.querySelector(".productScroll"); 
let cpt = 0;
let reponse;
 
 /* la fonction qui insere les elements dans le dom de la page accueil (page vue) */
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
function erreur(){
    console.log("erreur");
}

 //la fonction qui fait la requete pour afficher les produits à l'acceuil
const accueilProducts = (url) =>{
  
  return new Promise((resolve, reject)=>{
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    
    req.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                 //reponse json convertit en objet js
                 
                 resolve();
                 reponse = JSON.parse(this.response);
                 recupInserer();
                 console.log("la promesse asynchrone est tenu");                     
        }else{
            reject();
            console.log("cherche a éxecuter la promesse asynchrone / donc promesse non tenu");
            console.log("le status "+this.status)
            

        }
        
    }
     
     req.send(null);
     console.log("fin code syncrhone");
  });
}
//appel de la fonction promise
accueilProducts("http://localhost:3000/api/cameras")
  .then(()=>{
    
  })
  .catch(()=>{
    
  });