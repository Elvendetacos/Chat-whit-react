import { io } from "socket.io-client";

const socketio = io('http://localhost:3000')

export default socketio;