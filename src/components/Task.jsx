import { useState } from "react";
import { useStore } from "../Store";
import { shallow } from "zustand/shallow";

const Task = ({ state }) => {
	const task = useStore((store) => store.tasks.filter((task) => task.status === state), shallow);

	const deleteTask = useStore((store) => store.deleteTask);
	const moveTask = useStore((store) => store.moveTask);

	const setDraggedTask = useStore((store) => store.setDraggedTask);

	const draggedTask = useStore((store) => store.draggedTask);

	const [openModal, setOpenModal] = useState(false);

	return (
		<div
			className='w-1/3 p-2 bg-gray-200 text-gray-800 flex flex-col gap-5 justify-between min-h-[200px]'
			onDragOver={(e) => e.preventDefault()}
			onDrop={() => {
				moveTask(draggedTask.name, state);
				setDraggedTask(null);
			}}>
			<div className='flex justify-between items-center'>
				<h1 className='text-lg uppercase font-bold'>{state}</h1>

				<button onClick={() => setOpenModal(true)} className='bg-gray-700 hover:bg-gray-800 text-white font-mono p-2 rounded-md'>
					Add
				</button>
			</div>

			{task.map((task) => {
				return (
					<div
						key={task.name}
						className='flex flex-col justify-between gap-5 bg-gray-600 text-white p-5 rounded-md cursor-move'
						draggable
						onDragStart={() => setDraggedTask(task.name, task.status)}>
						<h1>{task.name}</h1>
						<span
							className={`p-2 text-end rounded-md ${
								task.status === "pending" ? "bg-orange-500" : task.status === "completed" ? "bg-green-500" : "bg-gray-900"
							} `}>
							{task.status}
						</span>

						<div>
							<button onClick={() => deleteTask(task.name, task.status)} className='bg-red-500 text-white p-2 rounded-md'>
								Delete
							</button>
						</div>
					</div>
				);
			})}

			{openModal && <Modal setOpenModal={setOpenModal} state={state} />}
		</div>
	);
};

export default Task;

const Modal = ({ setOpenModal, state }) => {
	const addTask = useStore((store) => store.addTask);

	const [value, setValue] = useState("");

	return (
		<div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm'>
			<div className='rounded-md bg-white p-5 text-gray-800 min-w-[375px] flex flex-col gap-10 '>
				<h1 className='text-center'>Add a New Task</h1>

				<div className='flex flex-col gap-2'>
					<input
						type='text'
						placeholder='enter name'
						className='bg-gray-100 focus:bg-white px-3 py-2'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<button
						onClick={() => {
							addTask(value, state);
							setOpenModal(false);
						}}
						className='bg-indigo-500 px-5 py-2 text-white'>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};
