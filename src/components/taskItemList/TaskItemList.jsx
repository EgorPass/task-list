import { memo } from "react"

import { Title } from "../title/Title";
import { Checkbox } from "../checkbox/Checkbox";
import { FileAnchor } from "../fileAnchor/FileAnchor";
import { TaskContainerLoader } from "../taskContainerLoader/TaskContainerLoader";

import '../../styles/task-container.scss';
import '../../styles/task-item.scss'

/**
 * Мемоизированный компонент контейнер, создает блок с классом "task-body__content-container" для размещения списка задач.
 * 
 * Отрисовывает компоненты строки списка задачи: Checkbox, Title и FileAnchor.
 * 
 * А так же отрисовывает TaskContainerLoader для ожидания загрузки
 * 
 * Через состояние tasks принимает масив с объектом задач tasks, и из этого масива строятся элементы списка задач с классом "task-container__task-item task-item".
 * 
 * Через контекст useTaskItemListContext принимает clickAtTitle и clickAtCheckboxTitle, которые передает в дочерение компоненты
 * 
 * Родительский компонент TaskBody.
 * 
 * @returns 
 */
export const TaskItemList =
	memo(
	({ tasks, loader, setModeForTitle, clickAtTitle, clickAtCheckboxTitle }) => {

		// console.log( "taskItemList render ..." )
			
			
		return (
			<div className="task-body__content-container">
				<ul className = "task-body__task-container task-container">
					{
						tasks.map(it => (
							<li
							key = { `${ it.id }` }
							className="task-container__task-item task-item"
							>
								<Checkbox
									id = { it.id }
									isComplite = { it.isComplite }
									className = "task-item__checkbox"
									clickAtCheckbox = { clickAtCheckboxTitle }
									/>
								<Title
									id ={ it.id }
									title = { it.title }
									clickAtTitle = { clickAtTitle }
									className=  {`task-item__title task-item__title_${ setModeForTitle ( it.deadline, it.isComplite ) }`}
								/>

								{
									it.files && <FileAnchor />
								}
							</li>
						))
					}
				</ul>
				<TaskContainerLoader
					
					state = { loader }
					content = { "Давайте создадим первую задачу" }
				/>
			</div>
		)
	}
)