import { useContextData } from "../../hooks/useContextData"

/**
 * Создает элемент кнопки, которая отрисовывается в компоненте FieldButtonContainer.
 * 
 * Обрабатывает клик для отмены изменений описания поля задачи.
 * 
 * Через контекст принимает clickAtCancelButton для обработки клика.
 * 
 * @returns 
 */
export const CancelEditButton = ({id}) => {
	const { clickAtCancelButton  } = useContextData();

	return (
		<button 
			onClick={() => { clickAtCancelButton(id) }}
			className="task-field__item-button"
		>
			Отменить
		</button>
	)

}