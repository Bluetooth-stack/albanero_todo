import React, { useRef, useState } from 'react';
import './style.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '../EditModal';

function AddedTasks({ tasks, setTasks }) {

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTodoToEdit, setCurrentTodoToEdit] = useState({});

    const draggedTodo = useRef();
    const draggingOver = useRef();

    function handleDelete(taskToDelete) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            let filtered = tasks.filter((task) => (task.todo !== taskToDelete.todo));
            setTasks(filtered);
        }
        else {
            return
        }
    }

    function dragStart(e, indx) {
        draggedTodo.current = indx
    }
    
    function dragEnter(e, indx) {
        draggingOver.current = indx
    }

    function drop() {
        const copyTodo = [...tasks];
        const draggedTodoContent = copyTodo[draggedTodo.current];
        copyTodo.splice(draggedTodo.current, 1);
        copyTodo.splice(draggingOver.current, 0, draggedTodoContent);
        draggedTodo.current = null;
        draggingOver.current = null;
        setTasks(copyTodo)
    }

    return (
        <div className='task-container' style={{ alignItems: tasks.length ? 'flex-start' : 'center' }}>
            {
                tasks.length ?
                    tasks.map((task, indx) => (
                        <div className='task-div' key={task.todo + indx}
                            draggable
                            onDragStart={(e) => { dragStart(e, indx) }}
                            onDragEnter={(e) => { dragEnter(e, indx) }}
                            onDragEnd={drop}
                        >
                            <div>
                                <h3 className='todo-title'>{task?.todo}</h3>
                                <p className='date-added'>{task?.addedOn}</p>
                            </div>

                            <div>
                                <IconButton aria-label="delete" onClick={() => { handleDelete(task) }}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="delete"
                                    onClick={() => { setCurrentTodoToEdit(task); setShowEditModal(true) }}>

                                    <EditIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))
                    :
                    <p className='empty-text'>empty!</p>
            }
            {
                showEditModal &&
                <EditModal currentTodo={currentTodoToEdit} tasks={tasks} setTasks={setTasks} setShowModal={setShowEditModal} />
            }
        </div>
    )
}

export default AddedTasks