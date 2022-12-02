import { EditableTextField } from "../editableTextField/EditableTextField";

import "../../styles/description-container.scss"

/**
 * Компонент создает элемент описания задачи.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param
 * @param {string} param.description описание задачи из объекта массива taskState,
 * @param {object | null} param.edit объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldDescriptionContainer = ({ description}) => {

	console.log(description)

	return (
		<div className = "task-field__descriptio-container description-container">
			<div className = "task-field__text-height">	
				
				{description}
	
				<EditableTextField 
					field = "description"
					content={description}
					className = "description-container__description"
				/>

			</div>
		</div>
) 
}