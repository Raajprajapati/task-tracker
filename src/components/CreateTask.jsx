import React, { useState } from 'react';
import '../css/CreateTask.css';

const CreateTask = ({getFreshTasks}) => {
    const [taskTitle, setTaskTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            id: new Date(),
            task: taskTitle,
            time: new Date().toLocaleString(),
            status: 'incomplete'
        }
        let allTasks = localStorage.getItem('tasks');
        if (allTasks) {
            allTasks = JSON.parse(allTasks);
            allTasks.unshift(data)
            localStorage.setItem('tasks', JSON.stringify(allTasks));
        }
        else {
            localStorage.setItem('tasks', JSON.stringify([data]));
        }
        setTaskTitle('');
        getFreshTasks();
    }

    return (
        <div className='create-tasks'>
            <h2>Create a Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="task"
                    id="task-title"
                    value={taskTitle}
                    placeholder='Enter the task details'
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                    autoComplete='off'
                />
                <input
                    type="submit"
                    value="Add to tasks" />
            </form>
        </div>
    )
}

export default CreateTask;