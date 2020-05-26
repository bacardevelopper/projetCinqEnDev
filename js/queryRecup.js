//declaration
let reponse;
let produitPage = document.querySelector(".produitPage");
const urlCall = "http://localhost:3000/api/cameras/";
//recuperation de l'url actuelle
var parsedUrl = new URL(window.location);
//recuperation du hash de l'url actuelle
let urlHashTag = parsedUrl.hash;

let tabHash = Array.from(urlHashTag);
tabHash.shift();

let idSansHash = tabHash.join("");
let idSansHashString = String(idSansHash);


//les element qui servent à l'affichage de l'erreur
let bodyElt = document.body;
let messageDerreur = document.createElement("h6");
messageDerreur.setAttribute("id", "erreur");
messageDerreur.textContent = "selectionner produit à l'accueil";

function erreurMsg() {
  setTimeout(function () {
    bodyElt.appendChild(messageDerreur);
  }, 500);

  setTimeout(function () {
    bodyElt.removeChild(messageDerreur);
  }, 8400);
}

/* erreur sur la non selection des produits */
function messageAffichageErreur() {
  if (idSansHash !== "") {
  } else {
    erreurMsg();
  }
}
messageAffichageErreur();
/*                                        */

//fonction recuper et ajouter dans le panier storage
function ajouterPanier() {
  let cleMagique = Math.random() * 10;

  class ProduitAjout {
    constructor(id) {
      this.id = id;
    }
  }

  document.addEventListener("click", function (e) {
    let attributeVerif = e.target.getAttribute("class");
    if (attributeVerif === reponse._id) {
      let ajoutPorduitStroage = new ProduitAjout(reponse._id);
      localStorage.setItem(
        "panier" + cleMagique,
        JSON.stringify(ajoutPorduitStroage)
      );
      cleMagique = Math.random() * 10;
    }
  });
}

/* fonction recuperer et ajoute dans la page de personnalisation */
function recupArticleUrl() {
  return new Promise((resolve, reject) => {
    //debut promise
    if (idSansHash !== "") {
      let req = new XMLHttpRequest();

      req.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          resolve();
          reponse = JSON.parse(this.response);

          let linkAjout = document.createElement("a");

          linkAjout.setAttribute("class", reponse._id);
          linkAjout.setAttribute("href", "panier.html");
          linkAjout.textContent = "Ajouter";

          let divInfo = document.createElement("div");
          divInfo.setAttribute("id", "divInfo");

          let name = document.createElement("h3");
          let imageArticle = document.createElement("img");
          let description = document.createElement("p");
          let prix = document.createElement("h4");

          imageArticle.setAttribute("src", reponse.imageUrl);
          imageArticle.setAttribute("id","imageDynamique");
          name.textContent = reponse.name;
          prix.textContent = String(reponse.price);
          description.textContent = reponse.description;

          produitPage.appendChild(imageArticle);

          divInfo.appendChild(name);
          divInfo.appendChild(description);
          divInfo.appendChild(prix);

          produitPage.appendChild(divInfo);
          produitPage.appendChild(linkAjout);
          ajouterPanier();
        } else {
          reject();
        }
      };
      req.open("GET", urlCall + idSansHashString);
      req.send();
      //appel de la fonction ajoute au panier
    }
  });

  //fin de la promise
}

recupArticleUrl()
  .then(() => {
    //
  })
  .catch(() => {
    //
  });
