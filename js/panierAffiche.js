//ajout des articles selectionner dans le dom du panier
function ajoutAuDom(reponsPanier) {
  let resumePanier = document.querySelector(".resume");
  let eltAdd = reponsPanier;
  let eltDom = document.createElement("article");
  let eltImg = document.createElement("img");
  let eltName = document.createElement("h3");
  let eltPrice = document.createElement("span");
  eltImg.setAttribute("src", eltAdd.imageUrl);
  eltPrice.textContent = eltAdd.price + " BTC";
  eltName.textContent = eltAdd.name;
  eltDom.appendChild(eltImg);
  eltDom.appendChild(eltName);
  eltDom.appendChild(eltPrice);
  resumePanier.appendChild(eltDom);
}
const urlCall = "http://localhost:3000/api/cameras/";
//la fonction qui permet d'afficher les produits selectionner dans la page panier


function afficherDansLaPagePanier() {
 
  return new Promise((resolve, reject) => {

    let cpt = 0;

    while (cpt < localStorage.length) {
      let idRecuper = JSON.parse(localStorage.getItem(localStorage.key(cpt)));
      let req = new XMLHttpRequest();

      req.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          resolve();
          let reponsPanier = JSON.parse(this.response);
          /*                                         */

          //appel de la fonction
          ajoutAuDom(reponsPanier);
        } else {
          reject();
        }
        cpt++;
      };

      req.open("GET", urlCall + idRecuper.id);
      if (idRecuper.id !== undefined) {
        req.send();
      }
    }
  });
}
//appel de la fonction
afficherDansLaPagePanier()
  .then(() => {})
  .catch(() => {});
