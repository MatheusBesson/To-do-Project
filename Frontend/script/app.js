const apiUrl = "http://localhost:8080/to-do-list"; // URL da sua API

async function fetchTodos() {
    try {
        const response = await fetch(apiUrl); // faz a requisição GET
        if (!response.ok) throw new Error("Erro ao buscar ToDos");
        
        const todos = await response.json(); // transforma em JSON
        displayTodos(todos); // mostra na tela
    } catch (error) {
        console.error(error);
    }
}

function displayTodos(todos) {
    const ul = document.getElementById("todo-list");
    ul.innerHTML = ""; // limpa lista antes de adicionar

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.title; // ou outro campo que sua API retorna
        ul.appendChild(li);
    });
}

// Executa ao carregar a página
fetchTodos();
