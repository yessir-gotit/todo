// --- SELECTORS ---
const toggleTheme = document.getElementById('theme-toggle');
const html = document.documentElement;
const toggleWrapper = document.querySelector('.theme-toggle-wrapper');
const taskList = document.getElementById('task-list');
const empty = document.getElementById('empty-state');
const value = document.getElementById('value');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.querySelector('.btn-error');
const progressText = document.querySelector('.text-green-500');
const progressBar = document.querySelector('.progress');

// Load tasks from LocalStorage or start empty
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// --- THEME LOGIC ---
if (toggleWrapper) toggleWrapper.classList.add('visible');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    toggleTheme.checked = (savedTheme === 'light');
}
toggleTheme.addEventListener('change', () => {
    const theme = toggleTheme.checked ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});


function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.complete).length;
    if (progressText) progressText.innerText = `${completed}/${total} done`;
    if (progressBar) {
        const percentage = total === 0 ? 0 : (completed / total) * 100;
        progressBar.value = percentage;
    }
}

function renderTask() {
    taskList.innerHTML = "";
    empty.style.display = tasks.length === 0 ? "flex" : "none";

    tasks.forEach((task) => {
        const taskHTML = `
        <div class="flex justify-between items-center bg-base-200 gap-3 w-full p-3 rounded-[8px] mt-2 task-item-animate">
            <input type="checkbox" 
                onchange="toggleTask(${task.id})" 
                class="checkbox checkbox-lg" 
                ${task.complete ? 'checked' : ''} />
            
            <span id="text-${task.id}" 
                class="text-[18px] flex-1 break-words transition-all duration-300 
                ${task.complete ? 'line-through opacity-50' : ''}">
                ${task.text}
            </span>

            <button onclick="deleteTask(${task.id})" class="btn btn-ghost btn-sm btn-circle text-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        `;
        taskList.innerHTML += taskHTML;
    });

    updateProgress();
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.complete = !task.complete;
        const textSpan = document.getElementById(`text-${id}`);
        if (textSpan) {
            textSpan.classList.toggle('line-through');
            textSpan.classList.toggle('opacity-50');
        }
        updateProgress();
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTask();
}

// EVENT LISTENERS

clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.complete);
    renderTask();
});

addBtn.addEventListener('click', () => {
    const taskText = value.value.trim();
    if (taskText !== "") {
        tasks.push({
            id: Date.now(),
            text: taskText,
            complete: false
        });
        value.value = "";
        renderTask();
    }
});

value.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

// Initial Render
renderTask();