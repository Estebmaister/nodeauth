let currentTab = 0; // Current tab is set to be the first tab (0)

const validateForm = () => {
  // This function deals with validation of the form fields
  let allTabs,
    inputsCurrentTab,
    index,
    valid = true;
  allTabs = document.getElementsByClassName("tab");
  inputsCurrentTab = allTabs[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (index = 0; index < inputsCurrentTab.length; index++) {
    // If a field is empty...
    if (inputsCurrentTab[index].value == "") {
      // add an "invalid" class to the field:
      inputsCurrentTab[index].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
};

const fixStepIndicator = (numberTab) => {
  // This function removes the "active" class of all steps...
  let index,
    stepPoints = document.getElementsByClassName("step");
  for (index = 0; index < stepPoints.length; index++) {
    stepPoints[index].className = stepPoints[index].className.replace(
      " active",
      ""
    );
  }
  //... and adds the "active" class to the current step:
  stepPoints[numberTab].className += " active";
};

const nextPrev = (numberTab) => {
  // This function will figure out which tab to display
  const formTabs = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (numberTab == 1 && !validateForm()) return false;
  // Hide the current tab:
  formTabs[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + numberTab;
  // if you have reached the end of the form... :
  if (currentTab >= formTabs.length) {
    //...the form gets submitted:
    document.getElementById("multiForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
};

const showTab = (numberTab) => {
  // This function will display the specified tab of the form ...
  const formTabs = document.getElementsByClassName("tab");
  formTabs[numberTab].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (numberTab == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (numberTab == formTabs.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(numberTab);
};

showTab(currentTab); // Display the current tab
