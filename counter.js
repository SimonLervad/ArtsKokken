let count = 1;
var next = function() {
	if (count < 5) {
		count++;
		console.log(count);
		for (i = 1; i < count; i++) {
			$(i).style.backgroundColor = "transparent";
		}
		$(count).style.backgroundColor = "green";
	}
}
var back = function() {
	if (count > 1) {
		count--;
		console.log(count);
		for (i = 5; i > count; i--) {
			$(i).style.backgroundColor = "transparent";
		}
		$(count).style.backgroundColor = "green";
	}
}