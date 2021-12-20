const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let taskName;

const fillTaskInfo = (task) => {
    const { _id: taskID, completed, name } = task;

    taskIdDOM.textContent = taskID;
    taskNameDOM.value = name;
    taskName = name;
    if (completed) {
        taskCompletedDOM.checked = true;
    }
};
const showTask = async() => {
    try {
        const data = await (await fetch(`/api/v1/tasks/${id}`)).json();
        const task = data.task;
        fillTaskInfo(task);
    } catch (error) {
        console.log(error);
    }
};

showTask();

editFormDOM.addEventListener("submit", async(e) => {
    editBtnDOM.textContent = "Loading...";
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;
        const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: taskName, completed: taskCompleted }),
        };
        const data = await (await fetch(`/api/v1/tasks/${id}`, options)).json();
        const task = data.task;
        fillTaskInfo(task);
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, edited task`;
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        console.log(error);
        taskNameDOM.value = taskName;
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = `error, please try again`;
    }
    editBtnDOM.textContent = "Edit";
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});