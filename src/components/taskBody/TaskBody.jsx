import { useContextData } from "../../ComponentsHooks/useContextData";

import { TaskHeader } from "../taskHeader/TaskHeader";
import { TaskContainer } from "../task-container/TaskContainer";
import { TaskItemField } from "../taskItemField/TaskItemField"

import "../../styles/task-body.scss"

/**
 * Компонент отрисовывает блок контейнр в котором отрисовывается три основные блока из которых состоит список задач: TaskHeader, TaskContainer и TaskItemField.
 * 
 * TaskItemField отрисовывается только если заполнено состояние field.
 *  
 * field принимает через контекст
 * 
 * Родительский компонент App
 * 
 * @returns 
 */
export const TaskBody = () => {

	const { field  } = useContextData()

	return (
		<div className="task-body">
			<TaskHeader />
			<TaskContainer />
			
			{
				(field) && <TaskItemField task={field} />
			}
			
			

		</div>

	)
}