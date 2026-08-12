import TaskCard from './TaskCard'

function EmptyIcon() {
  return (
    <svg
      className="empty-icon"
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 4.5H6.5C5.67 4.5 5 5.17 5 6V20C5 20.83 5.67 21.5 6.5 21.5H17.5C18.33 21.5 19 20.83 19 20V6C19 5.17 18.33 4.5 17.5 4.5H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M8 3.5C8 2.67 8.67 2 9.5 2H14.5C15.33 2 16 2.67 16 3.5V5.5H8V3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M9 10H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M9 14H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Column({ title, status, tasks, onDelete, onUpdate }) {
  return (
    <section className={`kanban-column ${status}`}>
      <h2>{title}</h2>

      <div className="column-divider"></div>

      <div className="tasks">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <EmptyIcon />
            <p>Nenhuma tarefa aqui.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default Column