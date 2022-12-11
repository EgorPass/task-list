/**
 * Компонент который отрисовывет элемент с датой до которой нужно выполнить задачу.
 * Не мемоизируем, достаточна мемоизация в родителе FieldDeadlineContainer.
 *   
 * @param {object} param0
 * @param {string | number} param0.content 
 * @param {function} param0.onchange 
 * 
 * @param content дата до которай нужно выплнить задачу,
 * @param onchange функция для изменения даты в input
 * @returns 
 */
export const DeadlineForTask = ({ content, onchange }) => {
	
	console.log("/deadline for task render ...")
	
	return (
		<input
			type = "date"
			name = "date"
			value={content}
			className= "deadline-container__deadline"
			onChange = { onchange }
		/>
	)
} 