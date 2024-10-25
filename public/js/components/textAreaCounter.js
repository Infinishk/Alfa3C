function textareaCounter(id) {
    const textarea = document.getElementById(id);
    const countDisplay = document.getElementById(`${id}-count`);

    const updateCount = () => {
        countDisplay.textContent = textarea.value.length;
    };

    textarea.addEventListener('input', updateCount);
    updateCount(); // Contador inicial
}

export { textareaCounter};