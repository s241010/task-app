function CalendarGrid({ currentMonth, selectedDate, onSelectDate }) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startDay = firstDay.getDay()

  const today = new Date()
  const cells = []

  for (let i = 0; i < startDay; i++) {
    cells.push(<td key={`empty-${i}`}></td>)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(year, month, day)
    const isToday = cellDate.toDateString() === today.toDateString()
    const isSelected = selectedDate && cellDate.toDateString() === selectedDate.toDateString()

    cells.push(
      <td
        key={day}
        className={isSelected ? 'selected' : ''}
        style={isToday ? { border: '2px solid red' } : {}}
        onClick={() => onSelectDate(cellDate)}
      >
        {day}
      </td>
    )
  }

  const rows = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(
      <tr key={i}>
        {cells.slice(i, i + 7)}
      </tr>
    )
  }

  return (
    <table id="calendar">
      <thead>
        <tr>
          <th>日</th>
          <th>月</th>
          <th>火</th>
          <th>水</th>
          <th>木</th>
          <th>金</th>
          <th>土</th>
        </tr>
      </thead>
      <tbody id="calendarBody">
        {rows}
      </tbody>
    </table>
  )
}

export default CalendarGrid
