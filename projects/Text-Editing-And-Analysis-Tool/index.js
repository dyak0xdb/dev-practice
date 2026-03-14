const enterBtn = document.getElementById("enterText");
const textarea = document.getElementById("result");
const operators = document.getElementById("operators");
const upperBtn = document.getElementById("toUpperCase");
const upperBt2 = document.getElementById("toLowerCase");
const upperBt3 = document.getElementById("trim");
const upperBt4 = document.getElementById("trimStart");



function handleEnterText() {
  let valueUsers = prompt("Please add a text");

  switch (true) {
    case valueUsers && valueUsers.trim() !== "":
      textarea.value = valueUsers;     
      textarea.classList.add("show");  
      operators.classList.add("show");  
      enterBtn.style.display = "none"; 
      break;

    default:
      alert("You didn't enter anything!");
      break;
  }
}

enterBtn.addEventListener("click", handleEnterText);

upperBtn.addEventListener("click", () => {
  textarea.value = textarea.value.toUpperCase();
});
upperBt2.addEventListener("click", () => {
  textarea.value = textarea.value.toLowerCase();
});
upperBt3.addEventListener("click", () => {
  textarea.value = textarea.value.trim();
});
upperBt4.addEventListener("click", () => {
  textarea.value = textarea.value.trimStart();
});
