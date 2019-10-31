	
let Tunes = {
    intit: function(fornavn, efternavn, adresse, postnummer, by, email){
        this.fornavn = fornavn;
        this.efternavn = efternavn;
		this.adresse = adresse;
        this.postnummer = postnummer;
        this.by = by;
      	this.email = email;

    },
    vis: function(){
        return `<p>${this.fornavn} ${this.efternavn}</p><p>${this.adresse}</p><p>${this.postnummer} ${this.by}</p><p>${this.email}</p>`;
    }
};

const showTunes = function(){
    $('placeholder').innerHTML = "";
    for (let Tunes of arr){
        $('placeholder').innerHTML += Tunes.vis() + '<br/>';
        $('bestillingInfo').innerHTML += Tunes.vis() + '<br/>';
		//$('bestilling').innerHTML ="<p> Kære " + fornavn.value + " " + efternavn.value + ", <br><br> mange tak for din bestilling. <br>";
       //  $('bestilling2').innerHTML ="<br> Vi sender din bestilling til din adresse, <br>" + adresse.value + "<br>" + postnummer.value + " " + by.value + "<br> hurtigst muligt. <br><br> Mange hilsner ARTS køkken </p>";
        fornavn.value = "";
        efternavn.value = "";
		adresse.value = "";
        postnummer.value = "";
        by.value = "";
        email.value = "";

    }
}

function klik() {
    let t = Object.create(Tunes);
    t.intit(fornavn.value, efternavn.value, adresse.value, postnummer.value, by.value, email.value);
    arr.push(t);
    showTunes();
};

let arr = [];

document.getElementById("send").addEventListener("click", klik);