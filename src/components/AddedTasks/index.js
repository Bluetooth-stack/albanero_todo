import React, { useRef, useState } from 'react';
import './style.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '../EditModal';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { styled } from '@mui/material/styles';

function AddedTasks({ tasks, setTasks }) {

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTodoToEdit, setCurrentTodoToEdit] = useState({});

    const draggedTodo = useRef();
    const draggingOver = useRef();

    function handleDelete(taskToDelete) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            let filtered = tasks.filter((task) => (task.todo !== taskToDelete.todo));
            let newFilteredTodo = filtered.map((todo, indx) => {
                return { ...todo, slNo: indx + 1 }
            })
            setTasks(newFilteredTodo);
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
        const settedSlNoTodo = copyTodo.map((todo, indx) => {
            return { ...todo, slNo: indx + 1 }
        })
        setTasks(settedSlNoTodo)
    }

    function handleColorChange(e, currentTodo) {
        setTasks(
            tasks.map((task) => {
                if (task.todo === currentTodo.todo) {
                    return { ...task, color: e.target.value }
                }
                return task
            })
        )
    }


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className='task-container'>
            {
                tasks.length ?
                    tasks.map((task, indx) => (
                        <div className='task-div' key={task.todo + indx}
                            draggable
                            onDragStart={(e) => { dragStart(e, indx) }}
                            onDragEnter={(e) => { dragEnter(e, indx) }}
                            onDragEnd={drop}
                            style={{ background: `${task.color}` }}
                        >
                            <div className='todo-div'>
                                <h3 className='todo-title'>{task.slNo}. {task?.todo}</h3>
                                <p className='date-added'>{new Date(+task?.addedOn).toLocaleString()}</p>
                            </div>

                            <div className='edit-container'>
                                <IconButton aria-label="delete"
                                    component="label"
                                    role={undefined}
                                    tabIndex={-1}
                                >
                                    <SettingsSuggestIcon />
                                    <VisuallyHiddenInput type='color' onChange={(e) => { handleColorChange(e, task) }} />
                                </IconButton>

                                <IconButton aria-label="delete"
                                    onClick={() => { setCurrentTodoToEdit(task); setShowEditModal(true) }}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton aria-label="delete" onClick={() => { handleDelete(task) }}>
                                    <DeleteIcon />
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