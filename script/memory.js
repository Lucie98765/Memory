"use strict";
document.addEventListener("DOMContentLoaded", initialiser);
let deckFinal;
let carte1;
let carte2;
let carte1clonee;
let carte2clonee;
let compte = null;

let niveau = null;
let nb_cartes = 0;
let temps_jeu = 0;
let premier_click = true;
let interval1

let message_gagnant_1 = "Tu as gagné ! Tu étais la voyante de cette partie on dirait";
let message_gagnant_2 = "Gagné ! On t'offre le laurier de la victoire";
let message_gagnant_3 = "Et c'est gagné ! C'était écrit dans les étoiles";
let message_gagnant_4 = "Bravo ! Quel.le artiste !";

let message_perdant_1 = "Perdu... Les loups ont eu raison de toi";
let message_perdant_2 = "Dommage, perdu. Voici une couronne de chardons pour te réconforter";
let message_perdant_3 = "Loupé, les astres n'étaient pas de ton côté on dirait";
let message_perdant_4 = "Perdu, ce n'est pas un très beau tableau que tu nous a peint ici...";

let deckChoice = [1, 2, 3, 4];


let probaDeck = [loiBinomiale(0,3,0.25),loiBinomiale(1,3,0.25),loiBinomiale(2,3,0.25),loiBinomiale(3,3,0.25)]
console.log(loiBinomiale(0,3,0.25)+loiBinomiale(1,3,0.25)+loiBinomiale(2,3,0.25)+loiBinomiale(3,3,0.25))


/* VARIABLE ALÉATOIRE QUI DÉFINIT LE DECK 
loi binomiale */
function indiceDeck(probaDeck){
    const t = Math.random()
    let sumProba = 0.25
    let eventPositionInArray = 0
    let p = probaDeck
    for (let i=1; i< p.length ; i++){
        if ( sumProba <= t){
            sumProba += p[i]
            eventPositionInArray ++              
        }
    }
    if (eventPositionInArray === p.length)
        return eventPositionInArray-1
    else{
        return eventPositionInArray
    }
}

function initialiser(evt) {
    init_jeu();
    change_deck(deckChoice[indiceDeck(probaDeck)]);
}

function change_deck(evt) {
    console.log("Deck numéro " + evt);
    
    let lesCartesUn = document.getElementsByClassName("cartes_un_c");
    for (let uneCarteUn of lesCartesUn) {
        const previous_src = uneCarteUn.src;
        let index = previous_src.length - 13;
        uneCarteUn.src = previous_src.substr(0, index + 1) + evt + previous_src.substr(index + 2);
    }
    let lesCartesDeux = document.getElementsByClassName("cartes_deux_c");
    for (let uneCarteDeux of lesCartesDeux) {
        const previous_src = uneCarteDeux.src;
        let index = previous_src.length - 14;
        uneCarteDeux.src = previous_src.substr(0, index + 1) + evt + previous_src.substr(index + 2);
    }
    let lesCartesDos = document.getElementsByClassName("cartes_dos");
    for (let uneCarteDos of lesCartesDos) {
        const previous_src = uneCarteDos.src;
        let index = previous_src.length - 10;
        uneCarteDos.src = previous_src.substr(0, index + 1) + evt + previous_src.substr(index + 2);
    }
    let src_info = document.getElementById("img_info").src;
    document.getElementById("img_info").src = src_info.substr(0, src_info.length - 10 + 1) + evt + src_info.substr(src_info.length - 10 + 2);
    
    deckFinal = evt;
    
    const span = document.getElementById("theme");
    if(evt == 1){
        span.innerHTML = "loup-garou";
    } else if (evt == 2){
        span.innerHTML = "fleurs";
    } else if (evt == 3){
        span.innerHTML = "astrologie";
    } else if (evt == 4){
        span.innerHTML = "oeuvres d'art";
    }
}



function init_jeu() {
    const section_niveau = document.getElementById("section_niveau");
    const section_jeu = document.getElementById("section_jeu");
    const section_info = document.getElementById("info");
    console.log(section_info)
    section_jeu.style.display = "none";
    section_info.style.display = "none";
    document.getElementById("niveau_facile").addEventListener("click", () => {
        def_niveau("facile")
        section_info.style.display = "block";
    });

    document.getElementById("niveau_moyen").addEventListener("click", () => {
        def_niveau("moyen")
        section_info.style.display = "block";

    });

    document.getElementById("niveau_difficile").addEventListener("click", () => {
        def_niveau("difficile")
        section_info.style.display = "block";
    });
}

function def_niveau(evt) {
    niveau = evt;
    section_niveau.style.display = "none";
    section_jeu.style.display = "block";
    maj_nb_cartes();
    const span = document.getElementById("niveau");
    span.innerHTML = niveau;
}



/* VARIABLE ALEATOIRE QUI DETERMINE LE NOMBRE DE CARTES 
Loi de Poisson */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function maj_nb_cartes(){
   if (niveau == "facile"){
        nb_cartes = simulationPoisson(8);
    } else if (niveau == "moyen"){
        nb_cartes = simulationPoisson(9);
    } else if (niveau == "difficile"){
        nb_cartes = simulationPoisson(10);
    }
    if(nb_cartes<8)
        nb_cartes = 8
    if(nb_cartes>12)
        nb_cartes = 12
    console.log("nb paires : " + nb_cartes);
    lancer_jeu();
    const span = document.getElementById("nb_paires");
    span.innerHTML = nb_cartes;
    document.getElementById("trouvees").innerHTML = "0";
    document.getElementById("restantes").innerHTML = nb_cartes;
}

function lancer_jeu() {
    //Supression des cartes en trop
    const a_suppr = (2 * (12 - nb_cartes));
    for (let i = 0; i < 2 * a_suppr; i++) {
        let section = document.getElementById("jeuCartes");
        section.removeChild(section.lastChild);
    }
    
    /* VARIABLE ALEATOIRE POUR MELANGER LES CARTES 
    Loi Geometrique */
    //Préparation du mélange des cartes
    let lesCartes = document.getElementsByClassName("flip"); //On sélectionnes toutes les cartes
    let taille = lesCartes.length; //On récupère le nombre de cartes
    let probaPlacement = []; //On cree un tableau avec autant de cases qu'il y a de cartes
    let sum = 0;
    for (let i = 0; i < taille; i++) {
        probaPlacement[i] = loiGeometrique((1/taille)); //On remplit chaque case d'un nombre aléatoire
    }
    console.log(probaPlacement);
    //Melange des cartes
    let sum_geom = 0;
    let carte_a_changer = 0
    let section = document.getElementById("jeuCartes");
    for (let compteur = null; compteur <= 200; compteur++) {        
        for (let i = 0; i < probaPlacement.length; i++) {
            let nb = probaPlacement[i]+i; //on rajoute i pour varier au fur et à mesure de la boucle
            nb = nb%10;
            let carteAlea = lesCartes[nb];
            section.appendChild(carteAlea);
        }
    }
    
    for (let uneCarte of lesCartes) {
        uneCarte.addEventListener("click", retournerCarte);
    }
    def_temps_jeu();
}





/* DEFINITION DU TEMPS LIMITE 
Loi Uniforme*/
function def_temps_jeu(){
    if (niveau == "facile"){
        temps_jeu = loiUniforme(75,120); //Entre 75 et 120 sec
    } else if (niveau == "moyen"){
        temps_jeu = loiUniforme(60,105);  //Entre 60 et 105 sec
    } else if (niveau == "difficile"){
        temps_jeu = loiUniforme(50,105); ; //Entre 50 et 105 sec
    }
    temps_jeu = Math.round(temps_jeu)
    console.log("Temps jeu 1 : "+temps_jeu);
}

function lancer_timer() {
    let temps_restant = temps_jeu;
    interval1 = setInterval(() => {
        document.getElementById("timer").innerHTML = temps_restant;
        temps_restant--;
        if (temps_restant == 0) {
            /* VARIABLE ALÉATOIRE GESTION DU MESSAGE DE FIN 
            loi directe */
            window.removeEventListener("click", stop, true);
            const listeMessages = [message_perdant_1, message_perdant_2, message_perdant_3, message_perdant_4];
            const message = loiNonNumerique(listeMessages, deckFinal);
            console.log(message);
            window.alert(message);
            clearInterval(interval1);
            afficherBouton();
        }
    }, 1000);

}

function retournerCarte(evt) {
    let uneCarte = this;
    uneCarte.classList.add('face');
    uneCarte.removeEventListener("click", retournerCarte);
    if (premier_click) {
        lancer_timer();
        premier_click = false;
    }
    if (carte1 == null) {
        carte1 = uneCarte;
    } else {
        carte2 = uneCarte;
    }

    if (carte1 != null && carte2 != null) {
        window.setTimeout(afficherResultat, 1000);
        window.addEventListener("click", stop, true);
    }
}

function afficherResultat() {
    let faceCarte1 = carte1.dataset.carte;
    let faceCarte2 = carte2.dataset.carte;
    compte = compte + 1;
    if (faceCarte1 == faceCarte2) {
        carte1.style.opacity = "0";
        carte2.style.opacity = "0";
        carte1.addEventListener("transitionend", clonerCartes);
        carte1clonee = carte1.cloneNode(true);
        carte2clonee = carte2.cloneNode(true);
    } else {
        carte1.classList.remove('face');
        carte2.classList.remove('face');
        carte1.addEventListener("click", retournerCarte);
        carte2.addEventListener("click", retournerCarte);
        carte1 = null;
        carte2 = null;
        window.removeEventListener("click", stop, true);
    }
}

function clonerCartes(evt) {
    document.getElementById("cartesDecouvertes").appendChild(carte1clonee);
    document.getElementById("cartesDecouvertes").appendChild(carte2clonee);
    carte1clonee.style.opacity = "1";
    carte2clonee.style.opacity = "1";
    carte1 = null;
    carte2 = null;
    const span_trouvees = document.getElementById("trouvees");
    const span_restantes = document.getElementById("restantes");
    span_trouvees.innerHTML = document.getElementById("cartesDecouvertes").getElementsByClassName("flip").length/2;
    span_restantes.innerHTML = nb_cartes - (document.getElementById("cartesDecouvertes").getElementsByClassName("flip").length/2);
    
    window.removeEventListener("click", stop, true);
    if (document.getElementById("cartesDecouvertes").getElementsByClassName("flip").length == nb_cartes * 2) {
        clearInterval(interval1);
        window.removeEventListener("click", stop, true); 
        /* VARIABLE ALÉATOIRE GESTION DU MESSAGE DE FIN 
        loi directe */
        const listeMessages = [message_gagnant_1, message_gagnant_2, message_gagnant_3, message_gagnant_4];
        const message = loiNonNumerique(listeMessages, deckFinal);
        window.alert(message);
        afficherBouton();
    }
}

function stop(evt) {
    evt.stopPropagation();
}

function afficherBouton() {
    let bouton = document.getElementById("divRejouer");
    bouton.style.display = "flex";
    bouton.addEventListener("click", rejouer);
}

function rejouer(evt) {
    window.location.reload();
}