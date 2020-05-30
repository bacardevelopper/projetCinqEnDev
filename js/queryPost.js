//recuperer les elements du formulaire
let eltPrenom = document.querySelector(".prenom");
let bodyElt = document.body;
let eltNom = document.querySelector(".nom");
let eltEmail = document.querySelector(".email");
let eltA = document.querySelector(".adresseVille");
let eltVille = document.querySelector(".ville");
let btnValider = document.querySelector("#envoyer");
let panierPage = document.querySelector(".panierPage");
let formulaireChild = document.querySelector(".formulaire");
let resumeChild = document.querySelector(".resume");
let messageDerreur = document.createElement("h6");
messageDerreur.setAttribute("id", "erreur");
messageDerreur.textContent = "erreur verifier les champs ou ajouter produit";
const urlpost = "http://localhost:3000/api/cameras/order";


/* fonction message d'erreur */
function erreurMsg() {
  setTimeout(function () {
    bodyElt.appendChild(messageDerreur);
  }, 500);

  setTimeout(function () {
    bodyElt.removeChild(messageDerreur);
  }, 3400);
}

/* configuration du message validation de la commande */
const messageMerci = document.createElement("h1");
const msgIdOrder = document.createElement("h3");
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////

let products = [];
///////////////////////////////////////////////////////////////////////////////
class Produit {
  constructor(id, name, price, description, imageUrl) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

//class pour l'objet contact
class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

/////////////////////////////////////////////////////
//fonction  qui affiche un total
function totalAfficher() {
  let totalHtml = document.createElement("span");
  totalHtml.setAttribute("id", "spanTotal");
  totalHtml.textContent =
    "Total : " + JSON.parse(localStorage.getItem("total")) + " BTC";
  bodyElt.appendChild(totalHtml);
}

//fonction de gerer fin de commande
function endCommande() {
  panierPage.removeChild(formulaireChild);
  panierPage.removeChild(resumeChild);
  localStorage.clear();
}

/* cette fonction permet de verifer si les champs ne sont pas vides
 et appel les fonctions magique et endCommande à sa reussite*/
function postSurServer() {
  if (
    eltPrenom.value !== "" &&
    eltNom.value !== "" &&
    eltEmail.value !== "" &&
    eltA.value !== "" &&
    eltVille.value !== ""
  ) {
    //verification de l'email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eltEmail.value)) {
      //appel de la fonction post
      magique();
      endCommande();
    } else {
      erreurMsg();
    }
  } else {
    erreurMsg();
  }
}

/* la fonction magique envois les données dans sur la route post order*/
function magique() {
  var order;

  //variable qui recupere le tableaux des produits et les champs contact
  let valeurEnvoyer;
  let contact = new Contact(
    eltPrenom.value,
    eltNom.value,
    eltEmail.value,
    eltA.value,
    eltVille.value
  );
  order = { contact, products };

  valeurEnvoyer = JSON.stringify(order);

  let requetePost = new XMLHttpRequest();

  requetePost.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
      let reponseTester = JSON.parse(this.response);

      msgIdOrder.textContent = reponseTester.orderId;
      messageMerci.style.textAlign = "center";
      messageMerci.textContent = "Merci pour votre commande";

      panierPage.appendChild(messageMerci);
      panierPage.appendChild(msgIdOrder);
    }
  };

  if (valeurEnvoyer.length !== null) {
    requetePost.open("POST", urlpost);
    requetePost.setRequestHeader("Content-Type", "application/json");
    requetePost.send(valeurEnvoyer);
  }
}

/* fonction écoute d'écoute */
const listenEventPost = () => {
  btnValider.addEventListener("click", function () {
    //si pas de produits dans le panier pas d'envoi
    if (products.length === 0) {
      erreurMsg();
    } else {
      postSurServer();
    }
  });
};

/* cette fonction calcul le total et organise les données dans un tableaux avant l'envoit*/

const recupererTotalEtPost = () => {
  //debut de ma promise
  return new Promise((resolve, reject) => {
    let cpt = 0;
    let total = 0;
    const urlCall = "http://localhost:3000/api/cameras/";
    
    while (cpt < localStorage.length) {
      let idRecuper = JSON.parse(localStorage.getItem(localStorage.key(cpt)));
      let reqItemsRecup = new XMLHttpRequest();
      //fonction d'ecoute des requetes
      reqItemsRecup.onreadystatechange = function () {
        //ecoute de la requete
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          resolve();

          let rps = JSON.parse(this.response);
          /* ajouter l'id des produits dans le tableaux products */
          let product_id = new Produit(
            rps._id,
            rps.name,
            rps.price,
            rps.description,
            rps.imageUrl
          );

          //calcul du total
          total += rps.price;

          localStorage.setItem("total", JSON.stringify(total));
          totalAfficher();

          products.push(product_id.id);
        } else {
          reject();
        }

        cpt++;
      };

      reqItemsRecup.open("GET", urlCall + idRecuper.id);
      if (idRecuper.id !== undefined) {
        reqItemsRecup.send();
      }
    }
    /* ecoute evenement click, pour envoit des articles et des informations sur le backend */
    listenEventPost();
  });
  //fin de ma promise
};

recupererTotalEtPost()
  .then(() => {})
  .catch(() => {});
