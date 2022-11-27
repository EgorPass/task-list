import { useContextData } from "../../hooks/useContextData"

/**
 * Создает элемент кнопки, которая отрисовывается в компоненте FieldButtonContainer.
 * 
 * Обрабатывает клик для закрытия описания поля задачи.
 * 
 * Через контекст принимает clickAtCloseButton для обработки клика.
 * 
 * @param {{id:number | string}} id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtCloseButton 
 * @returns 
 */
export const CloseItemButton = ({ id }) => {
	const {clickAtCloseButton} = useContextData()
	return (
		<button
			onClick = {(e) => { clickAtCloseButton() }}
			className = "task-field__item-button"
		>
			Закрыть
		</button>
	)
}