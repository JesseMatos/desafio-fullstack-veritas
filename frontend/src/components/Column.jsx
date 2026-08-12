import TaskCard from './TaskCard'

function Column({ title, tasks, onDelete, onUpdate }) {
  return (
    <section className="kanban-column">
      <h2>{title}</h2>

      <div className="tasks">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </section>
  )
}

export default Column