import { useContextData } from "../../ComponentsHooks/useContextData";


/**
 * Компонент отрисовывает Header списка задач.
 * В компоненте содержиться поисковая строка и кнопка создания новой задачи.
 * 
 * Через контекст принимает changeSearch, search, createTask.
 * 
 * createTask обрабатывает клик для создания новой задачи.
 * 
 * search и changeSearch обрабатывает запрос поисковой строки.
 * 
 * @returns 
 */
export const TaskHeader = () => {

	const {changeSearch, search, createTask} = useContextData()

	return (
		<div className = "task-body__task-header task-header">
				
			<div className="task-header__search-field">
				<input
					type="search"
					onChange={changeSearch}
					value = {search}
				/>
			</div>
			<div className="task-header__create-button">
				<button
					onClick={(e) => {createTask() }}
					className="task-header__item-button"
				>
						+
				</button>
			</div>				

		</div>

	)
}