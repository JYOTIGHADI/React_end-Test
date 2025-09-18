
import React, { useState, useEffect } from "react";

  const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All"); 
    useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);
  
   useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

   const addTask = () => {
    if (input.trim() === "") return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };
     const toggleTask = (id) => {
      setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

    const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

    const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true; 
    });

    return (
     <div style={styles.container}>
       <h1>ToDo List</h1>

       <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addBtn}>Add</button>
        </div>
      <div style={styles.filterBox}>
        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              background: filter === f ? "#007bff" : "#ddd",
              color: filter === f ? "white" : "black",
            }}
          >
            {f}
          </button>
        ))}
         </div>
        
         <ul style={styles.taskList}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {task.text}
              </span>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteBtn}>
              delete
            </button>
          </li>
        ))}
      </ul>
      </div>
  );
  };

const styles = {
  container: { width: "400px", margin: "50px auto", textAlign: "center" },
  inputBox: { display: "flex", gap: "10px", marginBottom: "10px" },
  input: { flex: 1, padding: "8px" },
  addBtn: { padding: "8px 12px", cursor: "pointer" },
  filterBox: { marginBottom: "15px" },
  filterBtn: { margin: "0 5px", padding: "6px 12px", cursor: "pointer" },
  taskList: { listStyle: "none", padding: 0 },
  taskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "6px 0",
    padding: "6px 10px",
    border: "1px solid white",
    borderRadius: "5px",
  },
  deleteBtn: { border: "none", cursor: "pointer" },
};

export default TodoApp;










