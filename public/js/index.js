// ___ Register Form Functionalities ___ //

// ___  Switch between LOGIN & REGISTER FORM ___ //

const aLogin = document.querySelector("#a-login");
if (aLogin) {
  const aRegister = document.querySelector("#a-register");
  const divLogin = document.querySelector(".login");
  const divRegister = document.querySelector(".register");
  aLogin.addEventListener("click", () => {
    divLogin.style.display = "inline-block";
    divRegister.style.display = "none";
    navigator.vibrate(50);
  });
  aRegister.addEventListener("click", () => {
    divRegister.style.display = "inline-block";
    divLogin.style.display = "none";
    navigator.vibrate(50);
  });
}

// Show-hide password all icon-show class
const iconsShow = document.getElementsByClassName("icon-show");
const pathsHide = document.getElementsByClassName("path-hide");
const pathsShow = document.getElementsByClassName("path-show");
for (let index = 0; index < iconsShow.length; index++) {
  iconsShow[index].addEventListener("mousedown", () => {
    iconsShow[index].previousSibling.type = "text";
    pathsHide[index].style.display = "block";
    pathsShow[index].style.display = "none";
  });
  iconsShow[index].addEventListener("mouseup", () => {
    iconsShow[index].previousSibling.type = "password";
    pathsHide[index].style.display = "none";
    pathsShow[index].style.display = "block";
  });
}

// Check CapsLock activated
const regPassword = document.getElementById("reg-password");
const regCapsLockMessage = document.getElementById("reg-caps-message");

regPassword.addEventListener("keyup", (event) => {
  // If "caps lock" is pressed, display the warning text
  try {
    if (event.getModifierState("CapsLock")) {
      regCapsLockMessage.innerHTML = "Caps lock is ON";
      regCapsLockMessage.style.color = "red";
    } else {
      regCapsLockMessage.innerHTML = "";
    }
  } catch (error) {
    console.log("Can´t check capsLock in #reg-password");
  }
});

const logPassword = document.getElementById("log-password");
const logCapsLockMessage = document.getElementById("log-caps-message");

logPassword.addEventListener("keyup", (event) => {
  // If "caps lock" is pressed, display the warning text
  try {
    if (event.getModifierState("CapsLock")) {
      logCapsLockMessage.innerHTML = "Caps lock is ON";
      logCapsLockMessage.style.color = "red";
    } else {
      logCapsLockMessage.innerHTML = "";
    }
  } catch (error) {
    console.log("Can´t check capsLock in #log-password");
  }
});

// Check confirm password
const confirmPassword = document.getElementById("confirm-password");
const confirmMessage = document.getElementById("confirm-message");
const check = () => {
  // If some value is added in confirmP o the password changes,
  // display the matching text
  if (regPassword.value == confirmPassword.value) {
    confirmMessage.style.color = "green";
    confirmMessage.innerHTML = "matching";
    confirmPassword.setCustomValidity("");
  } else {
    confirmMessage.style.color = "red";
    confirmMessage.innerHTML = "not matching";
    confirmPassword.setCustomValidity("Passwords Don't Match");
  }
  if (confirmPassword.value == "") confirmMessage.innerHTML = "";
};
