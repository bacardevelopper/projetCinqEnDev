//recuperer les elements du formulaire
let eltPrenom = document.querySelector(".prenom");
let eltNom = document.querySelector(".nom");
let eltEmail = document.querySelector(".email");
let eltA = document.querySelector(".adresseVille");
let eltVille = document.querySelector(".ville");
let btnValider = document.querySelector("#envoyer");
console.log(eltPrenom);
var products = [];

//


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


function tester(){
        if(eltPrenom.value !== "" && eltNom.value !== "" && eltEmail.value !== "" && eltA.value !== "" && eltVille.value !== ""){
        //appel de la fonction post
            magique();               
        }
}

async function magique(){
    var order;
    let valeurEnvoyer;
    var contact = new Contact(eltPrenom.value, eltNom.value, eltEmail.value, eltA.value, eltVille.value);
    order = {contact, products};
    console.log(order);
    valeurEnvoyer = JSON.stringify(order);

    let requetePost = new XMLHttpRequest();

    requetePost.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                let reponse = JSON.parse(this.response);
                console.log("POST requete is functionnal");
                
                console.log("ok");    
            }
            console.log("status "+this.status);
            console.log("reponse "+this.response); 
    }                      
    console.log(valeurEnvoyer);
    requetePost.open("POST","http://localhost:3000/api/cameras/order");
    requetePost.setRequestHeader("Content-Type", "application/json");
    requetePost.send(valeurEnvoyer);
}



//recuperer les articles // fonction
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
                    let product_id = new Produit(rps._id, rps.name, rps.price, rps.description, rps.imageUrl);
                    products.push(product_id.id);    


                }
            cpt++;
        }
        
        reqItemsRecup.open("GET","http://localhost:3000/api/cameras/"+idRecuper.id);
        reqItemsRecup.send();   
        
        btnValider.addEventListener("click", tester); 
    }
    console.log(products);
    //en dehors de la boucle
    

    
}

recupererLesArticles();

