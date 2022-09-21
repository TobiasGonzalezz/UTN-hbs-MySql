const express = require('express');
const app = express();
require('dotenv').config();
const conexion = require('./db/conexion')
const PORT = process.env.PORT || 8080;
const hbs = require('hbs')
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Configuramos los motores de plantillas
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
hbs.registerPartials(path.join(__dirname, 'views/partials'))

app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Hola Mundo'
    })
})

app.post('/enviar', (req, res) => {
    const { nombre, apellido } = req.body

    console.log(`${nombre} - ${apellido}`);

    let dato = {
        nombreActor: nombre,
        apellidoActor: apellido
    }
    let sql = 'INSERT INTO actores SET ? '
    let query = conexion.query(sql, dato, (err, result) => {
        if (err) throw err;
        res.send(`Sus datos "${nombre} - ${apellido}" han sido registrado`)
    })

});

app.get('/actores', (req, res) => {
    let sql = 'SELECT * FROM actores'
    let query = conexion.query(sql, (err, result) => {
        if (err) throw err;
        res.render('actores', {
            titulo: 'Nomina de Actores:'
        })
    })
})

app.put('/actualizar', (req, res) => {
    let sql = "UPDATE ACTORES SET nombreActor='" +
        req.body.nombre +
        "', apellidoActor='" +
        req.body.apellido +
        "' WHERE id_Actor=" +
        req.body.id

    let query = conexion.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`Sus datos han cambiado con exito`)
    })
});

app.delete('/delete', (req, res) => {
    let sql = "DELETE FROM actores WHERE id_Actor=" +
        req.body.id_Actor + ''

    let query = conexion.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`Sus datos han sido eliminados con exito`)
    })
});

app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en el ${PORT}`)
})

