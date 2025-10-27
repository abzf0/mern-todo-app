import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', desc: '', dueDate: '' });

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("error fetching tasks: ", err));
  }, []);

  const addTask = async () => {
    if (!newTask.title || !newTask.desc || !newTask.dueDate) {
      alert("all fields must be filled");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("failed to add task");

      const addedTask = await res.json();
      setTasks([...tasks, addedTask]);
      setNewTask({ title: '', desc: '', dueDate: '' });
    } catch (err) {
      console.error("error adding task: ", err);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.desc}
          onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h2>{task.title}</h2>
              <p>{task.desc}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Status: {task.completed ? "completed" : "pending"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
