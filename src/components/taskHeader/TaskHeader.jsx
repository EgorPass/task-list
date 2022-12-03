import { SearchField } from "../searchField/SearchField";
import { CreateButton } from "../buttons/CreateButton";

import '../../styles/task-header.scss';


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

	return (
		<div className = "task-body__task-header task-header">
				
			<SearchField />
			<CreateButton />

		</div>

	)
}