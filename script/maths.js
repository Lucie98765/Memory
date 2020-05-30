function loiPoisson(lambda,k){
	let A = Math.pow(lambda, k)
    let L = Math.exp(-lambda)
    return ((A * L) / factorielle(k))
}
function loiBinomiale(k,n,p){
	return coeffBinomial(n,k)*Math.pow(p, k)*Math.pow(1-p,n-k)
}

function loiUniforme(a,b){
	return Math.random() * (b - a) + a
}
function factorielle(n){
	let result = 1
	for (var i = n; i > 1; i--) {
		result = result*i
	}
	return result
}
function simulationPoisson(lambda){
    const t = Math.random()
    let k=0
    let pc=loiPoisson(k,lambda)
    while (t>pc){
        k+=1
        pc+=loiPoisson(k,lambda)
    }
    return k
}
function coeffBinomial(n,k){
	return factorielle(n)/(factorielle(k)*factorielle(n-k))
}

function loiGeometrique(p){
    //p : probabilité
    let x = 1;
    let U = Math.random();
    while(U>p){
        x=x+1;
        U=Math.random(); 
    }
    return x 
}

function loiNonNumerique(messages, deck){
    //messages : tableau de messages
    //deck : le deck qui a été choisi
    const alea = Math.random();
    console.log("alea message : "+alea)
    if(deck == 1 && alea <= 0.7){ //Deck 1 
        return messages[0];
    } else if (deck == 1 && alea > 0.7 && alea <= 0.8){
        return messages[1];
    } else if (deck == 1 && alea > 0.8 && alea <= 0.9){
        return messages[2];
    } else if (deck == 1 && alea > 0.9){
        return messages[3];
    } else if (deck == 2 && alea <= 0.7){ //Deck 2
        return messages[1];
    } else if (deck == 2 && alea > 0.7 && alea <= 0.8){
        return messages[0];
    } else if (deck == 2 && alea > 0.8 && alea <= 0.9){
        return messages[2];
    } else if (deck == 2 && alea > 0.9){
        return messages[3];
    } else if (deck == 3 && alea <= 0.7){ //Deck 3
        return messages[2];
    } else if (deck == 3 && alea > 0.7 && alea <= 0.8){
        return messages[0];
    } else if (deck == 3 && alea > 0.8 && alea <= 0.9){
        return messages[1];
    } else if (deck == 3 && alea > 0.9){
        return messages[3];
    } else if (deck == 4 && alea <= 0.7){ //Deck 4
        return messages[3];
    } else if (deck == 2 && alea > 0.7 && alea <= 0.8){
        return messages[0];
    } else if (deck == 2 && alea > 0.8 && alea <= 0.9){
        return messages[2];
    } else if (deck == 2 && alea > 0.9){
        return messages[1];
    } 
}

