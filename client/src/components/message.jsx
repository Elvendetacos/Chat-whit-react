function Message({ userName, userText, type }) {
  return (
    <>
      <div className="h-auto float-left w-auto flex items-center justify-left rounded-xl mb-1">
        {type === "file" ? (
          <div className="rounded-xl h-auto p-2 w-auto bg-slate-100">
          <p>{userName}: </p>
          <img src={userText} className="h-32"></img>
          </div>
        ) : (
          <p className="rounded-xl h-full p-2 w-auto bg-slate-100">
            {userName}: {userText}
          </p>
        )}
      </div>
    </>
  );
}

export default Message;
