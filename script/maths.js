
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
