// ___ Register Form Functionalities ___ //

const password = document.getElementById("reg-password");

// Show-hide password
let iconsShow = document.getElementsByClassName("icon-show");
const pathsHide = document.getElementsByClassName("path-hide");
const pathsShow = document.getElementsByClassName("path-show");
let showFlag = new Array(iconsShow.length).fill(0);
for (let index = 0; index < iconsShow.length; index++) {
  iconsShow[index].addEventListener("click", () => {
    if (showFlag[index] == 0) {
      iconsShow[index].previousSibling.type = "text";
      pathsHide[index].style.display = "block";
      pathsShow[index].style.display = "none";
      showFlag[index] = 1;
    } else {
      iconsShow[index].previousSibling.type = "password";
      pathsHide[index].style.display = "none";
      pathsShow[index].style.display = "block";
      showFlag[index] = 0;
    }
  });
}

// Check CapsLock activated
const capsLockMessage = document.getElementById("caps-message");
password.addEventListener("keyup", (event) => {
  // If "caps lock" is pressed, display the warning text
  if (event.getModifierState("CapsLock")) {
    capsLockMessage.innerHTML = "Caps lock is ON";
    capsLockMessage.style.color = "red";
  } else {
    capsLockMessage.innerHTML = "";
  }
});

// Check confirm password
const confirmPassword = document.getElementById("confirm-password");
const confirmMessage = document.getElementById("confirm-message");
const check = () => {
  // If some value is added in confirmP o the password changes,
  // display the matching text
  if (password.value == confirmPassword.value) {
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

// ___  Switch between LOGIN & REGISTER FORM ___ //

const aLogin = document.querySelector("#a-login");
if (aLogin) {
  const aRegister = document.querySelector("#a-register");
  const divLogin = document.querySelector(".login");
  const divRegister = document.querySelector(".register");
  aLogin.addEventListener("click", () => {
    divLogin.style.display = "inline-block";
    divRegister.style.display = "none";
  });
  aRegister.addEventListener("click", () => {
    divRegister.style.display = "inline-block";
    divLogin.style.display = "none";
  });
}

// ___ Little cat moving eyes ___ //

var pupil = document.getElementsByClassName("pupil");
if (pupil) {
  document.onmousemove = () => {
    var x = (event.clientX * 8) / window.innerWidth + "%";
    var y = (event.clientY * 8) / window.innerHeight + "%";

    for (var i = 0; i < 4; i++) {
      pupil[i].style.left = x;
      pupil[i].style.top = y;
      pupil[i].style.transform = "translate(" + x + "," + y + ")";
    }
  };
}
