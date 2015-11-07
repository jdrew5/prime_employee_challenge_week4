var Chance = require('chance');
var chance = new Chance();
var chanceGender;

var getName = function(gender){
    chanceGender = gender;
    if (gender=="both") {
        chanceGender = chance.gender().toLowerCase();
    }

    return { name: chance.name({ gender: chanceGender }),
            gender: chanceGender};
}

module.exports = getName;