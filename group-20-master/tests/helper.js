exports.generateUsername = function() {
    let randomNumber = Math.floor(Math.random() * 99999);
    let randomNumber2 = Math.floor(Math.random() * 99999);
    return "test" + randomNumber + randomNumber2;
}