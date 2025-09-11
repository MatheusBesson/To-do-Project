
export function modalDeleteConfig() {

    return new Promise((resolve) => {


        const cancelBtn = document.getElementById('cancel');

        const deleteBtn = document.getElementById('delete');


        cancelBtn.addEventListener('click', () => {
            resolve(false);
        });

        deleteBtn.addEventListener('click', () => {
            resolve(true);
        });
    });
}