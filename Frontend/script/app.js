
import { API_URL } from "./config/config.js";
import { fetchTodos } from "./Connection/api.js";
import { selectedTodoId } from "../elements-list/todos-list.js";




function startApp() {
    fetchTodos();
    createToDo();
    deleteToDo();
    changeStatus();


}

startApp();

// CRUD and functions ===========================================



function createToDo() {

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
                throw new Error("Erro ao criar ToDo");
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
        }
        fetchTodos();
    })

}

function deleteToDo(id) { // pensar em uma maneira de pegar o id sem o usuario digitar

    const button = document.getElementById('deleteButton');
    id = 15;

    button.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                console.log('ERROR when deleting task');
            }
        } catch (error) {
            console.error('Connectio ERROR');
        }
        fetchTodos();
    })
}

export function changeStatus() {

    const button = document.getElementById('changeStatusButton');

    button.addEventListener('click', async () => {

        if (!selectedTodoId) {
            alert("First select a task.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${selectedTodoId}`, {
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



