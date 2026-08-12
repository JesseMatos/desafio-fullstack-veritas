import { useState } from 'react'

function TaskForm({ onTaskCreated, saving }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    onTaskCreated({
      title: title.trim(),
      description: description.trim(),
      status: 'todo',
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={saving}
      />

      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        disabled={saving}
      />

      <button type="submit" disabled={saving || !title.trim()}>
        {saving ? 'Adicionando...' : 'Adicionar tarefa'}
      </button>
    </form>
  )
}

export default TaskForm