// le stockage dans temporaire fonctionement
// ce array d'objet  sert que à comparer les produits, j'utilise ajax get pour les recuperer et les afficher dans page de vue (ligne 160)
//on va l'ameliorer 
let tabProduit = [
    {
        _id: "5be1ed3f1c9d44000030b061",
        name: "Zurss 50S",
        price: 49900,
        description: "azmoifhfzeofimazhefiomhioash zaioemhfioaze hfezaio jfze oimfhze iozdhfmoaezfheaziof jazefio eazhf iohefzai mo",
        imageUrl: "http://localhost:3000/images/vcam_1.jpg"
    },
    {
        _id: "5be1ef211c9d44000030b062",
        name: "Hirsch 400DTS",
        description: "zmoifghaerzmioh azmoif hazeo irhzf oirzh arzmoifhaez fiomazeh fiomzh efiomhzr arzomih ",
        price: 309900,
        imageUrl: "http://localhost:3000/images/vcam_2.jpg"
    },
    {
        _id: "5be9bc241c9d440000a730e7",
        name: "Franck JS 105",
        price: 209900,
        description: "aomziehf aoiezhfaizeofheaziof' iomazefio ahzo imazehf iozemhfeaz ioh eamzofh",
        imageUrl: "http://localhost:3000/images/vcam_3.jpg"
    },
    {
        _id: "5be9c4471c9d440000a730e8",
        name: "Kuros TTS",
        description: "mroifh azmo iehzaf omiezahfzefmoeza ihaez fmoihaze iomeazfhezm oaif ehaziomf ehazio",
        price: 159900,
        imageUrl: "http://localhost:3000/images/vcam_4.jpg"
    },
    {
        _id: "5be9c4c71c9d440000a730e9",
        name: "Katatone",
        description: "zeaomi az mofize iazmoh azmof ihaz eomihfazo miazeh fiomahzfm",
        price: 59900,
        imageUrl: "http://localhost:3000/images/vcam_5.jpg"
    }
];

 /* recuper et ajouter dans la page vue ou (accueil) */
  
 /* mes variables superglobales */
 //differencier les pages
let titrePage = document.querySelector("title");
let valeurTitre = titrePage.textContent;
let ajouterProduit = document.querySelector("a");
let fctAjouter = document.getElementsByTagName("a");

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
    linkAjout.textContent = "Ajouter";
    
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
        if(valeurTitre !== "produit - orinico"){
                productScroll.appendChild(article);
        }else{
                console.log("c'est la page produit");
        }
    
    article.appendChild(divInfo); 
    article.appendChild(linkAjout);  
    console.log(article);

    cpt++;
    }
}
    ////////////////// * *////////////////////////////////////////


/***************************************************** debut fonction get */
 // fonction get (recuperer les elements du backend )
 async function get(){
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

class Produit{
    constructor(id, nom, prix, description, urlimg, cle){
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.description = description;
        this.urlimg = urlimg;
        this.cle = cle;
    }
}



function ajouterStorage(){
    let tStorage = localStorage.length;
    let incre = Math.random() * 10;
    //je déclare un evenement
                    document.addEventListener("click", function(e){ 
                        let attributeVerif = e.target.getAttribute("class");

                        if(attributeVerif === tabProduit[0]._id){
                                incre = Math.random() * 10;
                                let un = new Produit(tabProduit[0]._id, tabProduit[0].name, tabProduit[0].price, tabProduit[0].description, tabProduit[0].imageUrl);
                                
                                
                                localStorage.setItem("panier"+incre, JSON.stringify(un));

                        }else if(attributeVerif === tabProduit[1]._id){
                                incre = Math.random() * 10;
                                let deux = new Produit(tabProduit[1]._id, tabProduit[1].name, tabProduit[1].price, tabProduit[1].description, tabProduit[1].imageUrl);
                                
                                
                                localStorage.setItem("panier"+incre, JSON.stringify(deux));

                        }else if(attributeVerif === tabProduit[2]._id){
                                incre = Math.random() * 10;
                                let trois = new Produit(tabProduit[2]._id, tabProduit[2].name, tabProduit[2].price, tabProduit[2].description, tabProduit[2].imageUrl);
                                localStorage.setItem("panier"+incre, JSON.stringify(trois));

                        }else if(attributeVerif === tabProduit[3]._id){
                                incre = Math.random() * 10;
                                let quatre = new Produit(tabProduit[3]._id, tabProduit[3].name, tabProduit[3].price, tabProduit[3].description, tabProduit[3].imageUrl);
                                
                                
                                localStorage.setItem("panier"+incre, JSON.stringify(quatre));  
                        }else if(attributeVerif === tabProduit[4]._id){
                                incre = Math.random() * 10;
                                let cinq = new Produit(tabProduit[4]._id, tabProduit[4].name, tabProduit[4].price, tabProduit[4].description, tabProduit[4].imageUrl);
                                
                                
                                localStorage.setItem("panier"+incre, JSON.stringify(cinq));
                        }else{
                            /* rien du tout */
                        }
   
            });

                                
    }

ajouterStorage();


