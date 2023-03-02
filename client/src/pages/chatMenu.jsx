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
  const [find, setFind] = useState()
  const {userName} = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    socketio.emit("message", messageSend);
    const newMessage = {
      user: "Me",
      text: messageSend,
    };
    setReciveMessages([...reciveMessage, newMessage]);
    setMessageSend("");
};


useEffect(() => {
  console.log(userName)
    const viewUser = (user) => {
      let indice = user.indexOf(userName)
      if(indice !== -1) {
        user.splice(indice, 1)
        setList(user);
        console.log(user);
        console.log(socketio.id);
      }else{
        console.log(unu);
      }
    };
    socketio.on("users", viewUser);

    const messageControl = (messages) => {
      console.log(messages);
      setReciveMessages([...reciveMessage, messages])
    };

    socketio.on("message", messageControl);

    return () => {
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
              className="cursor-pointer text-white font-bold text-xl"
            >
              General
            </label>
            <input type="radio" name="person" id="person" className="hidden" />
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
                  type="radio"
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
            {/* {reciveMessage.map((reciveMessage, index) => (
                  <MyMessage
                    key={index}
                    userName={reciveMessage.user}
                    userText={reciveMessage.text}
                  />
                ))} */}
              {reciveMessage.map((reciveMessage, index) => (
                  <Message
                    key={index}
                    userName={reciveMessage.user}
                    userText={reciveMessage.text}
                  />
                ))}
          </div>
          {/* inputs */}
          <div className="col-start-1 col-end-13 row-start-11 row-end-13 bg-[#81638b]  border-t-2 border-black flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-10/12 h-1/2">
              <input
                type="text"
                className="h-full w-3/4 rounded-l-xl bg-[#dac9df] text-l border-2 border-black outline-none"
                value={messageSend}
                placeholder="Escribe un mensaje..."
                onChange={(e) => setMessageSend(e.target.value)}
              />
              <button className="h-full w-1/4 rounded-r-xl bg-[#dac9df] text-l border-2 border-black ">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default chatMenu;
