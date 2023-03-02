import express  from "express"
import { Server as Socket } from "socket.io"
import morgan from "morgan"
import http from "http" 
import cors from 'cors'

const user = [];
const exception = true;

const app = express()
const server = http.createServer(app)
const io = new Socket(server,{
    cors:{
        origin: '*'
    }
})

app.use(cors())
app.use(morgan("dev"))

io.on('connection', (socket)=>{
    console.log(socket.id)
    socket.on('send-data', (name) => {
        // const findUser = name
        // const filterArray = user.filter((obj) => obj.user === findUser)
        // console.log(filterArray)
        if(user.includes(name)){
            socket.emit('status', false)
        }else{
            socket.emit('status', true)
            user.push(name)
            console.log(user)
            io.emit('users', user);
        }
    }) 
    
    socket.on('message', (message)=>{
        console.log(message)
        socket.broadcast.emit('message', {
            text: message,
            user: socket.id
        })
    })

    socket.on('error', ()=> {
        console.log('Error')
    })

})

server.listen(3000)
console.log('Started')