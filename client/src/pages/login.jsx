import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import socketio from "../connection/connection";
import Context from "../Context/context";


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const {setUserName} = useContext(Context)
  // const socket = useContext(Context)

  const handleSubmit = (e) =>{
      e.preventDefault();
      //console.log(message)
      //console.log("hooa, como estas")
      socketio.emit('send-data', user)
      setUserName(user)
      
      socketio.on('status', (error)=>{
        if(error === false){
          alert("usuario registrado")
        }else{
          navigate("/chat")
        }
      })

  }
  
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full skew-y-[3deg] bg-[#81638b] h-96 grid grid-rows-2 animate-wiggle">
          <div className="flex justify-center items-center">
            <p className="text-9xl font-Squada text-white text-center animate-text">
              Bienvenido al chat
            </p>
          </div>
          <div className="grid grid-cols-9 grid-rows-3">
            <form onSubmit={handleSubmit} className="row-start-2 col-start-4 col-end-7">
              <input
                type="text"
                placeholder="Ingresa un nombre"
                className="text-center outline-none text-white font-bold rounded-l-xl bg-[#503459] border-none w-2/3 h-full"
                onChange={ e => setUser(e.target.value)}
              />
              <button className="bg-[#503459] border-none rounded-r-xl font-bold outline-none animate-text w-1/3 h-full" type="submit">
                Continuar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
