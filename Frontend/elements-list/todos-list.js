export function displayTodos(todos) {

    const ul = document.getElementById("todo-list");

    ul.innerHTML = ""; // limpa lista antes de adicionar

    todos.forEach(todo => {

        const divTodos = document.createElement("div");
        divTodos.className = 'todos';

        const title = document.createElement("p");
        const description = document.createElement("p");
        var status = document.createElement("p");
        const changeStatusButton = document.createElement("button");

        title.textContent = todo.title;
        description.textContent = todo.description;

        status.textContent = todo.status ? 'completed' : 'To do';

        changeStatusButton.id = 'changeStatusButton';
        changeStatusButton.innerText = 'Change status';



        divTodos.appendChild(title);
        divTodos.appendChild(description);
        divTodos.appendChild(status);
        divTodos.appendChild(changeStatusButton);

        ul.appendChild(divTodos);
    });

}


