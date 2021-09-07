//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //cuando agregas un curso presionando 'agregar carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () =>{
        // console.log('vaciando carrito');
        articulosCarrito = []; //resetea el arreglo
        limpiarHTML();// eliminamos todo el HTML
    })
}

//funciones
function agregarCurso(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);

    }
}
//elimina un curso del carrito
function eliminarCurso(e){
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');
        // elimina del arreglo de articulos carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        console.log(articulosCarrito);
        
        carritoHTML(); //iterar sobre elcarrito y mostrar su html
    }
}

//lee el contenido del html alq ledimos click y extrae lainformacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //crea un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

if(existe){
    //si existe actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //este retorna el objeto actualizado
        }else{
            return curso;// este retorna los objetos q no son duplicados
        }
    });
    articulosCarrito = [...cursos];
}else{
    //caso contrario agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
}


    // console.log(infoCurso);

    //agrega elementos al arreglo decarrito
    
    console.log(articulosCarrito);
    carritoHTML();
}

//muestra el carrito de compras  en el html
function carritoHTML() {

    //limpiar el html

    limpiarHTML();

    //recorre elcarrito y genera el html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio,cantidad , id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>
            <td>${titulo} </td>
            <td>${precio} </td>
            <td>${cantidad} </td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>

        `;
        //agrega el html delcarrito en el tbody
        contenedorCarrito.appendChild(row);

    })
}

//elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}