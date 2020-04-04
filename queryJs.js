// le stockage dans temporaire fonctionement
// ce array d'objet  sert que à comparer les produits, j'utilise ajax get pour les recuperer et les afficher dans page de vue (ligne 160)

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

let produitPageAttente = [
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
    linkAjout.setAttribute("target","_blank");
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
        ///
    
        ///
    
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
    
    /***** fonction qui l'ajout à la page produit  */
    function gestionPageProduit(){
        
        //recupération de l'évenement
        let cleComprare;

        document.addEventListener("click", function(e){
            
            let attributeVerif = e.target.getAttribute("class");
            //recuperation des données selon son identifiant et enregistrement dans le storage
            //à remplacer par switch au plutot
            if(attributeVerif === tabProduit[0]._id){
                cleComprare = Math.random() * 100;
                const produitZero = {
                    id : tabProduit[0]._id,
                    nom : tabProduit[0].name,
                    prix : tabProduit[0].price,
                    description : tabProduit[0].description,
                    url : tabProduit[0].imageUrl,
                    cle : cleComprare
                };

                console.log(produitZero);
                produitPageAttente.push(produitZero);
                localStorage.setItem("produitStorage", JSON.stringify(produitPageAttente));

                console.log(produitPageAttente);
            }else if(attributeVerif === tabProduit[1]._id){
                cleComprare = Math.random() * 100;
                const produitUn = {
                    id : tabProduit[1]._id,
                    nom : tabProduit[1].name,
                    prix : tabProduit[1].price,
                    description : tabProduit[1].description,
                    url : tabProduit[1].imageUrl,
                    cle : cleComprare
                };

                console.log(produitUn);
                produitPageAttente.push(produitUn);
                localStorage.setItem("produitStorage", JSON.stringify(produitPageAttente));

                
            }else if(attributeVerif === tabProduit[2]._id){
                cleComprare = Math.random() * 100;
                const produitDeux = {
                    id : tabProduit[2]._id,
                    nom : tabProduit[2].name,
                    prix : tabProduit[2].price,
                    description : tabProduit[2].description,
                    url : tabProduit[2].imageUrl,
                    cle : cleComprare
                };

                console.log(produitDeux);
                produitPageAttente.push(produitDeux);
                localStorage.setItem("produitStorage", JSON.stringify(produitPageAttente));

            }else if(attributeVerif === tabProduit[3]._id){
                cleComprare = Math.random() * 100;
                const produitTrois = {
                    id : tabProduit[3]._id,
                    nom : tabProduit[3].name,
                    prix : tabProduit[3].price,
                    description : tabProduit[3].description,
                    url : tabProduit[3].imageUrl,
                    cle : cleComprare
                };

                console.log(produitTrois);
                produitPageAttente.push(produitTrois);
                localStorage.setItem("produitStorage", JSON.stringify(produitPageAttente)); 

            }else if(attributeVerif === tabProduit[4]._id){
                cleComprare = Math.random() * 100;
                const produitQuatre = {
                    id : tabProduit[4]._id,
                    nom : tabProduit[4].name,
                    prix : tabProduit[4].price,
                    description : tabProduit[4].description,
                    url : tabProduit[4].imageUrl,
                    cle : cleComprare
                };

                console.log(produitQuatre);
                produitPageAttente.push(produitQuatre);
                localStorage.setItem("produitStorage", JSON.stringify(produitPageAttente));

            }else{

            }
            
        });
                        
             
    }
    /* finde la fonction gestion d'ajout à la page produit */
    //lancement de la fonction dans la fonction
    gestionPageProduit();
    






/***************************************************** debut fonction get */
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

/* fin de fonction get */
get();
//appel de la fonction

/* recuperer et ajouter dans la page vue ou accueil */

