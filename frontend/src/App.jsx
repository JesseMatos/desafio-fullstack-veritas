import { useEffect, useState } from 'react'
import './App.css'
import Column from './components/Column'
import TaskForm from './components/TaskForm'
import { createTask, deleteTask, getTasks, updateTask } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTasks() {
      try {
        setError('')
        const data = await getTasks()
        setTasks(data)
      } catch (error) {
        setError('Não foi possível carregar as tarefas.')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  async function handleTaskCreated(task) {
    try {
      setError('')
      const newTask = await createTask(task)
      setTasks((currentTasks) => [...currentTasks, newTask])
    } catch (error) {
      setError('Não foi possível criar a tarefa.')
    }
  }

  async function handleTaskUpdate(task) {
    try {
      setError('')
      const updatedTask = await updateTask(task.id, task)

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id
            ? updatedTask
            : currentTask
        )
      )
    } catch (error) {
      setError('Não foi possível atualizar a tarefa.')
    }
  }

  async function handleTaskDelete(id) {
    try {
      setError('')
      await deleteTask(id)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      setError('Não foi possível excluir a tarefa.')
    }
  }

  return (
    <main className="kanban">
      <h1>Mini Kanban</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {loading && <p>Carregando tarefas...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="kanban-board">
          <Column
            title="A fazer"
            tasks={tasks.filter((task) => task.status === 'todo')}
            onDelete={handleTaskDelete}
            onUpdate={handleTaskUpdate}
          />

          <Column
            title="Em progresso"
            tasks={tasks.filter((task) => task.status === 'doing')}
            onDelete={handleTaskDelete}
            onUpdate={handleTaskUpdate}
          />

          <Column
            title="Concluídas"
            tasks={tasks.filter((task) => task.status === 'done')}
            onDelete={handleTaskDelete}
            onUpdate={handleTaskUpdate}
          />
        </div>
      )}
    </main>
  )
}

export default App