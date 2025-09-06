import { API_URL } from "../script/config/config";
import { addOneToDo } from "./todos-list";

export function createToDo() {

    const form = document.getElementById('todo-form');


    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // no page reload


        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: title, 
                    description: description, 
                    status: false})
            });

            if(!response.ok) throw new Error('Error when creating ToDo');

            const result = await response.json();
            console.log(result);
            
        } catch (error){
            console.log(error);
        }
    })
}

// changestatus button function (toggleStatus)