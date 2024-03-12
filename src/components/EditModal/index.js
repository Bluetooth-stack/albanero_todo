import React, { useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditModal({ currentTodo, tasks, setTasks, setShowModal }) {

    const [newTodo, setNewTodo] = useState(currentTodo?.todo);

    function handleChangeClick() {
        setTasks(
            tasks.map((task) => {
                if (task.todo === currentTodo.todo) {
                    return { todo: newTodo, addedOn: new Date().toLocaleString() }
                }
                return task
            })
        )
        setShowModal(false)
    }

    return (
        <div className='modal-background'>
            <div className='edit-modal'>
                <TextField
                    id="outlined-required"
                    label="What's on your mind!"
                    value={newTodo}
                    onChange={(e) => { setNewTodo(e.target.value) }}
                    onFocus={(e) => { e.target.value = '' }}
                />

                <div className='edit-modal-button-container'>
                    <Button variant="outlined" onClick={handleChangeClick}>Change</Button>
                    <Button variant="outlined" color="error" onClick={() => { setShowModal(false) }}>Close</Button>
                </div>
            </div>
        </div>
    )
}

export default EditModal