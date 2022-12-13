import { memo } from "react"

/**
 * Мемоизированный компонент отрисовывает кнопку для создания задачи.
 * 
 * @param {function} nextProp.createTask - обрабтчик кнопки для создания новой задачи
 * 
 * @returns
 */
export const CreateButton = memo(	( { createTask } ) => {

	// console.log( "create button render ..." )
	
	return (
		<div className = "task-header__create-container">
			<div
				onClick = { createTask }
				className = "task-header__create-button"
				data-task-tooltip = "Создать новую задачу"
			>
				+
			</div>
		</div>				

	)
} )