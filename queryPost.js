//recuperer les elements du formulaire
let eltPrenom = document.querySelector(".prenom");
let eltNom = document.querySelector(".nom");
let eltEmail = document.querySelector(".email");
let eltA = document.querySelector(".adresseVille");
let eltVille = document.querySelector(".ville");
let btnValider = document.querySelector("#envoyer");
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
/* cette fonction permet de veriier si les champs ne sont pas vides st appel magique fonction */
function postSurServer(){
        if(eltPrenom.value !== "" && eltNom.value !== "" && eltEmail.value !== "" && eltA.value !== "" && eltVille.value !== ""){
        //appel de la fonction post
            magique();               
        }
}
/* la fonction magique envois les données dans sur la route post order*/
async function magique(){
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
                console.log(valeurEnvoyer);
                
                console.log("ok");    
            }
            
    }                      
    if(valeurEnvoyer.length > 1){
        requetePost.open("POST","http://localhost:3000/api/cameras/order");
        requetePost.setRequestHeader("Content-Type", "application/json");
        requetePost.send(valeurEnvoyer);
    }

}
//recuperer les articles // fonction
/* cette fonction recuperer les elements qui sont dans le localstorage et ajoute dans le panier */ 
const recupererLesArticles = async () => {
    let cpt = 0;
    
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
                    products.push(product_id.id);
                }
            cpt++;
        }
        reqItemsRecup.open("GET","http://localhost:3000/api/cameras/"+idRecuper.id);
        reqItemsRecup.send();   
        
        btnValider.addEventListener("click", postSurServer); 
    }
    console.log(products);
    //en dehors de la boucle   
}

recupererLesArticles();

