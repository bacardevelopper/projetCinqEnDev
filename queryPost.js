class Produit{
    constructor(id, name, price, description, imageUrl){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

//recuperer les articles
const recupererLesArticles = () => {
    let cpt = 0;
    let tabCpt = [];
    while(cpt < localStorage.length){
        let idRecuper = JSON.parse(localStorage.getItem(localStorage.key(cpt)));
        let reqItemsRecup = new XMLHttpRequest(); 
        //fonction d'ecoute des requetes
        reqItemsRecup.onreadystatechange = function(){
                //ecoute de la requete
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    let rps = JSON.parse(this.response);
                    let iniProduti = new Produit(rps._id, rps.name, rps.price, rps.description, rps.imageUrl);
                    tabCpt.push(iniProduti);

                    
                }
            cpt++;
        }
        
        reqItemsRecup.open("GET","http://localhost:3000/api/cameras/"+idRecuper.id);
        reqItemsRecup.send();
        
    }
    console.log(tabCpt);
    
}

recupererLesArticles();

