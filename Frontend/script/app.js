
import { API_URL, getSelectedTodoId, setSelectedTodoId } from "./config/config.js";
import { fetchTodos } from "./Connection/api.js";

import { modalCreateConfig } from "../modal/modal-create.js";

import { modalUpdateConfig } from "../modal/modalUpdate.js";
import { modalDeleteConfig } from "../modal/modal-delete.js";






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

        const titleValue = document.getElementById("title").value;
        const descriptionValue = document.getElementById("description").value;

        const title = document.getElementById("title");
        const description = document.getElementById("description");

        const div = document.getElementById('container-create-transparent');

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleValue,
                    description: descriptionValue,
                    status: false
                })
            });

            if (!response.ok) {
                throw new Error("Erro creating ToDo");
            }

        } catch (error) {
            console.error("Error request:", error);
        }

        title.value = '';
        description.value = '';
        fetchTodos();
        div.style.display = 'none';
    });
}

function deleteToDo() {

    const button = document.getElementById('deleteButton');

    const div = document.getElementById('container-delete-trasparent');

    div.style.display = 'none';

    button.addEventListener('click', async () => {

        if (!getSelectedTodoId()) {
            alert("Select a task first!");
            return;
        }

        div.style.display = 'flex';

        let answer = await modalDeleteConfig();

        if (!answer) {
            div.style.display = 'none';
            setSelectedTodoId(null);
            return;
        }

        if (answer) {
            try {
                const response = await fetch(`${API_URL}/${getSelectedTodoId()}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    console.log('ERROR when deleting task');
                    return;
                }

                if (response.status === 204) {
                    console.log("Task deleted successfully (no content returned)");
                } else {
                    const deleted = await response.json();
                    console.log("Task deleted!", deleted);
                }


            } catch (error) {
                console.error('ERROR', error);
            }

            fetchTodos();
            div.style.display = 'none';
            setSelectedTodoId(null);
            
        }

    });
}

export function updateToDo() {

    modalUpdateConfig();


    const div = document.getElementById('container-update-transparent');

    const form = document.getElementById('todo-form-update');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        console.log("Clicou no botão!")

        let title = document.getElementById('title-update').value;
        let description = document.getElementById('description-update').value;

        if (!getSelectedTodoId()) {
            alert("Select a task first!");
            return;
        }

        try {

            const response = await fetch(`${API_URL}/${getSelectedTodoId()}`, {
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
            title = '';
            description = '';
            div.style.display = 'none';



        } catch (error) {
            console.error('Error updating request:', error);
        }

        setSelectedTodoId(null);
    });

}

export function changeStatus() {

    const button = document.getElementById('changeStatusButton');

    button.addEventListener('click', async () => {

        if (!getSelectedTodoId()) {
            alert("First select a task.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${getSelectedTodoId()}/status`, {
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
                setSelectedTodoId(null); // limpa a seleção
            }

        } catch (error) {
            console.error('Error when updating status');
        }
    });
}



