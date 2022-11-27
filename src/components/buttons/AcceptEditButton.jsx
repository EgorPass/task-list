import { useContextData } from "../../hooks/useContextData";

/**
 * Создает элемент кнопки, которая отрисовывается в компоненте FieldButtonContainer.
 * 
 * Обрабатывает клик для сохранения изменений описания поля задачи.
 * 
 * Через контекст принимает clickAtAcceptButton для обработки клика.
 * 
 * @param {{id: number | string}} id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtAcceptButton
 * @returns 
 */
export const AcceptEditButton = ({ id }) => {

	const { clickAtAcceptButton } = useContextData()

	return (
		<button 
			onClick={() => { clickAtAcceptButton(id) }}
			className = "task-field__item-button"
		>
			Сохранить
		</button>
	)
}