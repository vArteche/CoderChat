import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io'; //SERVER PROPIO DE WS
import path from 'path';

import __dirname from '../utils.js';
import viewsRouter from './routes/views.router.js';

const app = express();
//INICIO DEL MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine());

//RUTA DE LAS VISTAS
app.set('views', path.join(__dirname, "src", "views"));

//MOTOR DE RENDERIZADO
app.set('view engine', 'handlebars');

//SERVIDOR ESTATICO DE ARCHIVOS
app.use(express.static(path.join(__dirname,'/public')));

app.use('/', viewsRouter);

//INICIO SERVER Y GUARDO EN VARIABLE
const httpServer = app.listen(8080, ()=>{
    console.log('Listening on port 8080');
});

//INICIO SOCKET
const io = new Server(httpServer); 

let messages = [];


io.on("connection", socket =>{
    console.log("Nuevo cliente conectado: ", socket.id);

    socket.on("message", data =>{
        messages.push(data);
        io.emit('messagesLogs', messages)
        console.log(data.message);
    })
})