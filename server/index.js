import express  from "express"
import { Server as Socket } from "socket.io"
import morgan from "morgan"
import http from "http" 
import cors from 'cors'

const user = [];
const newUser = [];
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
            newUser.push({
                userName: name,
                user: socket.id
            })
            console.log(user)
            io.emit('users', user);
        }
    })
    
    socket.on('message', (message)=>{
        console.log(message)
        let index = -1;
        newUser.forEach((obj, i) => {
          if (obj.user === socket.id) {
            index = i;
          }
        });
        socket.broadcast.emit('message', {
            text: message,
            user: newUser[index].userName,
            type:'message'
        })
    })

    socket.on('private', (data)=>{
        newUser.forEach((element)=>{
            let userFinal = element.user;
            if(element.userName === data.userDestiny){
                io.to(userFinal).emit('privateMessage', {
                    text: data.mensaje,
                    user: ' [P/] '+data.userDestiny,
                    type: 'message'
                })
            }
        })
    })

    socket.on('files', (file) => {
        let index = -1;
        newUser.forEach((obj, i) => {
          if (obj.user === socket.id) {
            index = i;
          }
        });
        socket.broadcast.emit('files', {
            text: file,
            user: newUser[index].userName,
            type: 'file'
        })
    })

    socket.on('error', ()=> {
        console.log('Error')
    })

})

server.listen(3000)
console.log('Started')