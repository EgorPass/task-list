import { useContextData } from "../../ComponentsHooks/useContextData";

/**
 * Компонент отрисовывает кнопку для создания задачи.
 * 
 * Для создания задачи используется функция createTask, которая принимается через контекст.
 * 
 * @returns 
 */
export const CreateButton = () => {
	
	const { createTask } = useContextData()

	return (
		<div className="task-header__create-button">
			<button
				onClick={(e) => {createTask() }}
				className="task-header__item-button"
				data-task-tooltip = "Создать новую задачу"
			>
					+
			</button>
		</div>				

	)
}