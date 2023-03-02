function MyMessage({userName, userText}) {
  return (
    <>
      <div className="h-auto float-left w-auto flex items-center justify-end rounded-xl mb-1">
        <p className="rounded-xl h-full p-2 w-auto bg-slate-100">
          {userName}: {userText}
        </p>
      </div>
    </>
  );
}

export default MyMessage;
