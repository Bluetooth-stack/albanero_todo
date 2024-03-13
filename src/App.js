import { useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import AddedTasks from './components/AddedTasks';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Input } from 'react-spreadsheet-grid'



function App() {

  const [tasks, setTasks] = useState([]);
  const [tableView, setTableView] = useState(false);



  function handleExport() {
    if (!tasks.length) {
      alert('There is nothing to export!');
      return;
    }

    if (window.confirm("All todoss will be exported in '.csv' format, Please confirm!")) {
      const refinedDataForCsv = [];
      const titles = Object.keys(tasks[0]);
      refinedDataForCsv.push(titles);
      tasks.forEach((task) => {
        refinedDataForCsv.push(Object.values(task));
      })

      let csvContent = '';

      refinedDataForCsv.forEach((data) => {
        csvContent += data.join(',') + '\n'
      })

      const blobData = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const downloadableCsvUrl = URL.createObjectURL(blobData);

      const link = document.createElement("a");
      link.setAttribute('hidden', 'true');
      link.setAttribute('href', downloadableCsvUrl);
      link.setAttribute('download', Date.now() + '.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
    }
    else {
      return;
    }
  }

  function handleImport(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      // console.log(e);
      let csvContent = e.target.result;

      const [keys, ...values] = csvContent.trim().split('\n').map(row => row.split(','));

      const importedTodoData = values.map((val) => {
        let tempObj = {}
        keys.forEach((key, indx) => {
          tempObj[key] = val[indx];
        })
        return tempObj;
      })
      setTasks(importedTodoData);
    }
    reader.readAsText(file)
  }

  function handleClearAll() {
    if (window.confirm('Are you sure, you want to clear all todos?')) {
      setTasks([]);
    }
    else {
      return
    }
  }

  function handleTableTodoTitileChange(val, currentSlNo, field){
    setTasks(
      tasks.map((task) => {
          if (task.slNo === currentSlNo) {
              return {slNo: currentSlNo , todo: val, addedOn: Date.now(), color: task.color }
          }
          return task
      })
  )
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Let's manage your jobs!!
        </h1>
      </header>
      <InputBox tasks={tasks} setTasks={setTasks} handleExport={handleExport} handleImport={handleImport} />
      {
        tableView ?
          <Grid
            columns={[
              {
                title: () => 'Todos',
                value: (tasks, { focus }) => {
                  return (
                    <Input
                      value={tasks.todo}
                      focus={focus}
                      onChange={(value)=>{handleTableTodoTitileChange(value, tasks.slNo, 'todo')}}
                    />
                  );
                }
              }, {
                title: () => 'Added On',
                value: (tasks) => {
                  return (
                    <span
                      value={tasks.addedOn}
                    >
                      {new Date(+tasks?.addedOn).toLocaleString()}
                    </span>
                  );
                }
              }
            ]}
            rows={tasks}
            getRowKey={tasks => tasks.slNo}
          />
          :
          <AddedTasks tasks={tasks} setTasks={setTasks} />
      }

      <div className='view-container'>
        <Button disabled={!tasks.length} variant="outlined" color='error' startIcon={<DeleteIcon />} id='clear-btn' onClick={handleClearAll} >
          Clear
        </Button>

        <Button disabled={!tasks.length} variant="outlined" color='warning' id='table-view-btn' onClick={() => { setTableView(!tableView) }} >
          {!tableView ? 'Table View' : "Card View"}
        </Button>
      </div>
    </div>
  );
}

export default App;
