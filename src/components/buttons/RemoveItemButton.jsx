import { useContextData } from "../../hooks/useContextData" 

/**
 * Создает элемент кнопки, которая отрисовывается в компоненте FieldButtonContainer.
 * 
 * Обрабатывает клик для удаления задачи.
 * 
 * Через контекст принимает clickAtRemoveButton для обработки клика.
 * 
 * @param {{id:number | string}} id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtRemoveButton
 * @returns
 */
export const RemoveItemButton = ({ id }) => {
	const { clickAtRemoveButton} = useContextData()


	return (
		<button
			onClick = {(e) => { clickAtRemoveButton(id)} }
			className="task-field__item-button"
		>
			Удалить
		</button>
	)
}