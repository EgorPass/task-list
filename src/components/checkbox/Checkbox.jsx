import { useContextData } from "../../ComponentsHooks/useContextData"


/**
 * Создает элемент чекбокса для отслеживания готовности выполнения задиня.
 * 
 * Родительские компоненты: TaskItemList и FieldCheckboxContainer.
 * 
 * Обрабатывает клик для изменения состояния готовности задачи.
 * 
 * Через контекст принимает clickAtCheckbox для обработки клика.
 * 
 * @param {object} param 
 * @param {boolean} param.isComplite параметр принимает от родительского компонента, используется в аттрибуте checked тэга input,
 * @param {number | string} param.id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtCheckbox,
 * @param {string} className для определения класса от родительского компонента
 * @returns 
 */
export const Checkbox = ({ isComplite, id, className }) => {

		const { clickAtCheckbox } = useContextData()
	
	return (
		<label
			className={className}		
		>
			<input 
				type="checkbox"   
				checked={isComplite}
				onChange = {()=> clickAtCheckbox(id)}
			/>
			<div
				className="task-item__checkmark"
			></div>
		</label>
	)
}