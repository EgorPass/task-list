
/**
 * Компонент который отрисовывет блочный элемент с датой до которой нужно выполнить задачу.
 * 
 * Используется в отрисовке поля описания здачи в компоненте FieldDeadlineContainer. 
 * 
 * @param {{deadline: string | number}} deadline дата до которай нужно выплнить задачу,
 * @returns 
 */
export const DeadlineForTask = ({ deadline }) => {

	return (
			
		<div className="task-field__deadline">
			{deadline}
		</div>
		)
}