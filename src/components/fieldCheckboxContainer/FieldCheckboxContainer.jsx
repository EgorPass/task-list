import { memo } from "react"
import { Checkbox } from "../checkbox/Checkbox";
import '../../styles/checkbox-container.scss'

/**
 * Отрисовывает мемоизированный компонент контейнер Checkbox и добавляет к ниму комментарий о готовности.
 * 
 * Компонент отрисовывает Checkbox в зависимости от параметра newField, то есть елси задача только создана (newField === true), то  чек бокс не отрисовывается.
 * 
 * @param {number | string} nextProp.id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {boolean} nextProp.isComplite параметр состояния готовности выполнения задачи для передачи в компонент Checkbox
 * @param {boolean} nextProp.newField параметр состояния для определения создана ли эта задача только что,
 * @param {function} nextProp.clickAtCheckbox обработчик для обработки изменения состояния чекбокс clickAtCheckboxField
 * @returns 
 */
export const FieldCheckboxContainer =	memo(
	( { id, isComplite, clickAtCheckbox, newField } ) => {
			
		// console.log( "chexkbox field render..." )

		let checkDescription = isComplite ? "Выполненно!" : "В работе...";
	
		return (	
			<div className = "task-field__checkbox-container checkbox-container">
				{
					!newField &&
						<>
							<Checkbox
								id = { id }
								isComplite = { isComplite }
								className = "task-item__checkbox"
								clickAtCheckbox = { clickAtCheckbox }
							/>
							<span
								className = "checkbox-container__check-description"
							>
								{ checkDescription }
							</span>		
					</>
				}	
			</div>

		)
	}
)