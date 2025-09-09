
import { API_URL } from "./config/config.js";
import { fetchTodos } from "./Connection/api.js";
import { selectedTodoId } from "../elements-list/todos-list.js";
import { modalCreateConfig } from "../modal/modal-create.js";




function startApp() {
    fetchTodos();
    createToDo();
    deleteToDo();
    changeStatus();
    updateToDo();


}

startApp();

// CRUD and functions ===========================================



function createToDo() {

    modalCreateConfig();

    const form = document.getElementById('todo-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: false
                })
            });

            if (!response.ok) {
                throw new Error("Erro creating ToDo");
            }

        } catch (error) {
            console.error("Error request:", error);
        }
        fetchTodos();
    });
}

function deleteToDo() {

    const button = document.getElementById('deleteButton');

    button.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/${selectedTodoId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                console.log('ERROR when deleting task');
                return;
            }

            const deleted = await response.json();
            console.log("Task deleted!", deleted);
            fetchTodos();
            selectedTodoId = null; // limpa a seleção

        } catch (error) {
            console.error('Connection ERROR');
        }
        fetchTodos();
    })
}

export function updateToDo() {
    const buttonModal = document.getElementById('updateButton');
    const form = document.getElementById('todo-form-update');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        console.log("Clicou no botão!")

        const title = document.getElementById('title-update').value;
        const description = document.getElementById('description-update').value;

        if (!selectedTodoId) {
            alert("Select a task first!");
            return;
        }

        try {

            const response = await fetch(`${API_URL}/${selectedTodoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })

            });

            if (!response.ok) {
                throw new Error('Error updating toDo');
            }

            const updated = await response.json();
            console.log("Updated ToDo:", updated);

            fetchTodos();

        } catch (error) {
            console.error('Error updating request:', error);
        }
    });

    buttonModal.addEventListener('click', async () => {
        // todo
    });

}

export function changeStatus() {

    const button = document.getElementById('changeStatusButton');

    button.addEventListener('click', async () => {

        if (!selectedTodoId) {
            alert("First select a task.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${selectedTodoId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})

            });

            if (response.ok) {
                const updated = await response.json();
                console.log("Status updated!", updated);
                fetchTodos();
                selectedTodoId = null; // limpa a seleção
            }

        } catch (error) {
            console.error('Error when updating status');
        }
    });
}



