/**
 * Компонент создает элемент кнопки закрытия описания задачи, которая отрисовывается в компоненте FieldButtonContainer.
 * 
 * Не мемоизируем, бессмысленно, зависит от параметров состояний textField, fieldState, состояний, которые содержат изменяемые разделы поля описания задачи.
 *  
 * @param {object} param0
 * @param {number | string} param0.id 
 * @param {function} param0.clickAtCloseButton 
 * 
 * @param id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtCloseButton,
 * @param clickAtCloseButton обработчик кликов для закрытия окна описания задачи
 * @returns 
 */
export const CloseItemButton = ( { id, clickAtCloseButton } ) => {
	
	// console.log("/close button render ....")

	return (
		<button
			onClick = { (e) => { clickAtCloseButton( id ) } }
			className = "button-container__item-button"
		>
			Закрыть
		</button>
	)
}