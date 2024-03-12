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
                    return {slNo: currentTodo.slNo , todo: newTodo, addedOn: Date.now(), color: currentTodo.color }
                }
                return task
            })
        )
        setShowModal(false)
    }

    return (
        <div className='modal-background' onClick={()=>{setShowModal(false)}}>
            <div className='edit-modal' onClick={(e)=>{e.stopPropagation()}}>
                <TextField
                    id="outlined-required"
                    label="Changed your thoughts?"
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