//Kreditkort
let CreditCard = {
    setState(ccno, expdate, name, cvv) {
        this.ccnumber = ccno;
        this.expdate = expdate;
        this.name = name;
        this.cvv = cvv;
    },

    isValid(val) {
        var s = 0;
        let ccnum = document.getElementById('ccno').value;
        var doubleDigit = false;
            for (var i = ccnum.length - 1; i >= 0; i--) {
                var digit = +ccnum[i];
                if (doubleDigit) {
                    digit *= 2;
                if (digit > 9)
                    digit -= 9;
                }
            s += digit;
            doubleDigit = !doubleDigit;
            }
        return s % 10 == 0;
        
    },
    isExpDate() { //Tjekker om datoen er korrekt
        let now = new Date();
        let a = this.expdate.split("/");
        let norm = Number(a[1] * 100) + Number(a[0]);
        now = now.getFullYear() % 100 * 100 + now.getMonth() + 1;
        if (norm >= now) {
            return true;
        } else {
            return false;
        }
    },
    vis: function(){
        return `<p>${this.ccnumber} <br> ${this.expdate} <br> ${this.cvv}</p>`;
    }


};

//Tjekker om kortet er rigtigt
const validate = function(e) {
    let cc = Object.create(CreditCard);
    let ccnumber = document.getElementById('ccno');
    let expdate = document.getElementById('exp').value;
    let cvv = document.getElementById('cvv').value;

    cc.setState(ccnumber.value, expdate, name, cvv);
    cc.isValid(); 
    cc.vis();
    cc.isExpDate(); 
    cc.isValid();
    $('place').innerHTML =  cc.isValid();
    //godkendt();
    
    if (!cc.isValid() === 0) { //Er kortet valid? 
        $('place').innerHTML = '<br> Kontonummeret er ikke korrekt';
        ccnumber.focus();
        e.preventDefault();
        return false;
    } if (!cc.isExpDate()) { //Udløbsdato er korrekt
        $('place').innerHTML = '<br> Udløbsdatoen er ikke korrekt';
        expdate.focus();
        e.preventDefault();
        return false;
    } if (cvv.length < 3 || cvv.length > 4) { //kontolcifre
        $('place').innerHTML = '<br> Kontrolcifre er ikke korrekt';
        cvv.focus();
        e.preventDefault();
        return false;
    } else {
        return true;
    }
    
};


//Har problemer med at fortælle om købet er godkendt eller ej
const godkendt = function() {
    //Kortnummer: 4111111111111111
    //udløbsdato: 11/19
    //kontrolcifre: 111
    console.log('gokednt');
    for(i = 0; i < 5; i++){
        console.log('test 2')
        if(validate() === true){
            console.log('test');
            return $('place').innerHTML = '<br> Betalingen er gennemført';
        }else{
            return $('place').innerHTML = '<br> Betalingen er ikke gennemført';
        }
    }   
};

const newOne = function() {
    ccno.value = "";
    exp.value = "";
    cvv.value = "";
};

const init = function() {
    $('send').addEventListener('click', validate);
};




window.addEventListener('load', init);