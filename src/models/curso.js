const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const schema = mongoose.Schema;

const estudianteSchema = new schema({
    nombre:{
        type: String,
        require: true,
        //eliminar los espacios
        trim: true,
        //seleccionar los unicos valores que se pueden ingresar
        //enum: {values: ['pedro','maria']}
    },
    id:{
        type: Number,
        required: true,
        index: true
    },
    valor:{
        type: Number,
        default: 0,
        min: [0,'ingrese un valor mayor a cero']
    },
    modalidad:{
        type: String,
        enum: {values: ['virtual','presencial']}
    },
    intensidad:{
        type: Number,
        default: 0,
        min: [0,'ingrese un valor mayor a cero']
    },
    estado: {
        type: String ,
        default: 'disponible',
        enum: {values: ['disponible','cerrado']}
    },
    descripcion: {
        type: String,
        default: ''
    }
});

estudianteSchema.plugin(uniqueValidator);

const estudiante = mongoose.model('Curso',estudianteSchema);

module.exports = estudiante;