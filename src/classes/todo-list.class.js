import { Todo } from './todo.class';

export class TodoList {

    constructor() {

        // Arreglo de Tareas, inicializado vacío
        // this.todos = [];
        this.cargarLocalStorage();

    }

    // METODOS GENERALES
    // Recibo una tarea y lo inserto con push() en el arreglo vacio
    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    // Recibo el ID de la tarea y la elimino
    // El método filter() crea un nuevo array con todos los elementos que cumplan la condición
    // Es un callback
    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)
        this.guardarLocalStorage();
    }

    // ¿Tarea completada o no?
    marcarCompletado(id) {

        // Evaluar TODO, buscar ID y cambiarlo a true
        for (const todo of this.todos) {

            // Recibiremos un string, por eso == no ===
            if (todo.id == id) {

                todo.completado = !todo.completado; // false a true
                this.guardarLocalStorage();
                break;
            }

        }


    }

    // Eliminar Tareas completadas
    // Se eliminan tareas igual a true
    // Devuelve las tareas no completadas
    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado)
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        // JSON.stringify() convierte un valor JS en una cadena de texto JSON
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        // Con el operador ternario
        // JSON.parse() analiza una cadena de texto como JSON
        // Sí existe en el localStorage
        this.todos = (localStorage.getItem('todo')) ?
            JSON.parse(localStorage.getItem('todo')) : [];

        // Método map() crea un nuevo array con los resultados de la llamada a la función indicada
        this.todos = this.todos.map(Todo.fromJson);
    }

}