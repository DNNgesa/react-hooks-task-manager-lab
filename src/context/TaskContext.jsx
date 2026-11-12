import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  function addTask(title) {
    const newTask = {
      title: title,
      completed: false,
    };

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((savedTask) => {
        setTasks((prevTasks) => [...prevTasks, savedTask]);
      })
      .catch((error) => console.error("Error adding task:", error));
  }

  function toggleComplete(id) {
    const targetTask = tasks.find((task) => task.id === id);
    if (!targetTask) return;

    const updatedCompleted = !targetTask.completed;

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updatedCompleted }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
      })
      .catch((error) => console.error("Error updating task:", error));
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
