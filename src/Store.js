import { create } from "zustand";

const store = (set) => {
	return {
		tasks: [
			{ name: "Task one", status: "pending" },
			{ name: "Task Two", status: "pending" },
			{ name: "Task Three", status: "completed" },
			{ name: "Task four", status: "completed" },
			{ name: "Task five", status: "ongoing" },
		],
		addTask: (name, status) => set((store) => ({ tasks: [...store.tasks, { name, status }] })),
		deleteTask: (name, status) => set((store) => ({ tasks: store.tasks.filter((task) => task.name !== name) })),

		draggedTask: null,
		setDraggedTask: (name, status) => set({ draggedTask: { name, status } }),

		moveTask: (name, status) => set((store) => ({ tasks: store.tasks.map((task) => (task.name === name ? { ...task, status } : task)) })),
	};
};

export const useStore = create(store);
