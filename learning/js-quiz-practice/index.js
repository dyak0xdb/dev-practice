document.addEventListener("DOMContentLoaded", () => {
    // Quiz page asd.html
    const btn1 = document.getElementById('submitBtn');
    const alert1 = document.getElementById('customAlert');
    if(btn1 && alert1){
        btn1.addEventListener('click', () => {
            const option = document.getElementById('optionDim');
            if(option.checked){
                alert1.innerHTML = `Correct Answer! ✅ <a href="asd1.html">Next Question »</a>`;
                alert1.classList.add('show');
            } else {
                alert1.textContent = "Wrong Answer! ❌";
                alert1.classList.add('show');
                setTimeout(() => alert1.classList.remove('show'), 9000);
            }
        });
    }

    // // Quiz page asd1.html
    const btn2 = document.getElementById('submitBtn2');
    const alert2 = document.getElementById('customAlert');
    if(btn2 && alert2){
        btn2.addEventListener('click', () => {
            const option = document.getElementById('option14');
            if(option.checked){
                alert2.innerHTML = `Correct Answer! ✅ <a href="asd2.html">Next Question »</a>`;
                alert2.classList.add('show');
            } else {
                alert2.textContent = "Wrong Answer! ❌";
                alert2.classList.add('show');
                setTimeout(() => alert2.classList.remove('show'), 9000);
            }
        });
    }
    // // Quiz page asd2.html
    const btn3 = document.getElementById('submitBtn3');
    const alert3 = document.getElementById('customAlert3');
     if(btn3 && alert3){
        btn3.addEventListener('click', () => {
            const option = document.getElementById('option14');
            if(option.checked){
                alert3.innerHTML = `Correct Answer! ✅ <a href="asd3.html">Next Question »</a>`;
                alert3.classList.add('show');
            } else {
                alert3.textContent = "Wrong Answer! ❌";
                alert3.classList.add('show');
                setTimeout(() => alert3.classList.remove('show'), 9000);
            }
        });
    }

    // Quiz page asd3.html
let userInput = ["", ""]; // Store values from the two inputs

const alrt4 = document.getElementById('customAlert3');
const btn4 = document.getElementById('submitbtn4');

    window.writinginput = function(el, index) {
        userInput[index] = el.value.trim();
    }
btn4.addEventListener('click', function () {
    if(userInput[0] === "carName" && userInput[1] === "Volvo"){
        alrt4.innerHTML = `Completed ✅`;
        alrt4.classList.add('show');
    } else {
        alrt4.innerHTML = `Wrong answer ❌, try again.`;
        alrt4.classList.add('show');
    }
    setTimeout(() => alrt4.classList.remove('show'), 3000);
});});

// quizprogress 

document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".quizprogressline");
    let progress = 0;

    const page = window.location.pathname.split("/").pop();
    switch(page) {
        case "asd.html":
            progress = 25;
            break;
        case "asd1.html":
            progress = 50;
            break;
        case "asd2.html":
            progress = 75;
            break;
        case "asd3.html":
            progress = 100;
            break;
        default:
            progress = 0;
    }

    progressBar.style.width = progress + "%";
});
