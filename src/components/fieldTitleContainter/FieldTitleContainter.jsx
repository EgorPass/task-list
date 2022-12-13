import { memo } from "react"
import { EditableTextField } from "../editableTextField/EditableTextField";
import "../../styles/title-container.scss"

/**
 * Мемоизированный компонент контейнер, для отрисовки названия задачи в поле описания задачи.
 *  
 * Отрисовывает компонент EditableTextField и поле подложку для него.
 *  
 * Через пропс принимает className для компонента EditableTextField с модификаторм для заголовка.
 * 
 * @param {string} nextProps.content название задачи, передается в EditableTextField,
 * @param {boolean} nextProps.className класс стиля с установленным модификатором для EditableTextField.
 * @param {object | null} nextProps.onchange обработчик изменения строкового состояния changeTitle заголовка для передачи EditableTextField
 * @returns 
 */
export const FieldTitleContainer =	memo(
	( { className, content, onchange } ) => {

		// console.log("title field render...")
	
			return (
				<div className = "task-field__title-container title-container">
					<div className = "task-field__text-height">	
						{ content }
						&nbsp;
						<EditableTextField
							onchange = { onchange }
							content = { content }
							className = { className }
						/>
					</div>
			</div>
		)
	} 
)