const hbs = require('hbs');
const funciones = require('../funciones');
const Usuario = require('../models/usuario');
const Curso = require('./../models/curso');

hbs.registerHelper('Matricular', (nombre, id, correo, telefono, idcurso) => {
  const aspirante = {
    nombre,
    id,
    correo,
    telefono
  }
  const relacion = {
    id,
    idcurso
  }

  let txt = funciones.crearRelacion(relacion);
  console.log(txt);
  if (txt == undefined) {
    funciones.crearAspirante(aspirante);
    return "Archvio creado con exito";
  } else {
    return txt;
  }
});


hbs.registerHelper('listarCursos', (result) => {
  let texto = "<br><table class='table'>\
    <thead class='thead-dark'>\
        <th>id</th>\
        <th>Nombre</th>\
        <th>Descripcion</th>\
        <th>Valor</th>\
        <th>Modalidad</th>\
        <th>Intensidad</th>\
        <th>Estado</th>\
    </thead>\
    <tbody>";

  result.forEach(estudiante => {
    texto += '<tr>'
      + '<td>' + estudiante.id + '</td>'
      + '<td>' + estudiante.nombre + '</td>'
      + '<td>' + estudiante.descripcion + '</td>'
      + '<td>' + estudiante.valor + '</td>'
      + '<td>' + estudiante.modalidad + '</td>'
      + '<td>' + estudiante.intensidad + '</td>'
      + '<td>' + estudiante.estado + '</td>'
      + '</tr>';
  });
  texto += '</tbody></table>';
  return texto;
});

hbs.registerHelper('listarCursosDisponiblesAcordeon', (result) => {
  let texto = "<div class='accordion' id='accordionExample'>";
  i = 1;
  result.forEach(estudiante => {
    if (estudiante.estado == "disponible") {
      texto += `<div class="card">
        <div class="card-header" id="heading${i}">
        <h2 class="mb-0">
           <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
             <h4> Nombre: </h4> <h5>  ${estudiante.nombre} </h5> 
             <h4> Descripcion: </h4> <h5>  ${estudiante.descripcion}</h5>
             <h4> Valor: </h4> <h5> ${estudiante.valor}</h5>
           </button>
         </h2>
       </div>
   
       <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
         <div class="card-body">
            <h4> modalidad:</h4> <h5> ${estudiante.modalidad} </h5> <br>
            <h4> descripcion:</h4> <h5> ${estudiante.descripcion} </h5> <br>
            <h4> intensidad horaria:</h4> <h5> ${estudiante.intensidad}h </h5> <br>
         </div>
       </div>
     </div>`
      i = i + 1;
    }
  });
  texto += '</div>';
  return texto;
});

hbs.registerHelper('listarCursosDisponiblesSelect', (result) => {

  let texto = '<select name="idcurso" class="form-control">';

  result.forEach(estudiante => {
    if (estudiante.estado == "disponible") {
      texto += '<option value="' + estudiante.id + '">' + estudiante.nombre + '</option>';
    }
  });
  texto += '</select>';
  return texto;
});

hbs.registerHelper('Cerrar', (idcurso) => {
  Curso.findOneAndUpdate({ id: idcurso }, { new: true }, (err, usuario) => {
    if (err) {
      return console.log(err)
    }
    console.log(usuario);
  });
})

hbs.registerHelper('VerAlumnos', (cursos,estudiantes) => {
	let texto = `	<div class="card" style="width: 18rem;">
	<div class="card-body">
	  <h5 class="card-title">Card title</h5>
	  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
	</div>
  </div>`;
		listado.forEach(estudiante =>{
			texto = texto + 
					`<tr>
					<td> ${estudiante.nombre} </td>
					<td> ${estudiante.matematicas} </td>
					<td> ${estudiante.ingles}</td>
					<td> ${estudiante.programacion} </td>
					<td><button class="btn btn-danger" name="nombre" value="${estudiante.nombre}">Eliminar</button></td>
					
					</tr> `;
		})
		texto = texto + '</tbody> </table></form>';	
		return texto;
	
	});