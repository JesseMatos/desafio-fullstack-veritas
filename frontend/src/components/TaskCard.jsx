function TaskCard({ task, onDelete, onUpdate }) {
    function handleMove() {
        const nextStatus = {
            todo:   'doing',
            doing:  'done',
            done:   'todo',
        }

        onUpdate({
            ...task,
            status: nextStatus[task.status],
        })
    }

    return (
        <article className="task-card">
            <h3>{task.title}</h3>

            {task.description && (
                <p>{task.description}</p>
            )}

            <div className="task-actions">
                <button type="button" onClick={handleMove}>
                    Mover
                </button>

                <button type="button" onClick={() => onDelete(task.id)}>
                    Excluir
                </button>
            </div>
        </article>
    )
}

export default TaskCard