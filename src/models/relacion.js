const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const schema = mongoose.Schema;

const relacionSchema = new schema({
    cedula: {
        type: String 
    },
    cursoId: {
        type: String
    }
});

relacionSchema.plugin(uniqueValidator);

const estudiante = mongoose.model('Relacion',relacionSchema);

module.exports = estudiante;