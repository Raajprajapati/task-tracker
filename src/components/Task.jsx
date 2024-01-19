import React, { useState } from 'react';
import '../css/Task.css';
import { useDrag, useDrop } from 'react-dnd';

const Task = ({ taskData, deleteTask, changeTaskStatus, getFreshTasks, curPosition, moveTask }) => {
    const { id, task, time, status } = taskData;
    const [editable, setEditable] = useState(false);
    const [editedTaskValue, setEditedTaskValue] = useState('');

    const [{ }, drag] = useDrag(() => ({
        type: 'task',
        item: { droppedItemPosition: curPosition }
    }))


    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => moveTask(curPosition, item.droppedItemPosition),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [curPosition])


    // function to update the task after editing
    const updateTask = () => {
        let data = {
            id: id,
            task: editedTaskValue,
            time: new Date().toLocaleString(),
            status: 'incomplete'
        }
        let allTasks = localStorage.getItem('tasks');
        allTasks = JSON.parse(allTasks);
        allTasks = allTasks.filter((val) => val.id !== id);
        allTasks.push(data)
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        cancelEdit();
        getFreshTasks();
    }


    // function to cancel the editing of a task
    const cancelEdit = () => {
        setEditable(false);
        setEditedTaskValue(task);
    }
    const startEdit = () => {
        setEditable(true);
        setEditedTaskValue('');
    }

    return (
        <>
            <div ref={drop} >
                <div className='task' ref={drag} style={{ border: isOver ? '2px solid blue' : '2px solid white' }}>
                    {editable ? <input
                        type='text'
                        value={editedTaskValue}
                        onChange={(e) => setEditedTaskValue(e.target.value)}
                        required /> :
                        <div className="title">
                            {task}
                        </div>
                    }
                    <div className="details">
                        <p>Created At: <span className='task-time'>{time}</span></p>
                        <p>{status === 'complete' ?
                            <span className='task-status complete'>
                                {status} &nbsp;
                                <i className="fa-solid fa-file-circle-check" />
                            </span> :
                            <span className='task-status incomplete'>
                                {status} &nbsp;
                                <i className="fa-solid fa-file-circle-xmark" />
                            </span>
                        }
                        </p>
                    </div>
                    <div className="actionbtns-id">
                        <div className="btns">
                            {editable ?
                                <>
                                    <button className='action-btn edit' onClick={updateTask}>Update</button>
                                    <button className='action-btn delete' onClick={cancelEdit}>Cancel</button>
                                </> :
                                <>
                                    <button className='action-btn edit' onClick={startEdit}>Edit</button>
                                    <button className='action-btn delete' onClick={() => deleteTask(id)}>Delete</button>
                                </>
                            }
                            <button className='action-btn status' onClick={() => changeTaskStatus(id)}>Mark as {status === 'complete' ? 'Incomplete' : 'Complete'}</button>
                        </div>
                        <p className='task-id'>{id}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task;