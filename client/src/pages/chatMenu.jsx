import { useContext, useEffect, useState } from "react";
import socketio from "../connection/connection";
import MyMessage from "../components/myMessage";
import Message from "../components/message";
import Context from "../Context/context";

function chatMenu() {
  const [list, setList] = useState();
  const [messageSend, setMessageSend] = useState("");
  const [reciveMessage, setReciveMessages] = useState([]);
  const [myMessage, setMyMessage] = useState([]);
  const [find, setFind] = useState();
  const [file, setFile] = useState("");
  const { userName } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hola = messageSend.charAt(0)==="@"
    if(hola){
      let zero = messageSend.indexOf(' ', 0);
      let destiny;
      let message;
      if (zero == -1) {
          destiny = messageSend.substring(1);
      } else {
          destiny = messageSend.substring(1, zero);
          message = messageSend.split('#')
      }
      console.log(destiny)
      console.log(message[1])
      setMessageSend("")
      socketio.emit('private', {userDestiny: destiny, mensaje: message[1]})
      const newMessage = {
        user: ' [P/] '+"Me",
        text: message[1],
        type: "message"
      };
      setReciveMessages([...reciveMessage, newMessage]);
      setMessageSend("");
    }else if(file !== ""){
      console.log(file);
      socketio.emit("files", file)
      const newMessage = {
        user:"Me",
        text: file,
        type: "file"
      }
      setReciveMessages([...reciveMessage, newMessage]);
      setFile("");
    }else{
      console.log(hola)
      socketio.emit("message", messageSend);

      const newMessage = {
        user: "Me",
        text: messageSend,
        type: "message"
      };
      setReciveMessages([...reciveMessage, newMessage]);
      setMessageSend("");
      
    }
    // convert imaage in base64
  };

  const handleFileUpload = (e) =>{
    let files = e.target.files;
    Array.from(files).forEach(file =>{
      var reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        console.log(reader.result)
        setFile(reader.result)
      }
    })
  }

  useEffect(() => {
    console.log(userName);
    const viewUser = (user) => {
      let indice = user.indexOf(userName);
      if (indice !== -1) {
        const updateUser = [...user];
        updateUser.splice(indice, 1);
        setList(updateUser);
        console.log(updateUser);
        console.log(socketio.id);
      } else {
        console.log(unu);
      }
    };
    socketio.on("users", viewUser);

    const messageControl = (messages) => {
      console.log(messages);
      setReciveMessages([...reciveMessage, messages]);
    };

    socketio.on("message", messageControl);

    const privateMessage = (privateMessage) => {
      console.log(privateMessage);
      setReciveMessages([...reciveMessage, privateMessage]);
    }
    socketio.on("privateMessage", privateMessage);

    const fileManager = (fileManager) =>{
      console.log(fileManager);
      setReciveMessages([...reciveMessage, fileManager]);
    }

    socketio.on('files', fileManager)

    return () => {
      socketio.off("privateMessage", privateMessage);
      socketio.off("users", viewUser);
      socketio.off("message", messageControl);
    };
  }, [reciveMessage]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" w-10/12 h-5/6 bg-[#b695c0] border-2 border-black rounded-lg flex overflow-hidden">
        <div className="w-1/4 h-full border-r-2 border-r-black overflow-auto">
          <div className="bg-[#81638b] h-14 text-center flex items-center justify-center border-b-2 border-black">
            <label
              htmlFor="person"
              className="cursor-pointer text-white font-bold text-xl hover:text-black"
            >
              General
            </label>
            <input type="button" name="person" id="person" className="hidden" />
          </div>
          {list &&
            list.map((listas, index) => (
              <div
                key={index}
                className="bg-[#81638b] h-14 text-center flex items-center justify-center border-b-2  border-black"
              >
                <label
                  htmlFor={listas}
                  className=" cursor-pointer text-white font-bold text-xl hover:text-black"
                >
                  {listas}
                </label>
                <input
                  type="button"
                  name="person"
                  id={listas}
                  className="hidden"
                />
              </div>
            ))}
          {/* props de la lista de los usuarios */}
        </div>
        {/* mensajes */}
        <div className="w-3/4 h-full appearance-none grid grid-cols-12 grid-rows-12">
          {/* zona de mensajes */}
          <div className="col-start-1 overflow-auto col-end-13 row-start-1 row-end-11 ml-5 mr-5 mt-5 flex flex-col p-4">
            {reciveMessage.map((reciveMessage, index) => (
              <Message
                key={index}
                userName={reciveMessage.user}
                userText={reciveMessage.text}
                type={reciveMessage.type}
              />
            ))}
          </div>
          {/* inputs */}
          <div className="col-start-1 col-end-13 row-start-11 row-end-13 bg-[#81638b]  border-t-2 border-black flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-10/12 h-1/2">
              <div className="flex h-full w-full">
              <input
                type="text"
                className="h-full w-4/6 rounded-l-xl bg-[#dac9df] text-l border-2 border-black outline-none"
                value={messageSend}
                placeholder="Escribe un mensaje..."
                onChange={(e) => setMessageSend(e.target.value)}
              />
              {/* Imagenes recibidas */}
              <div className="h-full w-1/6 text-center flex justify-center items-center bg-[#dac9df] border-2 border-black">
                <label className="cursor-pointer" htmlFor="image">Imagen</label>
              </div>
              <input type="file" id="image" className="hidden" accept=".jpg, .png" onChange={handleFileUpload}/>
              <button className="h-full w-1/6 rounded-r-xl bg-[#dac9df] text-l border-2 border-black">
                Enviar
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default chatMenu;
