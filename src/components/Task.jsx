import { useState } from "react";
import { useStore } from "../Store";
import { shallow } from "zustand/shallow";

const Task = ({ state }) => {
  const task = useStore(
    (store) => store.tasks.filter((task) => task.status === state),
    shallow
  );

  const deleteTask = useStore((store) => store.deleteTask);
  const moveTask = useStore((store) => store.moveTask);

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const draggedTask = useStore((store) => store.draggedTask);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className="w-1/3 p-5 bg-white shadow-md shadow-indigo-200/50 border border-indigo-500 rounded-xl text-gray-800 flex flex-col gap-5 justify-between min-h-[200px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        moveTask(draggedTask.name, state);
        setDraggedTask(null);
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl uppercase font-bold">{state}</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-100 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-black before:to-zinc-800 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        >
          New Task
        </button>
      </div>

      {task.map((task) => {
        return (
          <SingleTask
            task={task}
            setDraggedTask={setDraggedTask}
            deleteTask={deleteTask}
            state={state}
          />
        );
      })}

      {openModal && <Modal setOpenModal={setOpenModal} state={state} />}
    </div>
  );
};

const SingleTask = ({ task, setDraggedTask, deleteTask, state }) => {
  return (
    <div
      key={task.name}
      className="flex flex-col justify-between gap-5 p-5 rounded-xl bg-gradient-to-r from-[rgb(20_30_48)] to-[rgb(36_59_85)]  cursor-move"
      draggable
      onDragStart={() => setDraggedTask(task.name, task.status)}
    >
      <h1 className="text-white font-bold text-center tracking-wide text-xl">
        {task.name}
      </h1>

      <div className="flex items-center justify-between">
        <span className="text-white/80">Status</span>
        <span className="uppercase text-white/80 flex justify-center items-center gap-2">
          {" "}
          <span
            className={`w-3 aspect-square inline-block rounded-full ${
              state === "pending"
                ? "bg-orange-500"
                : state === "ongoing"
                ? "bg-white"
                : "bg-green-500"
            }`}
          ></span>
          {task.status}
        </span>
      </div>

      <button
        onClick={() => deleteTask(task.name, task.status)}
        className="bg-red-500 text-white p-2 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;

const Modal = ({ setOpenModal, state }) => {
  const addTask = useStore((store) => store.addTask);

  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTask(value, state);
    setOpenModal(false);
  }

  return (
    <div
      onClick={() => setOpenModal(false)}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm z-[9999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-md bg-white p-5 text-gray-800 min-w-[375px] flex flex-col gap-10 "
      >
        <h1 className="text-center">Add a New Task</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            required
            placeholder="enter name"
            className="bg-gray-100 focus:bg-white px-3 py-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="cursor-pointer self-center text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
