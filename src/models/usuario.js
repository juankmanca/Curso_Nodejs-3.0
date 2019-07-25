const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const schema = mongoose.Schema;

const estudianteSchema = new schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
        //seleccionar los unicos valores que se pueden ingresar
        //enum: {values: ['pedro','maria']}
    },
    contrasena:{
        type: String,
        required: true,
    },
    cedula:{
        type: Number,
        required: true,
        unique: [true,'Esta cedula ya esta registrada']
    },
    correo:{
        type: String,
        required: true,
    },
    telefono:{
        type: Number,
        required: true
    },
    tipo:{
        type: String,
        default: 'aspirante',
        enum: {values: ['aspirante','coordinador']}
    }
});

estudianteSchema.plugin(uniqueValidator);

const estudiante = mongoose.model('Usuario',estudianteSchema);

module.exports = estudiante;