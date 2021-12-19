const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

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

        console.log(data.tasks);
        if (data.tasks.length < 1) {
            tasksDOM.classList.remove("display-none");
            loadingDOM.style.visibility = "hidden";
            return;
        }
        const allTasks = data.tasks
            .map((task) => {
                const { completed, _id: taskID, name } = task;
                console.log(completed, taskID, name);
                return createTaskDOMEle(completed, name, taskID);
            })
            .join("");
        console.log(allTasks);
        loadingDOM.style.visibility = "hidden";
        tasksDOM.classList.remove("display-none");
        tasksDOM.innerHTML = allTasks;
        console.log(tasksDOM);
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
    console.log(ele);
    if (ele.parentElement.classList.contains("delete-btn")) {
        loadingDOM.style.visibility = "visible";
        const id = ele.parentElement.dataset.id;
        console.log(ele.parentElement.dataset.id);
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