import { useState } from 'react'

function TaskPanel({ selectedDate, tasks, onAddTask }) {
  const [taskInput, setTaskInput] = useState('')

  const handleAddClick = () => {
    const text = taskInput.trim()
    if (!text) return
    
    onAddTask(text)
    setTaskInput('')
  }

  const taskList = selectedDate
    ? tasks[selectedDate.toISOString().split('T')[0]] || []
    : []

  return (
    <div>
      <h2>タスク</h2>
      <input
        type="text"
        id="taskInput"
        placeholder="タスク追加"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddClick()}
      />
      <button id="addBtn" onClick={handleAddClick}>
        追加
      </button>
      <ul id="taskList">
        {taskList.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default TaskPanel
