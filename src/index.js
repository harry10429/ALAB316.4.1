const regForm = document.getElementById("registration");
const logForm = document.getElementById("login");

const uNameR = regForm.elements["username"];
const email = regForm.elements["email"];
const pwdR = regForm.elements["password"];
const confPwd = regForm.elements["passwordCheck"];

const uNameL = logForm.elements["username"];
const pwdL = logForm.elements["password"];
const loginSti = logForm.elements["persist"];

regForm.addEventListener("submit", validateReg);

function validateReg(evt) {
  const nameVal = validateName();
  if (nameVal == false) {
    evt.returnValue = false;
    return false;
  }
  const emailVal = validatEmail();
  if (emailVal == false) {
    evt.returnValue = false;
    return false;
  }
  const pwdReg = validatePwd();
  if (pwdReg == false) {
    evt.returnValue = false;
    return false;
  }
  const confPWD = validateCPwd();
  if (confPwd == false) {
    evt.returnValue = false;
    return false;
  }
  alert(`Username: ${uNameR.value}
  Email: ${email.value}
  Password ${pwdR.value}
  confirmed password ${confPwd.value}
    `);
  let storeName = uNameR.value.toLowerCase();
  let storePwd = pwdR.value.toLowerCase();
  localStorage.setItem(storeName, storePwd);
  clearForm();
  return true;
}

function validateName() {
  const name = uNameR.value;
  let testR = false;
  if (!name == "" && !/\s/.test(name) && !/[^A-Za-z0-9]/.test(name)) {
    let arr = "";
    for (let i = 0; i < name.length; i++) {
      if (arr.includes(name[i])) {
        testR = true;
        break;
      }
      arr += name[i];
      if (i == name.length - 1 && test == false) {
        alert("Your username does not pass");
      }
    }
  } else {
    alert("Your user name does not pass");
  }
  return testR;
}
function validatEmail() {
  const emailN = email.value;
  const atpos = emailN.indexOf("@");
  const dotpos = emailN.lastIndexOf(".");
  const domain = emailN.slice(atpos + 1, emailN.length);

  if (atpos < 1) {
    alert(
      "Your email must include an @ symbol, which must not be at the beginning."
    );
    email.focus();
    return false;
  }

  if (dotpos - atpos < 2 || domain == "example.com") {
    alert(
      "Invalid structure: @. \n You must include a domain name after the @ symbol and not exmaple.com."
    );
    email.focus();
    return false;
  }
  return true;
}

function validatePwd() {
  const pwdRe = pwdR.value;
  if (
    /[^A-Z]/.test(pwdRe) &&
    /[^a-z]/.test(pwdRe) &&
    /[^0-9]/.test(pwdRe) &&
    /[^A-Za-z0-9]/.test(pwdRe)
  ) {
    let pwdTemp = pwdRe.toLowerCase();
    if (
      // !pwdTemp.includes(uNameR.value.toLowerCase()) &&
      !pwdTemp == "password"
    ) {
      return true;
    }
  } else {
    alert("Your password did not meet requirment");
    return false;
  }
}

function validateCPwd() {
  const pwdC = confPwd.value;
  if (pwdC === pwdR.value) {
    return true;
  }
  alert("Two password does not match each other");
  return false;
}

function clearForm() {
  regForm.reset();
}

logForm.addEventListener("submit", validateLog);

function displayM() {
  if (loginSti.checked) {
    alert(
      "normally, this would be handled by a variety of persistent login tools and technologies"
    );
  } else {
    alert("Sucess Login!");
  }
}

function validateLog(evt) {
  const logValid = loginValidate();
  if (logValid === false) {
    evt.returnValue = false;
    return false;
  }
  displayM();
  logForm.reset();
  return true;
}

function loginValidate() {
  const logName = uNameL.value.toLowerCase();
  const logPwd = pwdL.value.toLowerCase();
  if (logName || logPwd) {
    if (localStorage.getItem(logName) !== null) {
      let keyName = localStorage.getItem(logName);

      if (keyName == logPwd) {
        return true;
      }
      alert("Password does not match");
      return false;
    }
    alert("There is no existed Username");
    return false;
  }
  alert("Both field can't be empty");
  return false;
}
