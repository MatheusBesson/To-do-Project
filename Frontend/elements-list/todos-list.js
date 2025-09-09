
export let selectedTodoId = null;

export function displayTodos(todos) {

    const ul = document.getElementById("todo-list");

    ul.innerHTML = ""; // limpa lista antes de adicionar

    todos.forEach(todo => {

        const divTodos = document.createElement("div");
        divTodos.className = 'todos';
        divTodos.dataset.id = todo.id;

        const title = document.createElement("p");
        const description = document.createElement("p");
        var status = document.createElement("p");
        

        title.textContent = todo.title;
        description.textContent = todo.description;
        status.textContent = todo.status ? '✅' : '⏳';

        // clique na div seleciona o ToDo
        divTodos.addEventListener('click', () => {
            selectedTodoId  = divTodos.dataset.id;
            document.querySelectorAll('.todos').forEach(d => d.style.background = '');
            divTodos.style.background = '#cc6767ff';
            console.log('ToDo selected', selectedTodoId);
        })

        changeStatusButton.id = 'changeStatusButton';
        changeStatusButton.innerText = 'Change status';



        divTodos.appendChild(title);
        divTodos.appendChild(description);
        divTodos.appendChild(status);
        

        ul.appendChild(divTodos);
    });

}


