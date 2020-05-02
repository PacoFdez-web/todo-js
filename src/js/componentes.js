import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
// EVENTOS
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
// FILTROS
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// Necesitamos recibir las tareas en el argumento
// Función de flecha e interpolación de strings
export const crearTodoHtml = (todo) => {

    // LISTA ORDENADA (de todo.class.js)
    // Clase completed tacha la tarea. Por defecto, false (en todo.class.js)
    // Igual con checked
    const htmlTodo = `
    <li class="${  (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${  (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // Construímos un DIV
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    // inserta el primer hijo: LI
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}


// Eventos
// EScribir la nueva tarea
// addEventListener() registra un evento a un objeto en específico
// Keyup - cuando la tecla es soltada
// Value - la tarea escrita. KeyCode - Tecla pulsada - 13 ENTER
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        // Insertamos la tarea en el HTML
        // Y la borramos del cajetín
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }


});

divTodoList.addEventListener('click', (event) => {

    // propiedad localName, para obtener el nombre del botón y mostrarlo 
    const nombreElemento = event.target.localName; // input, label y button
    // Referencia al LI (div - li) - parentElement
    const todoElemento = event.target.parentElement.parentElement;
    // getAttribute() devuelve el valor del atributo especificado
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { // click en el check 
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    } else if (nombreElemento.includes('button')) { // hay que borrar el todo
        // La tarea y el elemento HTML
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }

});


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    // FOR INVERSO: Eliminar de abajo hacia arriba. El último
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        // Sí tiene la clase completed se elimina
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});


// FILTRAR
ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return; }

    // Para remover la clase selected
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    // clase hidden oculta el elemento
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }

});