import { getSelectedTodoId } from "../script/config/config.js";

export function modalUpdateConfig() {

    const div = document.getElementById('container-update-transparent');

    div.style.display = 'none';

    const button = document.getElementById('updateButton');

    const closeButton = document.getElementById('close-modal-update-button');

    const title = document.getElementById('title-update');
    const description = document.getElementById('description-update');

    button.addEventListener('click', () => {

        if (!getSelectedTodoId()) {
            alert('Select a task first!');
            return;
        } else {
            if (div.style.display === 'none') {
                div.style.display = 'flex';
            } else if (div.style.display === 'flex') {
                div.style.display = 'none';
            }
        }

    });


    closeButton.addEventListener('click', () => {
        div.style.display = 'none';
        title.value = '';
        description.value = '';
    });

}