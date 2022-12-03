import { useContextData } from "../../ComponentsHooks/useContextData";

/**
 * Компонент рисует редактируемую часть тестовых полей в описании задачи.
 * 
 * Для изменения тесктового поля используется контролируемый textarea с обраотчиком changeEditState и состоянием feild
 * 
 * @param {object} param0
 * @param {string} param.className - для определения класса для поля
 * @param {string} param.content содержимое для элемента
 * @param {string} param.field для опрделения поля в котором идут изменения 
 * @returns 
 */
export const EditableTextField = ({ className, content, field }) => {
	const { changeEditState } = useContextData();

	return (		
			<textarea
				value={content}
				className={className}
				onChange={(e) => {
					changeEditState(field, e.target.value)	
				}}
			></textarea>
	)
			

}