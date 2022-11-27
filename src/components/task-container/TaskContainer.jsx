import { useContextData } from "../../hooks/useContextData";
import { TaskItemList } from "../taskItemList/TaskItemList";

/**
 * Компонент контейнер, создает блок с классом "task-body__content-container" для размещения списка задач.
 * 
 * Отрисовывает контейнер списка с калссом "task-body__task-container task-container", и вложенные в него элементы списка с калссом "task-container__task-item task-item".
 * 
 * Через контекст принимает масив с объектом задач taskState, и из этого масива строятся элементы списка задач с классом "task-container__task-item task-item".
 * 
 * Каждый элемент списка отрисовывает компонент TaskItemList в который передается отдельный объект из масива объектов taskEdit
 * 
 * Родительский компонент TaskBody.
 * 
 * @returns 
 */
export const TaskContainer = () => {

	const {taskState} = useContextData()

	return (

		<div className="task-body__content-container">
			<ul className = "task-body__task-container task-container">
				{
					taskState && taskState.map(it => (
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