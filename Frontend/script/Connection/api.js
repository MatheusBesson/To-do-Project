import { displayTodos } from "../../elements-list/todos-list.js";
import { API_URL } from "../config/config.js";


export async function fetchTodos() {

    try {
        const response = await fetch(API_URL); // faz a requisição GET
        
        if (!response.ok) throw new Error("Erro ao buscar ToDos");

        const todos = await response.json(); // transforma em JSON
        
         // mostra na tela
         displayTodos(todos);

    } catch (error) {
        console.error(error);
    }
}
