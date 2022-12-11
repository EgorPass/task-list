
import { useGetStore } from "../../redux/reduxHooks/useGetStore";

import { useTaskHeaderContext, useEditContext, useTaskItemListContext, useTaskItemFieldContext,   } from "../../ComponentsHooks/useContextData";


import { TaskHeader } from "../taskHeader/TaskHeader";
import { TaskItemList } from "../taskItemList/TaskItemList";
import { TaskItemField } from "../taskItemField/TaskItemField"

import "../../styles/task-body.scss"

/**
 * Мемоизированный компонент отрисовывает блок контейнр в котором отрисовывается три основные блока из которых состоит список задач: TaskHeader, TaskContainer и TaskItemField.
 * 
 * TaskItemField отрисовывается только если заполнено состояние field.
 *  
 * field принимает через пропсы, пропса не изменилась, берем из кэша
 *  
 * @returns 
 */
export const TaskBody = () => {
		
	console.log("task body render ...")

	const { search, loader, tasks, fieldState, textField, taskFile, uploadFile } = useGetStore()
	
	const { setModeForTitle } = useEditContext();
	const { changeSearch, createTask } = useTaskHeaderContext()
	const { clickAtTitle, clickAtCheckboxTitle } = useTaskItemListContext()
	const {
					clickAtCheckboxField,			clickAtCloseButton,
					clickAtRemoveButton,			changeTitle,
					changeDescription,				changeDate,
								
					clickAtFile,							clickAtAddFile,
					clickAtRemoveFile,				clickAtCancelLoad,

					uploadTaskRef
					} = useTaskItemFieldContext()

	return (
		<div className = "task-body">
			<TaskHeader
				search = { search }
				changeSearch = { changeSearch }
				createTask = { createTask }
			/>

			<TaskItemList
				tasks = { tasks }
				loader = { loader }
				setModeForTitle = { setModeForTitle }
				clickAtTitle = { clickAtTitle }
				clickAtCheckboxTitle = { clickAtCheckboxTitle }	
			/>
			
			{
				fieldState.openField && (
				<TaskItemField
					textField = { textField }
					fieldState = { fieldState }
					taskFile = { taskFile }
					uploadFile = { uploadFile }
					uploadTaskRef = { uploadTaskRef }
					
					clickAtCheckboxField = { clickAtCheckboxField }
					clickAtCloseButton = { clickAtCloseButton }
					clickAtRemoveButton = { clickAtRemoveButton }
					changeTitle = { changeTitle }
					changeDescription = { changeDescription }
					changeDate = { changeDate }
								
					clickAtFile = { clickAtFile }
					clickAtAddFile = { clickAtAddFile }
					clickAtRemoveFile = { clickAtRemoveFile }
					clickAtCancelLoad = { clickAtCancelLoad }
					setModeForTitle = { setModeForTitle }
				/>
				)
			}

		</div>
	)
}
