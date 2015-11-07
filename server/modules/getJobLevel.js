//var randomNumber = require("./randomNumber");
var jobLevelArray = ["Jr.", "Mid", "Sr.", "Manager", "Director", "VP", "President"];


//

function randomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

var getJobLevel = function(){
    var num = randomNum(0, (jobLevelArray.length -1));
    for (var i = 0; i < jobLevelArray.length; i++){
        if (num == i) {
            return jobLevelArray[i];
        }
    }
};

module.exports = getJobLevel;