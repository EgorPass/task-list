import { DeadlineForTask } from "../deadlineForTask/DeadlineForTask";
import { EditDateField } from "../editDateField/EditDateField";

/**
 * Компонент контейнер, создает блок с классом "task-field__deadline-container" для размещения элементов о дате до которой нужно завершить задачу или изменению этой даты в поле описания задачи.
 * 
 * Отрисовывает только один компонент, DeadlineForTask или EditDateField в зависимости от значения параметра edit - если null то DeadlineForTask, иначе EditDateField.
 * 
 * Из параметров deadline, isComplite и текущей даты формирует фразу, которая ставиться перед датой.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param 
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
		
		<div className="task-field__deadline-container">
			<span className = "task-field__deadline-description">{ deadLineDescription }</span>
			
			{
				!edit && <DeadlineForTask
										deadline={deadline}
									/>
			}
			{
				edit && !isComplite && <EditDateField id = {id} />
			}
					
		</div>

	)
}
