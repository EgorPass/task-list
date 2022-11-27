import { useContextData } from "../../hooks/useContextData"

/**
 * Создает элемент кнопки, которая отрисовывается в компоненте FieldButtonContainer.
 * 
 * Обрабатывает клик для начала изменений описания поля задачи.
 * 
 * Через контекст принимает clickAtEditButton для обработки клика.
 * 
 * @param {{id:number | string}} id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtEditButton 
 * @returns 
 */
export const EditFieldButton = ({ id }) => {

	const {clickAtEditButton} = useContextData()

	return (
		<button
			onClick={(e) => { clickAtEditButton(id) }}
			className ="task-field__item-button"
		>
			Изменить
		</button>
	)
}