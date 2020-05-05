//la fonction qui permet d'afficher les produits selectionner dans la page panier
function afficherDansLaPagePanier(){
    let cpt = 0;
    let resumePanier = document.querySelector(".resume");

    while(cpt < localStorage.length){
        let idRecuper = JSON.parse(localStorage.getItem(localStorage.key(cpt)));
        let req = new XMLHttpRequest(); 
        
            req.onreadystatechange = function(){
                
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    let reponsPanier = JSON.parse(this.response);
                    /*                                         */
                    console.log("####### test ######");
                    
                    console.log("**********************************");
                    console.log(idRecuper.id);
                    console.log(reponsPanier._id);
                    console.log(reponsPanier.price);
                    console.log("###### reponse reçu dans reponsPanier ######");
                   

                        //ajout des articles selectionner dans le dom du panier
                        function ajoutAuDom(){
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
                        //appel de la fonction
                        ajoutAuDom();
                }
            cpt++;
        }

        req.open("GET","http://localhost:3000/api/cameras/"+idRecuper.id);
        if(idRecuper.id !== undefined){
            req.send();
        }
        
           
    }
}
//appel de la fonction
afficherDansLaPagePanier();

