import { useState } from 'react'

function TaskCard({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')

  const nextStatus = {
    todo: 'doing',
    doing: 'done',
    done: 'todo',
  }

  const moveLabels = {
    todo: '→ Em progresso',
    doing: '→ Concluída',
    done: '↩ Voltar para A fazer',
  }

  function handleMove() {
    onUpdate({
      ...task,
      status: nextStatus[task.status],
    })
  }

  function handleSave() {
    onUpdate({
      ...task,
      title,
      description,
    })

    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <article className="task-card">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descrição (opcional)"
        />

        <div className="task-actions">
          <button type="button" onClick={handleSave}>
            Salvar
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
        </div>
      </article>
    )
  }

  return (
    <article className="task-card">
      <h3>{task.title}</h3>

      {task.description && <p>{task.description}</p>}

      <div className="task-actions">
        <button type="button" onClick={() => setIsEditing(true)}>
          Editar
        </button>

        <button type="button" onClick={handleMove}>
          {moveLabels[task.status]}
        </button>

        <button type="button" onClick={() => onDelete(task.id)}>
          Excluir
        </button>
      </div>
    </article>
  )
}

export default TaskCard