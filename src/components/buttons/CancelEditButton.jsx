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
export const CancelEditButton = () => {
	const { clickAtCancelButton  } = useContextData();

	return (
		<button 
			onClick={() => { clickAtCancelButton() }}
			className="task-field__item-button"
		>
			Отменить
		</button>
	)

}