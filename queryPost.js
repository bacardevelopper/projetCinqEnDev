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
    messageDerreur.setAttribute("id","erreur");
    messageDerreur.textContent = "erreur verifier le champ ou selectionner produit";

/* fonction message d'erreur */
    function erreurMsg(){
        setTimeout(function(){
            bodyElt.appendChild(messageDerreur);
        }, 500);

        setTimeout(function(){
            bodyElt.removeChild(messageDerreur);
        }, 3400);
    }

/* fonction message d'erreur */

const messageMerci = document.createElement("h1");
const msgIdOrder = document.createElement("h3");
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////


console.log(eltPrenom);
var products = [];
///////////////////////////////////////////////////////////////////////////////
class Produit{
    constructor(id, name, price, description, imageUrl){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    affiche(){
        console.log(this.id +' '+ this.price );
    }
}
//class pour l'objet contact
class Contact{
    constructor(firstName, lastName, address, city, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
            affiche(){
                console.log(this.firstName +' '+ this.lastName);
            }
}

/////////////////////////////////////////////////////
//fonction  qui affiche un total
function totalAfficher(){
    let totalHtml = document.createElement("span");
    totalHtml.setAttribute("id","spanTotal");
    totalHtml.textContent = JSON.parse(localStorage.getItem("total"));
    bodyElt.appendChild(totalHtml);
}

//fonction de gerer fin de commande
function endCommande(){
    panierPage.removeChild(formulaireChild);
    panierPage.removeChild(resumeChild);
    localStorage.clear();
}

/* cette fonction permet de verifer si les champs ne sont pas vides
 et appel les fonctions magique et endCommande à sa reussite*/
function postSurServer(){
        if(eltPrenom.value !== "" && eltNom.value !== "" && eltEmail.value !== ""
        && eltA.value !== "" && eltVille.value !== ""){
            //verification de l'email
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eltEmail.value)){
                        //appel de la fonction post
                magique();
                endCommande();
                
            }else{
                console.log("le champs et vide ou l'email n'est pas vide");
                erreurMsg(); 
            }

        }else{
            console.log("le champs et vide ou l'email n'est pas vide");
            erreurMsg();
            
        }
}

/* la fonction magique envois les données dans sur la route post order*/
function magique(){
    var order;

    //variable qui recupere le tableaux des produits et les champs contact
    let valeurEnvoyer;
    var contact = new Contact(eltPrenom.value, eltNom.value, eltEmail.value, eltA.value, eltVille.value);
    order = {contact, products};
    console.log(order);
    valeurEnvoyer = JSON.stringify(order);

    let requetePost = new XMLHttpRequest();

    requetePost.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE && this.status == 201){
                let reponseTester = JSON.parse(this.response);
 
                console.log("status "+this.status);
                /* afficher l'order id qu'on doit afficher */
                console.log(reponseTester.orderId);
                msgIdOrder.textContent = reponseTester.orderId;
                messageMerci.style.textAlign = "center";
                messageMerci.textContent = "Merci pour votre commande";

                panierPage.appendChild(messageMerci);
                panierPage.appendChild(msgIdOrder);

                console.log(valeurEnvoyer);
                console.log("ok");    
            }
            
    }                      
    if(valeurEnvoyer.length !== null){
        requetePost.open("POST","http://localhost:3000/api/cameras/order");
        requetePost.setRequestHeader("Content-Type", "application/json");
        requetePost.send(valeurEnvoyer);
    }

}

//recuperer les articles // fonction
/* cette fonction recuperer les elements qui sont dans le localstorage et ajoute dans le panier */ 
const recupererLesArticles = async () => {

    let cpt = 0;
    let total = 0;

    while(cpt < localStorage.length){
        let idRecuper = JSON.parse(localStorage.getItem(localStorage.key(cpt)));
        let reqItemsRecup = new XMLHttpRequest(); 
        //fonction d'ecoute des requetes
        reqItemsRecup.onreadystatechange = function(){
                //ecoute de la requete
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    
                    let rps = JSON.parse(this.response);
                    /* ajouter l'id des produits dans le tableaux products */
                    let product_id = new Produit(rps._id, rps.name, rps.price, rps.description, rps.imageUrl);

                    //calcul du total
                    total += rps.price;console.log(total);
                    localStorage.setItem("total", JSON.stringify(total));
                    totalAfficher();

                    products.push(product_id.id);
                }

            cpt++;
        }
        
            reqItemsRecup.open("GET","http://localhost:3000/api/cameras/"+idRecuper.id);
            if(idRecuper.id !== undefined){
                reqItemsRecup.send();
            }
                
    }
    /* ecoute evenement click, pour envoit des articles et des informations sur le backend */
    btnValider.addEventListener("click", function(){
        //si pas de produits dans le panier pas d'envoi
        if(products.length === 0){
            console.log("message d'erreur article vide");
            erreurMsg();  
        }else{
            postSurServer();
        }
        
    });
    
    console.log(products);
     
}

recupererLesArticles();






