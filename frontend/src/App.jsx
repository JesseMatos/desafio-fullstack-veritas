import { useEffect, useState } from 'react'
import './App.css'
import Column from './components/Column'
import TaskForm from './components/TaskForm'
import { createTask, deleteTask, getTasks, updateTask } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
      setSaving(true)

      const newTask = await createTask(task)

      setTasks((currentTasks) => [...currentTasks, newTask])
    } catch (error) {
      setError('Não foi possível criar a tarefa.')
    } finally {
      setSaving(false)
    }
  }

  async function handleTaskUpdate(task) {
    try {
      setError('')
      setSaving(true)

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
    } finally {
      setSaving(false)
    }
  }

  async function handleTaskDelete(id) {
    try {
      setError('')
      setSaving(true)

      await deleteTask(id)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      setError('Não foi possível excluir a tarefa.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="kanban">
      <h1>Mini Kanban</h1>

      <TaskForm
        onTaskCreated={handleTaskCreated}
        saving={saving}
      />

      {loading && (
        <p className="feedback">Carregando tarefas...</p>
      )}

      {saving && (
        <p className="feedback">Salvando alterações...</p>
      )}

      {error && (
        <p className="feedback error">{error}</p>
      )}

      {!loading && (
        <div className="kanban-board">
          <Column
            title="A fazer"
            status="todo"
            tasks={tasks.filter((task) => task.status === 'todo')}
            onDelete={handleTaskDelete}
            onUpdate={handleTaskUpdate}
          />

          <Column
            title="Em progresso"
            status="doing"
            tasks={tasks.filter((task) => task.status === 'doing')}
            onDelete={handleTaskDelete}
            onUpdate={handleTaskUpdate}
          />

          <Column
            title="Concluídas"
            status="done"
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