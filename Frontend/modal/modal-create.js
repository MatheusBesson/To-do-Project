export function modalCreateConfig() {

    const div = document.getElementById('container-create-transparent');
    div.style.display = 'none';
    const button = document.getElementById('createButton');

    const closeButton = document.getElementById('close-modal-create-button');

    const title = document.getElementById('title');
    const description = document.getElementById('description');

    closeButton.addEventListener('click', () => {
        div.style.display = 'none';
        title.value = '';
        description.value = '';
    });

    button.addEventListener('click', () => {

        if (div.style.display === 'none') {
            div.style.display = 'flex';
        } else if (div.style.display === 'flex') {
            div.style.display = 'none';
        }
    })
}