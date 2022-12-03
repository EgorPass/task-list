import { useContextData } from "../../ComponentsHooks/useContextData"

/**
 * Компонент который отрисовывет элемент с датой до которой нужно выполнить задачу.
 * 
 * Используется в отрисовке поля описания здачи в компоненте FieldDeadlineContainer.
 * 
 * Для изменения даты используется функция changeDate из контекста и состояние field 
 * 
 * @param {{deadline: string | number}} deadline дата до которай нужно выплнить задачу,
 * @returns 
 */
export const DeadlineForTask = ({id, deadline, }) => {
	const { field, changeDate } = useContextData()	

	return (
		<input
			type = "date"
			value={field.deadline}
			className= "deadline-container__deadline"
			onChange = {(e)=> {changeDate( e.target.value)}}
		/>
	)
}