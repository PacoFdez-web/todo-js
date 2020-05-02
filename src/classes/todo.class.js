// EXPORT ya que vamos a usar la clase desde fuera
export class Todo {

    // Los métodos no se almacenan en el LocalStorage con JSON.stringify
    // Las propiedades si
    // Para ello creamos un método estático. No es una instancia del Todo 
    static fromJson({ id, tarea, completado, creado }) {

        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        // Recuperamos los métodos
        return tempTodo;
    }

    // Recibo la descripción de la tarea que hacer
    constructor(tarea) {

        this.tarea = tarea;

        // Identificador de la tarea con la fecha
        // Método getTime() devuelve el valor numérico de la hora 
        this.id = new Date().getTime(); // ejemplo: 12836871263
        // ¿Tarea completada?
        this.completado = false;
        // Fecha de la creación de la tarea
        this.creado = new Date();

    }

    imprimirClase() {
        console.log(`${ this.tarea } - ${ this.id }`);
    }

}