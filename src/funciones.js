const fs = require('fs');
listaEstudiantes = [];
listaAspirantes = [];


const crear = (curso) => {
    listar();
    let curse = {
        id: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        valor: curso.valor,
        modalidad: curso.modalidad,
        intensidad: curso.intensidad,
        estado: curso.estado
    };
    let duplicado = listaEstudiantes.find(cur => cur.id == curse.id);
    if(!duplicado){
        listaEstudiantes.push(curse);
        console.log(listaEstudiantes);
        return guardar('./src/Cursos.json',listaEstudiantes);
    }else{
        //console.log('ya existe un usuario con ese id');
        return "Ya existe un curso con ese id";
    }
} 

const crearAspirante = (curso) => {
    listarAspirantes();
    let aspirante = {
        id: curso.id,
        nombre: curso.nombre,
        telefono: curso.telefono,
        correo: curso.correo
    };
    let duplicado = listaAspirantes.find(asp => asp.id == aspirante.id);
    if(!duplicado){
        listaAspirantes.push(aspirante);
        console.log(listaAspirantes);
        return guardar('./src/Aspirantes.json',listaAspirantes);
    }else{
        //console.log('ya existe un usuario con ese id');
        return "Ya existe un usuario con ese id";
    }
} 

const crearRelacion = (curso) => {
    i = listarRelacion();
    let relacion = {};
    if(i == 1){
         relacion = {
            id: i,
            idEstudiante: curso.id,
            idCurso: curso.idcurso
        };
    }else{
        i = listaid() + 1;
         relacion = {
        id: i,
        idEstudiante: curso.id,
        idCurso: curso.idcurso
        };
    }
    console.log('Hola3',relacion);
    let duplicado = listaRelacion.find(asp => (asp.idEstudiante == relacion.idEstudiante) && (asp.idCurso == relacion.idCurso));
    if(!duplicado){
        listaRelacion.push(relacion);
        console.log(listaRelacion);
        return guardar('./src/Relacion.json',listaRelacion);
    }else{
        //console.log('ya existe un usuario con ese id');
        return "Este usuario ya esta matriculado en ese curso";
    }
} 

const listar = () => {
    try{
        listaEstudiantes = require('./Cursos.json');
    }catch(error){
        listaEstudiantes = [];
    }
    //si el listado va a ser de modo asincronico:
    //listaEstudiantes = JSON.parse(fs.readFileSync('listado.json')); 
}

const listarAspirantes = () => {
    try{
        listaAspirantes = require('./Aspirantes.json');
    }catch(error){
        listaAspirantes = [];
    }
}

const listaid = () => {
    let i = 0;
    listaRelacion.forEach(element => {
      i += element.id;  
    });
    return i;
}

const listarRelacion = () => {
    try{
        listaRelacion = require('./Relacion.json');
        console.log('Hola1',listaRelacion)
    }catch(error){
        listaRelacion = [];
        console.log('Hola2',listaRelacion)
        return 1;
    }
}

const guardar = (json,lista) => {
    let datos = JSON.stringify(lista);
    fs.writeFile(json,datos,(err) =>{
        if(err) throw(err);
        return "archivo creado con exito";
    });
}
const CerrarCurso = (id) => {
    listar();
    let estudiante = listaEstudiantes.find(cedula => cedula.id == id);
    if(!estudiante){
        console.log('Curso no existe');
    }else{
        console.log(estudiante);
        estudiante['estado'] = "cerrado";
        guardar('./src/Cursos.json',listaEstudiantes);
    }
}

module.exports = {
    crear,
    crearAspirante,
    crearRelacion,
    CerrarCurso
}