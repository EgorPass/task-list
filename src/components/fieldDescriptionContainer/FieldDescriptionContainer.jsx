import { EditableTextField } from "../editableTextField/EditableTextField";

import "../../styles/description-container.scss"

/**
 * Компонент создает элемент описания задачи за счет компонента EditableTextField.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param0
 * @param {string} param.description описание задачи из объекта массива taskState,
 * @param {object | null} param.edit объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldDescriptionContainer = ({ description}) => {

	return (
		<div className = "task-field__descriptio-container description-container">
			<div className = "task-field__text-height">	
				{description}
				&nbsp;
				<EditableTextField 
					field = "description"
					content={description}
					className = "description-container__description"
				/>

			</div>
		</div>
) 
}