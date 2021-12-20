const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
const newTaskBtnDOM = document.querySelector(".new-task-btn");

const createTaskDOMEle = (completed, name, taskID) => {
    return `<div class="single-task ${completed && "task-completed"}">
     <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
     <div class="task-links">
    
     <!-- edit link -->
     <a href="task.html?id=${taskID}" class="edit-link">
     <i class="fas fa-edit"></i></a>
     <!-- delete btn -->
     <button type="button" class="delete-btn" data-id="${taskID}">
     <i class="fas fa-trash"></i>
    </button>
     </div>
     </div>`;
};

const showTasks = async() => {
    loadingDOM.style.visibility = "visible";
    try {
        const request = await fetch("/api/v1/tasks");
        const data = await request.json();

        if (data.tasks.length < 1) {
            tasksDOM.innerHTML = ` <h5 class="empty-list">No tasks in your list</h5>`;
            loadingDOM.style.visibility = "hidden";
            return;
        }
        const allTasks = data.tasks
            .map((task) => {
                const { completed, _id: taskID, name } = task;
                return createTaskDOMEle(completed, name, taskID);
            })
            .join("");

        loadingDOM.style.visibility = "hidden";
        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        tasksDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
    loadingDOM.style.visibility = "hidden";
};
showTasks();

// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async(e) => {
    const ele = e.target;
    if (ele.parentElement.classList.contains("delete-btn")) {
        loadingDOM.style.visibility = "visible";
        const id = ele.parentElement.dataset.id;
        try {
            await fetch(`/api/v1/tasks/${id}`, {
                method: "DELETE",
            });

            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
    loadingDOM.style.visibility = "hidden";
});

// form
const showForm = () => {
    newTaskBtnDOM.classList.add("display-none");
    formDOM.classList.remove("display-none");
};

newTaskBtnDOM.addEventListener("click", showForm);
formDOM.addEventListener("submit", async(e) => {
    e.preventDefault();
    const taskName = taskInputDOM.value;
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName }),
    };
    console.log(options);
    try {
        const response = await fetch("/api/v1/tasks", options);
        console.log(response);

        showTasks();
        if (response.status === 201) {
            taskInputDOM.value = "";
            formAlertDOM.style.display = "block";
            formAlertDOM.textContent = `success, task added`;
            formAlertDOM.classList.add("text-success");
        } else {
            formAlertDOM.style.display = "block";

            formAlertDOM.textContent = `error, please try again`;
        }
    } catch (error) {
        console.log(error);
    }
    setTimeout(() => {
        if (taskInputDOM.value.length === 0) {
            formDOM.classList.add("display-none");
        }

        formAlertDOM.classList.remove("text-success");
        formAlertDOM.style.display = "none";
        newTaskBtnDOM.classList.remove("display-none");
    }, 5000);
});