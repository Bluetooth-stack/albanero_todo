import React, { useState } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

function InputBox({ tasks, setTasks, handleExport, handleImport }) {

    const [taskValue, setTaskValue] = useState("");

    function handleAddClick() {
        if (taskValue === "") {
            alert(
                "Please do not use example or leave the field empty, add your task!"
            );
            return;
        }
        setTasks([
            ...tasks,
            { slNo: tasks.length+1, todo: taskValue, addedOn: Date.now(), color: '#ffffff' },
        ]);
        setTaskValue("");
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
        <div className="wrapper">
            <div className="input-box-container">
                <TextField
                    id="outlined-required"
                    label="What's on your mind!"
                    value={taskValue}
                    onChange={(e) => {
                        setTaskValue(e.target.value);
                    }}
                    onFocus={(e) => {
                        e.target.value = "";
                    }}
                />

                <Fab
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    onClick={handleAddClick}
                >
                    <AddIcon />
                </Fab>
            </div>
            <div className="import-export-btn-container" >
                <Button variant="outlined" color="success" onClick={handleExport}>
                    Export
                </Button>
                <Button
                    component="label"
                    variant="outlined"
                    tabIndex={-1}
                    color="secondary"
                >
                   Import
                    <VisuallyHiddenInput type="file" accept=".csv" onChange={(e)=>{handleImport(e)}} />
                </Button>
            </div>
        </div>
    );
}

export default InputBox;
