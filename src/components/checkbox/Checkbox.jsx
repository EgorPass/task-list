/**
 * Компонент для отрисовки чекбокса задачи.
 * 
 * Не мемоизируем, на TaskItemList зависит от сотояния task, которое обновляется при изменении чекбокса или вводе в поисковой строке. А на TaskItemField мемоизируется родитель (FieldCheckboxContainer) компонента Checkbox
 * 
 * перерендеривается при изменении пропса isComplite
 * или className
 * 
 * @param {object} param0
 * @param {number | string} param0.id 
 * @param {boolean} param0.isComplite 
 * @param {string} param0.className 
 * @param { function } param0.clickAtCheckbox 
 * 
 * @param id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtCheckbox,
 * @param isComplite параметр принимает от родительского компонента, используется в аттрибуте checked тэга input,
 * @param className для определения класса от родительского компонента
 * @param clickAtCheckbox обработчик клика по чекбоксу, зависит от id
 * @returns 
 */
export const Checkbox =	( { id, isComplite, className, clickAtCheckbox } ) => {

	console.log("/checkbox render...")
		
	return (
		<label
			className = { className }		
		>
			<input 
				type = "checkbox"   
				checked = { isComplite }
				onChange = { () => clickAtCheckbox( id ) }
			/>
			<div
				className = "task-item__checkmark"
			></div>
		</label>
	)
}