const btnAdd = document.getElementById('add-id');
const taskList = document.querySelector('.task-list');
const inputBox = document.getElementById('input-box');
const dateInput = document.getElementById('date-input');

btnAdd.addEventListener('click', function () {
    const text = inputBox.value.trim();
    const dateValue = dateInput.value;

    if (!text) return;

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    // create checkbox for marking task as done
    const task_done = document.createElement('input');
    task_done.type = 'checkbox';
    task_done.className = 'done-checkbox';
    
    // fix the change function (crossing out text)
    task_done.addEventListener('change', function () {
        if (this.checked) {
            taskDiv.classList.add('completed');
        } else {
            taskDiv.classList.remove('completed');
        }
    });

    const title = document.createElement('h2'); 
    title.textContent = text;

    const displayDate = document.createElement('p');
    displayDate.textContent = dateValue ? dateValue : "No Date"; 

    // delete button
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.className = 'delete-btn';
    button.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this task?')) {
            taskDiv.remove();
        }
    });

    // edit button
    const button_edit = document.createElement('button');
    button_edit.textContent = 'Edit';
    button_edit.className = 'edit-btn';
    button_edit.addEventListener('click', function () {
        const newText = prompt('Edit your task:', title.textContent);
        if (newText !== null && newText.trim() !== '') {
            title.textContent = newText.trim();
        }
    });

    // adding elements to taskDiv
    taskDiv.appendChild(task_done);
    taskDiv.appendChild(title);
    taskDiv.appendChild(button_edit); 
    taskDiv.appendChild(button);
    taskDiv.appendChild(displayDate); 

    taskList.appendChild(taskDiv);
   
    // clear input fields
    inputBox.value = '';
    dateInput.value = ''; 
});
