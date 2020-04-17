//on l'appelle dans l'evenement bouton valider

function tester(){
    let requetePost = new XMLHttpRequest();

                    if(eltPrenom.value !== "" && eltNom.value !== "" && eltEmail.value !== "" && eltA.value !== "" && eltVille.value !== ""){
                        var order;
                        let valeurEnvoyer;
                        var contact = new Contact(eltPrenom.value, eltNom.value, eltEmail.value, eltA.value, eltVille.value);
                        
                        order = {contact, products};
                        console.log(order);
                        valeurEnvoyer = JSON.stringify(order);

                        //appel de la fonction post
                        magique();
                        
                }

}

async function magique(){
                            
    requetePost.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                console.log("POST requete is functionnal");
                let rpsP = JSON.parse(this.response);
                console.log(rpsP.statusText);
                console.log("ok");    
            }else if(this.status == 400 || this.status > 200){
                console.log("erreur quelque part");
                console.log(this.statusText);
            }
    }                      

    requetePost.open("POST","http://localhost:3000/api/cameras/order");
    requetePost.setRequestHeader("Content-Type", "application/json");
    requetePost.send(valeurEnvoyer);
}

//ancien version

function tester(){
    let requetePost = new XMLHttpRequest();
        

                    if(eltPrenom.value !== "" && eltNom.value !== "" && eltEmail.value !== "" && eltA.value !== "" && eltVille.value !== ""){
                        var order;
                        let valeurEnvoyer;
                        var contact = new Contact(eltPrenom.value, eltNom.value, eltEmail.value, eltA.value, eltVille.value);
                        
                        order = {contact, products};
                        console.log(order);
                        valeurEnvoyer = JSON.stringify(order);
                    
                        async function magique(){
                            
                        
                            if(requetePost.readyState == XMLHttpRequest.DONE && requetePost.status == 200){
                                console.log("POST requete is functionnal");
                                let rpsP = JSON.parse(requetePost.response);
                                console.log(rpsP.statusText);
                                console.log("ok");    
                            }else if(requetePost.status == 400 || requetePost.status > 200){
                                console.log("erreur quelque part");
                                console.log(requetePost.statusText);
                            }
            
            
            requetePost.open("POST","http://localhost:3000/api/cameras/order");
            requetePost.setRequestHeader("Content-Type", "application/json");
            requetePost.send(valeurEnvoyer);
            
        
        }
        
        contact.affiche();
        magique();                       
    }

}