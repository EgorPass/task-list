import { memo } from "react"
import { DeadlineForTask } from "../deadlineForTask/DeadlineForTask";
import "../../styles/deadline-container.scss"

/**
 * Мемоизированный омпонент контейнер, создает блок с классом "task-field__deadline-container" для размещения элементов о дате формируемой компонентом, до которой нужно завершить задачу или изменению этой даты в поле описания задачи.
 * 
 * Из параметров content, isComplite и текущей даты формирует фразу, которая ставиться перед датой.
 * 
 * @param {number | string} nextProp.id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {number | string} nextProp.content дата до которой нужно выполнить задачу,
 * @param {boolean} nextProp.isComplite состояние готовности задачи,
 * @param {function} nextProp.onchange - обработчик для изменения даты changeData
 * @returns 
 */
export const FieldDeadlineContainer = memo(
	( { content, onchange, isComplite } ) => { 

		// console.log( "deadline field render..." )
		
		const date = new Date( content )
		const today = Date.now()
		const diff = date - today;	
		const dayState = !isComplite ? diff > 0 ? true : false : true;
		
		let deadLineDescription =
			isComplite ? "" : dayState ? "Выполнить до: " : "истек срок: "

		return (
			<div className = "task-field__deadline-container deadline-container">
				
				<span className = "deadline-container__deadline-description">
					{ deadLineDescription }
				</span>
				
				{
					!isComplite && (
								< DeadlineForTask
									content = { content }
									onchange = { onchange }
								/>
					)
				}

			</div>
		)
	}
)