var randomNumber = function(min, max) {
    var result = Math.floor(Math.random() * (max - min + 1)) + min;

    return result;
}

module.exports = randomNumber;