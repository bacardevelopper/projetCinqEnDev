let cpt = 0;
const urlCall = "http://localhost:3000/api/cameras";



/* la fonction qui insere les elements dans le dom de la page accueil (page vue) */
const recupInserer = (reponse) => {
  //boucle de création insertion
  while (cpt < reponse.length) {
    let linkAjout = document.createElement("a");

    linkAjout.setAttribute("class", reponse[cpt]._id);
    linkAjout.setAttribute("id", "elementatester" + "" + [cpt] + "");
    linkAjout.setAttribute("rel", "noreferrer");
    linkAjout.setAttribute("href", "produit.html#" + reponse[cpt]._id);
    linkAjout.textContent = "Personnaliser";

    let divInfo = document.createElement("div");
    divInfo.setAttribute("id", "divInfo");
    let article = document.createElement("article");
    let name = document.createElement("h3");
    let imageArticle = document.createElement("img");
    let description = document.createElement("p");
    let prix = document.createElement("h4");
    ///attribution de class et de valeur
    article.setAttribute("class", "product");
    imageArticle.setAttribute("src", reponse[cpt].imageUrl);
    name.textContent = reponse[cpt].name;
    prix.textContent = String(reponse[cpt].price)+' BTC';
    description.textContent = reponse[cpt].description;

    article.appendChild(imageArticle);

    divInfo.appendChild(name);
    divInfo.appendChild(description);
    divInfo.appendChild(prix);

    // verifier si c'est la page produit ou pas

    document.querySelector(".productScroll").appendChild(article);

    article.appendChild(divInfo);
    article.appendChild(linkAjout);

    cpt++;
  }
}




//la fonction qui fait la requete pour afficher les produits à l'acceuil
const accueilProducts = (url) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.onreadystatechange = function () {
      if (this.readyState == req.DONE && this.status == 200) {
        //reponse json convertit en objet js

        resolve();
        let reponse = JSON.parse(this.response);
        recupInserer(reponse);
      } else {
        reject();
      }
    };

    req.send(null);
  });
};
//appel de la fonction promise

accueilProducts(urlCall)
  .then(() => {})
  .catch(() => {});