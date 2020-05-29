"use strict";
document.addEventListener("DOMContentLoaded", initialiser);
var carte1;
var carte2;
var carte1clonee;
var carte2clonee;
var compte = null;

let niveau = null;
let nb_cartes = 0;
let temps_jeu = 0;
let premier_click = true;
let interval1

let message_gagnant_1 = "Félicitations ! Tu as une mémoire d'éléphant ";
let message_gagnant_2 = "Bon, tu as gagné, mais ce n'était pas si difficile, n'exagère pas...";
let message_gagnant_3 = "Et c'est gagné ! ";
let message_gagnant_4 = "Pas mal ! Et si tu rejouais pour améliorer ton score ? ";
let message_gagnant_5 = "Wow ! Mais c'est une victoire ! ";

let message_perdant_1 = "Flûte, c'est loupé...";
let message_perdant_2 = "Et c'est perdu ! Tu feras mieux la prochaine fois";
let message_perdant_3 = "Perdu ! Réessaye pour voir ?";
let message_perdant_4 = "Je me doutais bien que ça serait trop dur pour toi...";
let message_perdant_5 = "Dommage, perdu ! ";

let deckChoice = [1,2,3,4];

let probaDeck = [loiBinomiale(0,4,0.25),loiBinomiale(1,4,0.25),loiBinomiale(2,4,0.25),loiBinomiale(3,4,0.25)]
console.log(loiBinomiale(0,4,0.25)+loiBinomiale(1,4,0.25)+loiBinomiale(2,4,0.25)+loiBinomiale(3,4,0.25))

/* VARIABLE ALÉATOIRE QUI DÉFINIT LE DECK */
function indiceDeck(probaDeck){
    const t = Math.random();
    let sumProba = 0
    let eventPositionInArray = 0
    let p = probaDeck
    for (let i=0; i< p.length ; i++){
        if ( sumProba <= t){
            sumProba += p[i]
            eventPositionInArray ++              
        }
    }
    if (eventPositionInArray == p.length)
        return eventPositionInArray-1
    else{
        return eventPositionInArray
    }
}

function initialiser(evt){
    init_jeu();
    change_deck(deckChoice[indiceDeck(probaDeck)]);
}

function change_deck(evt){
    console.log("Deck numéro " + evt);
    var lesCartes = document.querySelectorAll("img");
    for (var uneCarte of lesCartes){
        const previous_src = uneCarte.src;
        const pos = previous_src.indexOf("u");
        uneCarte.src = previous_src.substr(0, pos+1)+evt+previous_src.substr(pos+2);
    }
}



function init_jeu(){
    const section_niveau = document.getElementById("section_niveau");
    const section_jeu = document.getElementById("section_jeu");
    section_jeu.style.display = "none";
    document.getElementById("niveau_facile").addEventListener("click", () => {
        def_niveau("facile")
    });
    
    document.getElementById("niveau_moyen").addEventListener("click", () => {
        def_niveau("moyen")
    });
    
    document.getElementById("niveau_difficile").addEventListener("click", () => {
        def_niveau("difficile")
    });
}

function def_niveau(evt){
    niveau = evt;
    section_niveau.style.display = "none";
    section_jeu.style.display = "block";
    maj_nb_cartes();
}




/* ALEATOIRE A CHANGER ICI */
/* DETERMINE LE NOMBRE DE CARTES */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function maj_nb_cartes(){
    let alea_nb_cartes = 0;
    if (niveau == "facile"){
        alea_nb_cartes = getRandomInt(3);
        nb_cartes = 8 + alea_nb_cartes;
    } else if (niveau == "moyen"){
        alea_nb_cartes = getRandomInt(3);
        nb_cartes = 9 + alea_nb_cartes;
    } else if (niveau == "difficile"){
        alea_nb_cartes = getRandomInt(3);
        nb_cartes = 10 + alea_nb_cartes;
    }  
    console.log("nb cartes : " + nb_cartes);
    lancer_jeu();
}

function lancer_jeu(){
    const a_suppr = (2*(12 - nb_cartes));
    console.log("a suppr : "+a_suppr);
    for(let i = 0; i < 2*a_suppr; i++){
        var section = document.getElementById("jeuCartes");
        //console.log(section.lastChild);
        section.removeChild(section.lastChild);
    }
    var lesCartes = document.getElementsByClassName("flip");
    //Melanger les cartes
    var section = document.getElementById("jeuCartes");
    for (var compteur=null; compteur<=100; compteur++){
        var taille = lesCartes.length;
        console.log("taille : "+taille);
        /* ALEATOIRE A CHANGER ICI */
        /* PLACEMENT DES CARTES */
        var alea = Math.round(Math.random()*(taille-1));
        var carteAlea=lesCartes[alea];
        section.appendChild(carteAlea);
    }
    for (var uneCarte of lesCartes){
        uneCarte.addEventListener("click", retournerCarte);
    }
    def_temps_jeu();
}






/* ALEATOIRE A CHANGER ICI */
/* DEFINITION DU TEMPS LIMITE */
function def_temps_jeu(){
    if (niveau == "facile"){
        temps_jeu = 75 + getRandomInt(60); //Entre 75 et 120 sec
    } else if (niveau == "moyen"){
        temps_jeu = 60 + getRandomInt(45); //Entre 60 et 105 sec
    } else if (niveau == "difficile"){
        temps_jeu = 50 + getRandomInt(55); //Entre 50 et 105 sec
    } 
    console.log("Temps jeu 1 : "+temps_jeu);
}

function lancer_timer(){
    console.log("Temps jeu 1 : "+temps_jeu);
    let temps_restant = temps_jeu;
    interval1 = setInterval(()=>{
        document.getElementById("timer").innerHTML = temps_restant;
        temps_restant--;
        if(temps_restant == 0){
            window.removeEventListener("click",stop,true);
            /* ALEATOIRE A CHANGER ICI */
            /* MESSAGE DE DEFAITE ALEATOIRE */
            let alea_msg = Math.random();
            console.log("alea defaite"+ alea_msg);
            let message = "";
            if (alea_msg < 1/5) message = message_perdant_1;
            else if (alea_msg >= 1/5 && alea_msg < 2/5) message = message_perdant_2;
            else if (alea_msg >= 2/5 && alea_msg < 3/5) message = message_perdant_3;
            else if (alea_msg >= 3/5 && alea_msg < 4/5) message = message_perdant_4;
            else message = message_perdant_5;
            window.alert(message);
            clearInterval(interval1);
            afficherBouton();
        }
    }, 1000);
    
}





function retournerCarte(evt){
    var uneCarte = this;
    uneCarte.classList.add('face');
    uneCarte.removeEventListener("click", retournerCarte);
    if(premier_click){
        lancer_timer();
        premier_click = false;
    }
    //console.log("message");/*=system.out.printl*/
    if (carte1==null){
        carte1=uneCarte;
    } else {
        carte2=uneCarte;
    }
    
    if (carte1!=null && carte2!=null){
        window.setTimeout(afficherResultat,1500);    
        window.addEventListener("click",stop,true);
    }
}

 function afficherResultat(){
     var faceCarte1 = carte1.dataset.carte;
     var faceCarte2 = carte2.dataset.carte;
     compte=compte+1;
     if (faceCarte1==faceCarte2){
         carte1.style.opacity="0";
         carte2.style.opacity="0";
         carte1.addEventListener("transitionend", clonerCartes);
         carte1clonee=carte1.cloneNode(true);
         carte2clonee=carte2.cloneNode(true);
     } else {
         carte1.classList.remove('face');
         carte2.classList.remove('face');
         carte1.addEventListener("click", retournerCarte);
         carte2.addEventListener("click", retournerCarte);
         carte1=null;
         carte2=null;
         window.removeEventListener("click",stop,true);
     }
 }

function clonerCartes(evt){
    document.getElementById("cartesDecouvertes").appendChild(carte1clonee);
    document.getElementById("cartesDecouvertes").appendChild(carte2clonee);
    carte1clonee.style.opacity="1";
    carte2clonee.style.opacity="1";
    carte1=null;
    carte2=null;
    window.removeEventListener("click",stop,true);
    if(document.getElementById("cartesDecouvertes").getElementsByClassName("flip").length==nb_cartes*2){ 
        clearInterval(interval1);
        window.removeEventListener("click",stop,true);
        /* ALEATOIRE A CHANGER ICI */
        /* MESSAGE DE VICTOIRE ALEATOIRE */
        let alea_msg = Math.random();
        console.log("alea victoire"+ alea_msg);
        let message = "";
        if (alea_msg < 1/5) message = message_gagnant_1;
        else if (alea_msg >= 1/5 && alea_msg < 2/5) message = message_gagnant_2;
        else if (alea_msg >= 2/5 && alea_msg < 3/5) message = message_gagnant_3;
        else if (alea_msg >= 3/5 && alea_msg < 4/5) message = message_gagnant_4;
        else message = message_gagnant_5;
        afficherBouton();
    }
}

function stop(evt){
    evt.stopPropagation();
}

function afficherBouton(){
    var bouton = document.getElementById("divRejouer");
    bouton.style.display="flex";
    bouton.addEventListener("click", rejouer);
}

function rejouer(evt){
    window.location.reload();
}

