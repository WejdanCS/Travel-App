function displayErrorMsg(message) {
    var errorMessage = document.querySelector(".error-message");
    errorMessage.innerHTML = message;

}

export {
    displayErrorMsg
}