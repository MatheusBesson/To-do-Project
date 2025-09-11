export const API_URL = "http://localhost:8080/todos"; // URL da API


let selectedTodoId = null;

export function getSelectedTodoId() {
  return selectedTodoId;
}

export function setSelectedTodoId(id) {
  selectedTodoId = id;
}

