import { DeadlineForTask } from "../deadlineForTask/DeadlineForTask";

import "../../styles/deadline-container.scss"

/**
					< DeadlineForTask id={id}  deadline={deadline}	/>
 * Компонент контейнер, создает блок с классом "task-field__deadline-container" для размещения элементов о дате формируемой компонентом, до которой нужно завершить задачу или изменению этой даты в поле описания задачи.
 * 
 * Из параметров deadline, isComplite и текущей даты формирует фразу, которая ставиться перед датой.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param0
 * @param {number | string} param.id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {number | string} param.deadline дата до которой нужно выполнить задачу,
 * @param {boolean} param.isComplite состояние готовности задачи,
 * @param {object | null} param.edit - объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldDeadlineContainer = ({ id, deadline, isComplite, edit }) => { 

	let date;

		if (edit) date = new Date(edit.deadline)
		else date = new Date(deadline)
	
	const today = Date.now()
	const diff = date - today;	
	const dayState = !isComplite ? diff > 0 ? true : false : true;
	
	let deadLineDescription = isComplite ? "" : dayState ? "Выполнить до: ": "истек срок"

	deadline = isComplite ? "" :date.toLocaleString("ru").slice(0, 10)

	return (
		
		<div className="task-field__deadline-container deadline-container">
			<span className = "deadline-container__deadline-description">{ deadLineDescription }</span>
			
			{
				!isComplite && (

					< DeadlineForTask id={id}  deadline={deadline}	/>
				)
			}

		</div>

	)
}
