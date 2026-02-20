const toggleTheme = document.getElementById('theme-toggle');
const html = document.documentElement;
const toggleWrapper = document.querySelector('.theme-toggle-wrapper')
const taskList = document.getElementById('task-list');
const empty = document.getElementById('empty-state');
let tasks = [];

// Functions
function renderTask(){
    taskList.innerHTML = "";

    if(tasks.length === 0){
        empty.style.display = "flex";
    }
    else{
        empty.style.display = "none";
    }

    tasks.forEach((task) => {
        // We use your exact HTML blueprint here!
        const taskHTML = `
        <div class="flex justify-between items-center bg-base-200 gap-3 w-full p-3 rounded-[8px] mt-3">
            <input type="checkbox" class="checkbox checkbox-lg" ${task.complete ? 'checked' : ''} />
            <span class="text-[18px] flex-1 ${task.complete ? 'line-through opacity-50' : ''}">
                ${task.text}
            </span>
            <button class="btn btn-ghost btn-sm btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 18L18 6M6 6l12 12"/>    
                </svg>
            </button>
        </div>
        `;

        taskList.innerHTML += taskHTML;
    });
}



// Loads THEME
if (html.getAttribute('data-theme') === 'light'){
    toggleTheme.checked = true;
}

// toggle theme animation
toggleWrapper.classList.add('visible')

// Toggle theme
toggleTheme.addEventListener('change', () => {
    if (toggleTheme.checked) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
})

// Adding task
const value = document.getElementById('value');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', () => {
    // Checks if that value is empty or not
    const taskText = value.value.trim();

    if (taskText !== ""){

        let newTask = {
        id: Date.now(),
        text: value.value.trim(),
        complete: false
    };

    // Pushes the object into the array
    tasks.push(newTask);


    // Deletes the previous value
    value.value = "";
    renderTask();

    }



})
