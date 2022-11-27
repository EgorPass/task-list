import { Title } from "../title/Title";
import { EditTextField } from "../editTextField/EditTextField";
import { useContextData } from "../../hooks/useContextData"

/**
 * Компонент контейнер, для отрисовки названия задачи в поле описания задачи.
 * 
 * Принимает в пропсы объект массива taskState  
 * 
 * Отрисовывает компонент только один компонент, Title либо EditTextField, в зависимости от значения параметра edit - если null то Title, иначе EditTextField.
 * 
 * Отрисовывает только один компонент, DeadlineForTask или EditDateField 
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
export const FieldTitleContainer = ({ title, edit, isComplite, deadline }) => {

	const { setModeForTitle } = useContextData();
	const classNameMod = setModeForTitle (deadline, isComplite)

		return (
		<div className="task-field__title-container">
			{
				!edit && <Title
						title={title}
						className={`task-field__title task-field__title_${classNameMod}`}
				/>
			}
			{
				edit && <EditTextField
					field="title"
					className="task-field__edit-field task-field__edit-field_title"
				/>
			}
		</div>
	)
}