const form = document.getElementById("form-login");
const user = document.getElementById("inpt-usr");
const pass = document.getElementById("inpt-pass");

form.addEventListener("submit", function (e) {
  e.preventDefault();

const role = {
    admin:"NGRtaW4=",
    user:"ZHlhZWNoMA=="
}

// check credentials:
  switch (user.value) {
  case "dyaech0":
    if (pass.value === "dyaech0") {
      window.location.href = "/home.html";
      document.cookie = `role=${role.user}; path=/`;
    } else {
      alert("invalid username or password");
    }
    break;

  case "4dmin":
    if (pass.value === "4dmin") {
      window.location.href = "/dashboard.html";
        document.cookie = `role=${role.admin}; path=/`;

    } 
    break;

  default:
    alert("invalid username or password");
}

});
