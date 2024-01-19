import React, { useEffect, useState } from 'react';
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";
import Filter from "../components/Filter";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../components/Header';

const Home = () => {
	const [tasks, setTasks] = useState([]); //state for tasks data
	const [reload, setReload] = useState(false);  //state which triggers task reloading
	const [filter, setFilter] = useState('none'); // state for filter

	// trigger the reload to modify the data rendered on the page
	const getFreshTasks = () => {
		setReload(!reload);
	}

	// function to change the filter state
	const changeFilter = (e) => {
		setFilter(e.target.value);
	}


	const moveTask = (currentPosition, droppedItemPosition)=>{

		let newArray = tasks;
		for (let i=0; i<newArray.length;i++){
			let temp;

			if (i===currentPosition){
				temp = newArray[currentPosition]
				newArray[currentPosition] = newArray[droppedItemPosition]
				newArray[droppedItemPosition] = temp;
			}
		}

		setTasks(()=>{
			return [...newArray]
		});
	}


	// function to filter the tasks
	const filterBy = (key, tasksArray) => {
		if (key === 'complete') {
			return tasksArray.filter((val) => val.status === 'complete');
		} else if (key === 'incomplete') {
			return tasksArray.filter((val) => val.status === 'incomplete');
		} else {
			return tasksArray;
		}
	}

	// function to get all the tasks from localstorage
	const getTasks = () => {
		let tasks = localStorage.getItem('tasks');
		if (tasks) {
			let parsedData = JSON.parse(tasks);
			return filterBy(filter, parsedData);
		}
		return [];
	}


	// function to delete a task
	const deleteTask = (id) => {
		let tasks = JSON.parse(localStorage.getItem('tasks'));
		let filteredTasks = tasks.filter((task) => task.id !== id);
		localStorage.setItem('tasks', JSON.stringify(filteredTasks));
		getFreshTasks();
	}

	// function to change the task status a task
	const changeTaskStatus = (id) => {
		let tasks = JSON.parse(localStorage.getItem('tasks'));

		const newTasks = tasks.map((task) => {
			if (task.id === id) {
				if (task.status === 'complete') {
					return { ...task, status: 'incomplete' };
				}
				return { ...task, status: 'complete' };
			}
			return task;
		})
		localStorage.setItem('tasks', JSON.stringify(newTasks));
		getFreshTasks();
	}


	// get the fresh tasks after any changes
	useEffect(() => {
		setTasks(getTasks());
	}, [reload, filter]);

	return (
		<>
			<Header/>
			<CreateTask getFreshTasks={getFreshTasks} />
			<Filter changeFilter={changeFilter} />
			<DndProvider backend={HTML5Backend}>
				{tasks.length !==0 ? tasks.map((task, index) => {
					return <Task
						key={index}
						taskData={task}
						deleteTask={deleteTask}
						changeTaskStatus={changeTaskStatus}
						getFreshTasks={getFreshTasks}
						curPosition={index}
						moveTask={moveTask}
					/>
				}) : <p className='not-found'> No task found !!</p>}

			</DndProvider>
		</>
	)
}

export default Home