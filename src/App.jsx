import Task from "./components/Task";

const App = () => {
  return (
    <div className="bg-gray-50 gap-2 text-white min-h-screen px-8 py-5">
      <h1 className="w-full text-center text-3xl lg:text-5xl font-bold text-zinc-800 my-10">
        TODO's With Drag and Drop
      </h1>
      <div className="flex flex-wrap justify-center items-start gap-10">
        <Task state="pending" />
        <Task state="ongoing" />
        <Task state="completed" />
      </div>
    </div>
  );
};

export default App;
