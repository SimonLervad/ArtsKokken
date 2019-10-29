let count = 0;
var tæller = document.getElementsByClassName("tæller");
var tællerTo = document.getElementsByClassName("tæller-to");
var next = function() {
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
}
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
		tæller[i].style.color = "black";
		tællerTo[count].style.backgroundColor = "green";
	}
}