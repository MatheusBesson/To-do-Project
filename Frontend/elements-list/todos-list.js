import { getSelectedTodoId, setSelectedTodoId } from "../script/config/config.js";


export function displayTodos(todos) {

    const ul = document.getElementById("todo-list");

    ul.innerHTML = ""; 

    todos.forEach(todo => {

        const divTodos = document.createElement("div");
        divTodos.className = 'todos';
        divTodos.dataset.id = todo.id;

        const divStatus = document.createElement('div');

        divStatus.id = 'divStatus';
        const title = document.createElement("p");
        const description = document.createElement("p");
        var status = document.createElement("p");
        

        title.textContent = todo.title;
        description.textContent = todo.description;
        status.textContent = todo.status ? '✅' : '⏳';

        }

        // clique na div seleciona o ToDo
        divTodos.addEventListener('click', () => {

            if(getSelectedTodoId() == divTodos.dataset.id) {
                setSelectedTodoId(null);

                divTodos.style.background = '#4a565e0e'
                return;
            }

            setSelectedTodoId(divTodos.dataset.id);

            document.querySelectorAll('.todos').forEach(d => d.style.background = '');

            divTodos.style.background = '#2b2b2bff';
            console.log('ToDo selected', getSelectedTodoId());
        })

        changeStatusButton.id = 'changeStatusButton';
        changeStatusButton.innerText = 'Change status';




        divTodos.appendChild(divInputs);
        divInputs.appendChild(title);
        divInputs.appendChild(description);

        divTodos.appendChild(divStatus);
        divStatus.appendChild(status);
        

        ul.appendChild(divTodos);
    });

}


