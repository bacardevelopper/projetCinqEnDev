async function afficherDansLaPagePanier(){
    let cpt = 0;
    let resumePanier = document.querySelector(".resume");
    // recuperer les elements du tableaux
    /*                                                  */
    while(cpt < localStorage.length){
        let idRecuper = JSON.parse(localStorage.getItem(localStorage.key(cpt)));
        let req = new XMLHttpRequest(); 
        //fonction d'ecoute des requetes
            req.onreadystatechange = function(){
                //ecoute de la requete
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    let reponsPanier = JSON.parse(this.response);
                    /*                                         */
                    console.log("####### test de mon algorithme ######");
                    
                    console.log("**********************************");
                    console.log(idRecuper.id);
                    console.log("###### reponse reçu dans reponsPanier ######");
                    console.log(reponsPanier._id);
                    console.log(reponsPanier.price);

                        //ajout des articles selectionner dans le dom du panier
                        async function ajoutAuDom(){
                            let eltAdd = reponsPanier;
                            let eltDom = document.createElement("article");
                            let eltImg = document.createElement("img");
                            let eltName = document.createElement("h3");
                            let eltPrice = document.createElement("span");
                                eltImg.setAttribute("src", eltAdd.imageUrl);
                                eltPrice.textContent = eltAdd.price;
                                eltName.textContent = eltAdd.name;
                                    eltDom.appendChild(eltImg); eltDom.appendChild(eltName); eltDom.appendChild(eltPrice);
                                    resumePanier.appendChild(eltDom);
                        }
                        //
                        ajoutAuDom();
                }

            cpt++;
        }

        req.open("GET","http://localhost:3000/api/cameras/"+idRecuper.id);
        req.send();
           
    }
}
//appel de la fonction
afficherDansLaPagePanier();

