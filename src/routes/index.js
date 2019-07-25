const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const Usuario = require('../models/usuario');
const Relacion = require('../models/relacion');
const Curso = require('./../models/curso');
const bcrypt = require('bcrypt');
var session = require('express-session')

const dirViews = path.join(__dirname, '../../templates/views');
const dirPartials = path.join(__dirname, '../../templates/partials');
require('./../helpers/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

//middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//Views
app.get('/', (req, res) => {
    Curso.find({}).exec((err, result) => {
        if (err) {
            return console.log(err);
        }
        res.render('interesado', {
            listado: result
        });
    });
    Relacion.find({ cedula: 123, cursoId: 9 }, (err, resultados) => {
        if (err) {
            return console.log(err)
        }
        if (!resultados) {
            console.log(resultados);
        }
    });
});


app.get('/aspirante', (req, res) => {
    Usuario.findById(req.session.usuario, (err, usuario) => {
        //Estudiante.findById(req.usuario, (err, usuario) =>{
        if (err) {
            return console.log(err)
        }
        if (!usuario) {
            return res.redirect('/')
        }
        Curso.find({}).exec((err, result) => {
            if (err) {
                return console.log(err);
            }
            Usuario.findById(req.session.usuario, (err, usuario) => {
                if (err) {
                    return console.log(err)
                }
                res.render('aspirante', {
                    id: usuario.cedula,
                    listado: result
                });
            });
        })
    })
});

app.post('/aspirante', (req, res) => {

    Curso.find({}).exec((err, resultado) => {
        if (err) {
            return console.log(err);
        }
        let relacion = new Relacion({
            cedula: req.body.id,
            cursoId: req.body.idcurso
        })
        Relacion.findOne({ cedula: relacion.cedula, cursoId: relacion.cursoId }, (err, resultados) => {
            if (err) {
                return console.log(err)
            }
            let txt = '';
            if (!resultados) {
                txt = 'Matriculado con exito'
                relacion.save((err, result) => {
                    if (err) {
                        return console.log(err)
                    }
                    return res.render('aspirante', {
                        id: relacion.cedula,
                        mostrar: 'Matriculado con exito',
                        listado: resultado
                    })
                });
            }
            if (txt == '') {
                txt = 'Usted ya se encuentra matriculado en ese curso'
            }
            return res.render('aspirante', {
                sesion: true,
                nombre: req.session.nombre,
                id: relacion.cedula,
                mostrar: txt,
                listado: resultado
            })
        });
    });
});

app.get('/formulario', (req, res) => {
    res.render('formulario')
});

app.post('/formulario', (req, res) => {
    let usuario = new Usuario({
        nombre: req.body.nombre,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10),
        cedula: parseInt(req.body.id),
        correo: req.body.correo,
        telefono: parseInt(req.body.telefono),
        tipo: req.body.tipo
    })
    usuario.save((err, result) => {
        if (err) {
            return res.render('formulario', {
                mostrar: err
            })
        }
        res.render('formulario', {
            mostrar: result.nombre + ' Guardado con exito.',
        })
    });
});

app.get('/Coordinador/NuevoCurso', (req, res) => {
    Usuario.findById(req.session.usuario, (err, usuario) => {
        //Estudiante.findById(req.usuario, (err, usuario) =>{
        if (err) {
            return console.log(err)
        }
        if (!usuario) {
            return res.redirect('/')
        }
        res.render('Coordinador/NuevoCurso');
    });
});

app.post('/Coordinador/NuevoCurso', (req, res) => {
    let curso = new Curso({
        nombre: req.body.nombre,
        id: parseInt(req.body.id),
        descripcion: req.body.descripcion,
        valor: parseFloat(req.body.valor),
        modalidad: req.body.modalidad,
        intensidad: parseInt(req.body.intensidad),
        estado: req.body.estado
    })
    curso.save((err, result) => {
        if (err) {
            return res.render('Coordinador/NuevoCurso', {
                mostrar: err
            })
        }
        res.render('Coordinador/NuevoCurso', {
            mostrar: 'Curso de ' + result.nombre + ' Guardado con exito'
        })
    });
});

app.get('/Coordinador/VerCursos', (req, res) => {
    // async function main(){
    // const usuario = await Usuario.findById(req.session.usuario);
    // //Estudiante.findById(req.usuario, (err, usuario) =>{
    // if (!usuario) {
    //     return res.redirect('/')
    // } else {
         let txt = '';
    //     const result = await Relacion.find({}).exec();
    //     console.log(result)
    //     result.forEach(element => {
    //         const resultados = await Curso.findOne({ id: element.cursoId });
    //         txt += `<form action="/eliminar" method="post">
    //             <div class="card" style="width: 18rem"> 
    //             <div class="card-body">
    //             <h5 class="card-title">${resultados.nombre}</h5>`;
    //         const res = await Usuario.findOne({ cedula: element.cedula });
    //         txt += `<input type="text" value="${element._id}" name="id" hidden>
    //                       <input type="submit" value="Eliminar" class="btn btn-danger">
    //                   <p class="card-text">${res.nombre}</p>
    //                   </div>
    //                   </div></form>`
    //     })
        return res.render('Coordinador/VerCursos', {
            text: txt
        })
//     }
// }
})

app.get('/Coordinador/CerrarCursos', (req, res) => {
    Usuario.findById(req.session.usuario, (err, usuario) => {
        //Estudiante.findById(req.usuario, (err, usuario) =>{
        if (err) {
            return console.log(err)
        }
        if (!usuario) {
            return res.redirect('/')
        }
        Curso.find({}).exec((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.render('Coordinador/CerrarCursos', {
                result: result,
                listado: result
            });
        })
    });
});

app.post('/Coordinador/CerrarCursos', (req, res) => {
    Curso.findOneAndUpdate({ id: req.body.idcurso }, { estado: 'cerrado' }, { new: true, runValidators: true, context: 'query' }, (err, resultados) => {
        if (err) {
            return console.log(err)
        }
        Curso.find({}).exec((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.render('Coordinador/CerrarCursos', {
                result: result,
                listado: result
            });
        })
    })
});

app.post('/ingresar', (req, res) => {
    Usuario.findOne({ cedula: req.body.cedula }, (err, resultados) => {
        if (err) {
            return console.log(err)
        }
        if (!resultados) {
            return res.render('ingresar', {
                mensaje: "Usuario no encontrado"
            })
        }
        if (!bcrypt.compareSync(req.body.contrasena, resultados.contrasena)) {
            return res.render('ingresar', {
                mensaje: "Contraseña no es correcta"
            })
        }
        if (resultados.tipo == 'aspirante') {
            req.session.coordinador = false
            req.session.aspirante = true
        } else if (resultados.tipo == 'coordinador') {
            req.session.coordinador = true
            req.session.aspirante = false
        }
        //Para crear las variables de sesión
        req.session.usuario = resultados._id
        req.session.nombre = resultados.nombre
        // let token = jwt.sign({
        //          	usuario: resultados
        //      	}, 'virtual-tdea', { expiresIn: '12h' });
        // console.log(token)

        // localStorage.setItem('token', token);
        if (resultados.tipo == 'aspirante') {
            return res.render('ingresar', {
                mensaje: 'Bienvenido ' + resultados.nombre,
                sesion: true,
                aspirante: true,
                nombre: resultados.nombre
            })
        } else if (resultados.tipo == 'coordinador') {
            return res.render('ingresar', {
                mensaje: 'Bienvenido ' + resultados.nombre,
                sesion: true,
                coordinador: true,
                nombre: resultados.nombre
            })
        }

    })
})

app.get('/salir', (req, res) => {
    req.session.destroy((err) => {
        if (err) return console.log(err)
    })
    // localStorage.setItem('token', '');
    res.redirect('/')
})

app.get('*', (req, res) => {
    res.render('error');
})

module.exports = app;
