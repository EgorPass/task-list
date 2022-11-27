import { useContextData } from "../../hooks/useContextData"

/**
 * Компонент отрисовывает элемент input[type ="date"] для изменения даты до которой нужно выполнить задачу.
 * 
 * Через контекст принимает changeDate для изменения даты и состояние editState из которого и берет дату.
 * 
 * Родительский компонент FieldDeadlineContainer.
 * 
 * @param {object} param 
 * @param {number | string} param.id индификатор задачи (обекта из массива taskState), использутся в обработчике changeDate, 
 * @returns 
 */
export const EditDateField = ({ id }) => {
	const { editState, changeDate } = useContextData()	
	const value = editState.deadline
	return (
		<input
			type = "date"
			value={value}
			className= "task-field__edit-field task-field__edit-field_deadline"
			onChange = {(e)=> {changeDate(id, e.target.value)}}
		>
			
		</input>
	)

}