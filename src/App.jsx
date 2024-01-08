import Task from "./components/Task";

const App = () => {
	return (
		<div className='bg-gray-700 gap-2 text-white min-h-screen w-full flex justify-between items-start px-8 py-5'>
			<Task state='pending' />
			<Task state='ongoing' />
			<Task state='completed' />
		</div>
	);
};

export default App;
