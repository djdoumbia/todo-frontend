
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/tasks').then((data) => setTasks(data));
  }, [api]);

  const handleSaveTask = async () => {
    if (!newTaskName.trim()) return;

    if (editingTask) {
      const updatedTask = await api.put(`/tasks/${editingTask.id}`, {
        name: newTaskName,
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } else {
      const createdTask = await api.post('/tasks', { name: newTaskName });
      setTasks((prev) => [...prev, createdTask]);
    }

    setNewTaskName('');
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setNewTaskName(task.name);
    setEditingTask(task);
  };

  const isButtonDisabled =
    !newTaskName.trim() ||
    (editingTask ? newTaskName === editingTask.name : false);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className='djeneba'>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <Button 
          variant="contained" color = "secondary"
          onClick={handleSaveTask}
          disabled={isButtonDisabled}
        >
          {editingTask ? 'Update' : 'Ajoute'} Task
        </Button>
      </Box>
      <Box mb={2} >
        <TextField className='djeneba'
          fullWidth
          label="Search Tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      {filteredTasks.map((task) => (
        <Box key={task.id} display="flex" alignItems="center" mb={1}>
          <Typography flex={1}>{task.name}</Typography>
          <Typography flex={1}>{task.createdAt}</Typography>
          <IconButton onClick={() => startEditing(task)}>
            <Check />
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(task.id)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
    </Container>
  );
};

export default TodoPage;
