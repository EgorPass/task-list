import { useContextData } from "../../ComponentsHooks/useContextData"
import { EditableTextField } from "../editableTextField/EditableTextField";

import "../../styles/title-container.scss"

/**
 * Компонент контейнер, для отрисовки названия задачи в поле описания задачи.
 * 
 * Принимает в пропсы объект массива tasks  
 * 
 * Отрисовывает компонент только один компонент, Title
 *  
 * Через контекст принимает функцию setModeForTitle, которая создает модификотр для пропса className компонента Title.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param
 * @param {string} param.title название задачи, передается в Title,
 * @param {boolean} param.isComplite состояние готовности выполнения задачи, используется в функции setModeForTitle для создания модификатора пропса className компонента Title.
 * @param {string | number} param.deadline дата до которай нужно выплнить задачу, используется в функции setModeForTitle для создания модификатора пропса className компонента Title.
 * @param {object | null} param.edit объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldTitleContainer = ({ title, isComplite, deadline }) => {

	const { setModeForTitle } = useContextData();
	const classNameMod = setModeForTitle (deadline, isComplite)

		return (
			<div className="task-field__title-container title-container">
				<div className = "task-field__text-height">	

					
					{title}

					<EditableTextField
						field="title"
						content = {title}
						className={
							`title-container__title title-container__title_${classNameMod}`
						}
					/>
			
				
				</div>
		</div>
	)
}