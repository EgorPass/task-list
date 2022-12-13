import { memo } from "react"
import { EditableTextField } from "../editableTextField/EditableTextField";
import "../../styles/description-container.scss"

/**
 * Мемоизированный компонент создает элемент описания задачи за счет компонента EditableTextField и его подложки.
 * 
 * @param {string} nextProp.content описание задачи из объекта массива taskState,
 * @param {object | null} nextProp.onchanger обработчик изменения строкового состояния changeDescription для передачи EditableTextField
 * @returns 
 */
export const FieldDescriptionContainer = memo(
	( { content, onchange } ) => {

			// console.log( "description field render..." )

			return (
				<div className = "task-field__descriptio-container description-container">
					<div className = "task-field__text-height">	
						{ content }
						&nbsp;
						<EditableTextField 
							onchange = { onchange }
							content = { content }
							className = "description-container__description"
						/>
					</div>
				</div>
		) 
	}
)