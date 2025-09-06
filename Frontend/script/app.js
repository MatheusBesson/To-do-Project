
import { API_URL } from "./config/config.js";
import { fetchTodos } from "./Connection/api.js";




function startApp() {
fetchTodos();
createToDo();


}

startApp();

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
