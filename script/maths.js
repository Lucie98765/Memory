function loiPoisson(lambda,k){
	let A = Math.pow(lambda, k);
    let L = Math.exp(-lambda);
    return ((A * L) / factorielle(k))
}
function loiBinomiale(k,n,p){
	return coeffBinomial(n,k)*Math.pow(p, k)*Math.pow(1-p,n-k);
}
function factorielle(n){
	let result = 1;
	for (var i = n; i > 1; i--) {
		result = result*i
	}
	return result;
}

function coeffBinomial(n,k){
	return factorielle(n)/(factorielle(k)*factorielle(n-k));
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

/*function loiMultinomiale(n, p){
    // n : nombre de fois que la simulation est lancée
    // p : le tableau des probabilités ? 
    let result;
    let nFacto = factorielle(n);
    let denom = 1;
    for(let i = 0; i< p.length; i++){
        denom = denom * factorielle(i);
    }
    let multi = 1;
    for(let i = 0; i< p.length; i++){
        multi = multi * Math.pow(p[i], i);
    }
    
    result = (nFacto/denom)*multi;
    return result;
     
}*/


