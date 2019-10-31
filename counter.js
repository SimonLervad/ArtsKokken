// Tælleren
let count = 0;
// Tælleren man ser øverst på skærmen
var tæller = document.getElementsByClassName("tæller");
//tælleren man ser nederst på skærmen
var tællerTo = document.getElementsByClassName("tæller-to");
// function som tæller op
var next = function() {
	// "if" sætningen bestemmer hvorvidt den skal tælle eller ej, altså om man kan komme videre eller er nået til vejs ende.
	// hvis den er true, og "count++;" vil den gemme alle tal før værden af count. og bagefter fremvise værdien af count.
	if (count < 4) {
		count++;
		console.log(count);
		for (i = 0; i < count; i++) {
			tæller[i].style.backgroundColor = "#5A9ABE";
			tæller[i].style.color = "white";
			tællerTo[i].style.backgroundColor = "transparent";
		}
		tæller[count].style.backgroundColor = "green";
		tæller[i].style.color = "white";
		tællerTo[count].style.backgroundColor = "green";
	}
// looper igennem alle div på siden og gemmer alle undtager den vi nu er nået til.
	for (j = 0; j < 5; j++) {
		if (j === count) {
			$(j).style.display = "flex";
		} else {
			$(j).style.display = "none";
		}
	}
}
// function som tæller tilbage
// functionen next minder meget om denne function, den tæller dog bare en ned og looper bagfra i steder fra forfra. 
var back = function() {
	if (count > 0) {
		count--;
		console.log(count);
		for (i = 4; i > count; i--) {
			tæller[i].style.backgroundColor = "lightgrey";
			tæller[i].style.color = "black";
			tællerTo[i].style.backgroundColor = "transparent";
		}
		tæller[count].style.backgroundColor = "green";
		tæller[i].style.color = "white";
		tællerTo[count].style.backgroundColor = "green";
	}
	for (j = 0; j < 5; j++) {
		if (j === count) {
			$(j).style.display = "flex";
		} else {
			$(j).style.display = "none";
		}
	}
}