import { useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import AddedTasks from './components/AddedTasks';

function App() {

  const [tasks, setTasks] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Let's manage your jobs!!
        </h1>
      </header>
      <InputBox tasks={tasks} setTasks={setTasks} />
      <AddedTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
