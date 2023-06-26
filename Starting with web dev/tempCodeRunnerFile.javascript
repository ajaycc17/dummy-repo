var window = this;
function outerfunction() {
    console.log(a);

    var a = 10;

    innerfunction();

    function innerfunction() {
        console.log(a);

        console.log(window.a);

        console.log(this.a);
    }
}

var a = 7;

var b = 3;

outerfunction();
