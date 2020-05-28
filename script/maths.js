
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

console.log(loiBinomiale(1,6,0.3));
