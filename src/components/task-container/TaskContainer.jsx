import { useContextData } from "../../ComponentsHooks/useContextData";
import { TaskItemList } from "../taskItemList/TaskItemList";

import '../../styles/task-container.scss';


/**
 * Компонент контейнер, создает блок с классом "task-body__content-container" для размещения списка задач.
 * 
 * Отрисовывает контейнер списка с калссом "task-body__task-container task-container", и вложенные в него элементы списка с калссом "task-container__task-item task-item".
 * 
 * Через контекст принимает масив с объектом задач tasks, и из этого масива строятся элементы списка задач с классом "task-container__task-item task-item".
 * 
 * Каждый элемент списка отрисовывает компонент TaskItemList в который передается отдельный объект из состояния tasks
 * 
 * Родительский компонент TaskBody.
 * 
 * @returns 
 */
export const TaskContainer = () => {

	const {tasks} = useContextData()

	return (

		<div className="task-body__content-container">
			<ul className = "task-body__task-container task-container">
				{
					tasks.map(it => (
						<li
						key = {`${it.id}`}
						className="task-container__task-item task-item"
						>
							< TaskItemList {...it} /> 
						</li>
					))
				}
			</ul>
		</div>
	)
}