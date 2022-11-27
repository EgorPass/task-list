import { Checkbox } from "../checkbox/Checkbox";


/**
 * Отрисовывает компонент Checkbox и добавляет к ниму комментарий о готовности.
 * 
 * Компонент отрисовывает Checkbox в зависимости от параметра create, то есть елси задача только создана (create === true), то  чек бокс не отрисовывается.
 * 
 * Родительский компонент TaskItemField.
 * @param {object} param
 * @param {number | string} param.id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {boolean} param.isComplite параметр для передачи в компонент Checkbox
 * @param {boolean} param.create определяет создана ли эта задача только что.
 * @returns 
 */
export const FieldCheckboxContainer = ({ id, isComplite, create}) => {
		
	let checkDescription = isComplite ? "Выполненно!" : "В работе...";

	return (
			
		<div className = "task-field__checkbox-container">
			{
				!create &&
					<>
						<Checkbox
							id = {id}
						isComplite={isComplite}
						className = "task-field__checkbox"
						/>
						<span
							className="task-field__check-description"
						>
							{checkDescription}
						</span>		
				</>
			}	
		</div>

	)
}