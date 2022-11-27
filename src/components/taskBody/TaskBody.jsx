import { useContextData } from "../../hooks/useContextData";

import { TaskHeader } from "../taskHeader/TaskHeader";
import { TaskContainer } from "../task-container/TaskContainer";
import { TaskItemField } from "../taskItemField/TaskItemField"


/**
 * Компонент отрисовывает блок контейнр в котором отрисовывается три основные блока из которых состоит список задач: TaskHeader, TaskContainer и TaskItemField.
 * 
 * TaskItemField отрисовывается только если заполнено одно из состояний fieldState, editState.
 *  
 * Родительский компонент App
 * 
 * @returns 
 */
export const TaskBody = () => {

	const { fieldState, editState  } = useContextData()

	
	return (
		<div className="task-body">
			<TaskHeader />
			<TaskContainer />
			
			{
				(fieldState || editState) && <TaskItemField task={fieldState} />
			}

		</div>

	)
}