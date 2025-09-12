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

        const divInputs = document.createElement('div');

        divInputs.id = 'divInputs';

        const title = document.createElement("p");
        title.id = 'titleTodo';

        const description = document.createElement("p");
        description.id = 'descriptionTodo' ;

        var status = document.createElement("p");
        

        title.textContent = todo.title;
        description.textContent = todo.description;
        status.textContent = todo.status ? '✅' : '⏳';

        if(status.textContent == '✅') {
            title.style.textDecoration = "line-through";
            description.style.textDecoration = "line-through";
            
            divTodos.style.transition = "opacity 0.3s ease";
            divTodos.style.opacity = 0.5;
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


