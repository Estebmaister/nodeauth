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

// ___ Show-hide password all icon-show class ___ //
const iconsShow = document.getElementsByClassName("icon-show");
if (iconsShow) {
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
}

// ___ Check CapsLock activated ___ //
const resPassword = document.querySelectorAll(".password-field");
if (resPassword) {
  const resCapsLockMessage = document.querySelectorAll(".caps-message");
  for (let index = 0; index < resPassword.length; index++) {
    resPassword[index].addEventListener("keyup", (event) => {
      // If "caps lock" is pressed, display the warning text
      try {
        if (event.getModifierState("CapsLock")) {
          resCapsLockMessage[index].innerHTML = "Caps lock is ON";
          resCapsLockMessage[index].style.color = "red";
        } else {
          resCapsLockMessage[index].innerHTML = "";
        }
      } catch (error) {
        console.log(`Can´t check capsLock in ${resPassword[index]}`);
      }
    });
  }
}

// ___ Check confirm password ___ //
const confirmPassword = document.querySelector(".confirm-password");
const confirmMessage = document.querySelector(".confirm-message");
const checkPassword = document.querySelector(".check-password");
const check = () => {
  // If some value is added in confirmP o the password changes,
  // display the matching text
  if (checkPassword.value == confirmPassword.value) {
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
