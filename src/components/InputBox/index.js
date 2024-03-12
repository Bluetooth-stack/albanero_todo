import React, { useState } from 'react';
import './style.css'
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function InputBox({tasks, setTasks}) {

    const [taskValue, setTaskValue] = useState('');

    function handleAddClick(){
        if(taskValue===''){
            alert('Please do not use example or leave the field empty, add your task!');
            return;
        }
        setTasks([...tasks, {todo: taskValue, addedOn: new Date().toLocaleString()}]);
        setTaskValue('');
    }

    return (
        <div className='input-box-container'>
            <TextField
                id="outlined-required"
                label="What's on your mind!"
                value={taskValue}
                onChange={(e)=>{setTaskValue(e.target.value)}}
                onFocus={(e)=>{e.target.value=''}}
            />

            <Fab size="medium" color="secondary" aria-label="add" onClick={handleAddClick}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default InputBox