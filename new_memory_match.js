function Board_Constructor(array) {
    var self = this;
    var new_array = [];
    this.cards = array;
    this.newArray = this.randomize(array);
    this.randomize = function (array) {
        for (o = 0; o < 2; o++) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            new_array.push(array);
        }
    }
}

