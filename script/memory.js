"use strict";

document.addEventListener("DOMContentLoaded", initialiser);
var carte1;
var carte2;
var carte1clonee;
var carte2clonee;
var compte;

function initialiser(evt){
    var lesCartes = document.getElementsByClassName("flip");
    compte=null;
    //Melanger les cartes
    for (var compteur=null; compteur<=50; compteur++){
        var taille = lesCartes.length-1;
        var alea = Math.round(Math.random()*taille);
        var carteAlea=lesCartes[alea];
        var section = document.getElementById("jeuCartes");
        section.appendChild(carteAlea);
    }
    for (var uneCarte of lesCartes){
        uneCarte.addEventListener("click", retournerCarte);
    }
    
    /* ALEATOIRE A CHANGER ICI */
    /* CHOIX DU DECK AFFICHE */
    const alea_deck = Math.random();
    if(alea_deck<1/4){
        change_deck(1);
    } else if (1/4<=alea_deck && alea_deck < 2/4){
        change_deck(2);
    } else if (2/4<=alea_deck && alea_deck< 3/4){
        change_deck(3);
    } else {
        change_deck(4);
    }
}

function change_deck(evt){
    console.log(evt);
    var lesCartes = document.querySelectorAll("img");
    for (var uneCarte of lesCartes){
        const previous_src = uneCarte.src;
        const pos = previous_src.indexOf("u");
        uneCarte.src = previous_src.substr(0, pos+1)+evt+previous_src.substr(pos+2);
    }
}

function nb_cartes(evt){
    if (evt == 1){
        //Nombres cartes niveau facile
    }
}

function retournerCarte(evt){
    var uneCarte = this;
    uneCarte.classList.add('face');
    uneCarte.removeEventListener("click", retournerCarte);
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
    if(document.getElementById("cartesDecouvertes").getElementsByClassName("flip").length==24){ //remettre à 16
        window.alert("Vous avez gagné en "+compte+" coups");
    }
}

function stop(evt){
    evt.stopPropagation();
}

function afficherBouton(evt){
    var bouton = document.getElementById("divRejouer");
    bouton.style.display="flex";
    bouton.addEventListener("click", rejouer);
}

function rejouer(evt){
    window.location.reload();
}

