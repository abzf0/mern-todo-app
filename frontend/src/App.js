import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
    useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);


  return (
    <div className="App">
      <h1>To-Do List</h1>
      {tasks.length == 0 ? <p>No tasks available</p> : (
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h2>{task.title}</h2>
            <p>{task.desc}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          </li>
        ))}
      </ul>)}
    </div>
  );
}

export default App;