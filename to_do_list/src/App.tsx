import React, { useState, useEffect } from 'react';
import { Task } from './types';  
import DeleteIcon from '@mui/icons-material/Delete';

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [Display, setDisplay] = useState<string>('none');
  const [filters, setFilters] = useState<string>('All');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]
);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: taskInput,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setDisplay('table');
    }
    else alert('Enter Task');
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (tasks.length === 1) setDisplay('none');
  };

  const filterTasks = tasks.filter(task => {
    if (filters === 'Complete') return task.completed;
    else if (filters === 'Incomplete') return !task.completed;
    return true;
  });

  if (!filters) setDisplay('none');

  return (
    <div className='container'>
      <h1>To-Do List</h1><br/>
      <input 
        type="text" 
        value={taskInput} 
        onChange={(e) => setTaskInput(e.target.value)} 
        placeholder="Add new task" 
      />
      <button onClick={addTask}>Add Task</button>
      <div><br/>
        <p style={{display:Display==='none' ? 'block' : 'none'}}>No Data !</p>
        <table style={{display:Display}}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Tasks</th>
              <th>Complete</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              filterTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index+1}</td>
                  <td>
                    {task.text}
                  </td>
                  <td>
                    <input
                      type="checkbox" 
                      checked={task.completed} 
                      onChange={() => toggleTaskCompletion(task.id)} />
                  </td>
                  <td>
                    <button className='delete-btn' onClick={() => deleteTask(task.id)}><DeleteIcon /></button>
                  </td>
                </tr>))
            }
          </tbody>
        </table><br/>
      </div>
      <div>
        <button onClick={() => setFilters('All')}>All Tasks</button>
        <button onClick={() => setFilters('Complete')}>Completed</button>
        <button onClick={() => setFilters('Incomplete')}>Incompleted</button>
      </div>
    </div>
  );
};

export default TodoApp;