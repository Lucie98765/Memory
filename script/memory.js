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

let probaDeck = [loiBinomiale(0, 4, 0.25), loiBinomiale(1, 4, 0.25), loiBinomiale(2, 4, 0.25), loiBinomiale(3, 4, 0.25)]
console.log(loiBinomiale(0, 4, 0.25) + loiBinomiale(1, 4, 0.25) + loiBinomiale(2, 4, 0.25) + loiBinomiale(3, 4, 0.25))
console.log(probaDeck);

/* VARIABLE ALÉATOIRE QUI DÉFINIT LE DECK */
function indiceDeck(probaDeck) {
    const t = Math.random(); //nb entre 0 et 1
    let sumProba = 0
    let eventPositionInArray = 0
    let p = probaDeck //tableau de 4 valeurs entre 0 et 1
    for (let i = 0; i < p.length; i++) { // boucle de 4 tours
        if (sumProba <= t) { //tant que la somme des probas est inférieure à t
            sumProba += p[i] //On ajoute a sumproba la proba à la place i
            eventPositionInArray++ //on avance d'une case dans le tableau    
        }
    }
    if (eventPositionInArray == p.length) //on renvoie le deck à la place calculée au dessus
        return eventPositionInArray - 1
    else {
        return eventPositionInArray
    }
}

function initialiser(evt) {
    init_jeu();
    change_deck(deckChoice[indiceDeck(probaDeck)]);
}

function change_deck(evt) {
    console.log("Deck numéro " + evt);
    let lesCartes = document.querySelectorAll("img");
    for (let uneCarte of lesCartes) {
        const previous_src = uneCarte.src;
        const pos = previous_src.indexOf("u");
        uneCarte.src = previous_src.substr(0, pos + 1) + evt + previous_src.substr(pos + 2);
    }
    deckFinal = evt;
}



function init_jeu() {
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

function def_niveau(evt) {
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

function maj_nb_cartes() {
    let alea_nb_cartes = 0;
    if (niveau == "facile") {
        alea_nb_cartes = getRandomInt(3);
        nb_cartes = 8 + alea_nb_cartes;
    } else if (niveau == "moyen") {
        alea_nb_cartes = getRandomInt(3);
        nb_cartes = 9 + alea_nb_cartes;
    } else if (niveau == "difficile") {
        alea_nb_cartes = getRandomInt(3);
        nb_cartes = 10 + alea_nb_cartes;
    }
    console.log("nb cartes : " + nb_cartes);
    lancer_jeu();
}

function lancer_jeu() {
    const a_suppr = (2 * (12 - nb_cartes));
    console.log("a suppr : " + a_suppr);
    for (let i = 0; i < 2 * a_suppr; i++) {
        let section = document.getElementById("jeuCartes");
        //console.log(section.lastChild);
        section.removeChild(section.lastChild);
    }
    let lesCartes = document.getElementsByClassName("flip");
    let taille = lesCartes.length;
    console.log("taille : " + taille);
    //On cree un tableau avec autant de cases qu'il y a de cartes et dont chaque case contient la probablité d'être tirée
    let probaPlacement = [];
    let sum = 0;
    for (let i = 0; i < taille; i++) {
        probaPlacement[i] = loiGeometrique((1/taille));
    }
    console.log(probaPlacement);
    let sum_geom = 0;
    let carte_a_changer = 0

    //Melanger les cartes
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

function def_temps_jeu() {
    if (niveau == "facile") {
        temps_jeu = 75 + getRandomInt(60); //Entre 75 et 120 sec
    } else if (niveau == "moyen") {
        temps_jeu = 60 + getRandomInt(45); //Entre 60 et 105 sec
    } else if (niveau == "difficile") {
        temps_jeu = 50 + getRandomInt(55); //Entre 50 et 105 sec
    }
    console.log("Temps jeu 1 : " + temps_jeu);
}

function lancer_timer() {
    console.log("Temps jeu 1 : " + temps_jeu);
    let temps_restant = temps_jeu;
    interval1 = setInterval(() => {
        document.getElementById("timer").innerHTML = temps_restant;
        temps_restant--;
        if (temps_restant == 0) {
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
        window.setTimeout(afficherResultat, 1500);
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
    window.removeEventListener("click", stop, true);
    if (document.getElementById("cartesDecouvertes").getElementsByClassName("flip").length == nb_cartes * 2) {
        clearInterval(interval1);
        window.removeEventListener("click", stop, true); 
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