import { useContextData } from "../../hooks/useContextData";

import { FieldTitleContainer } from "../fieldTitleContainter/FieldTitleContainter";
import { FieldDescriptionContainer } from "../fieldDescriptionContainer/FieldDescriptionContainer";
import { FieldDeadlineContainer } from "../fieldDeadlineContainer/FieldDeadlineContainer";
import { FieldButtonContainer } from "../fieldButtonContainer/FieldButtonContainer";
import { FieldCheckboxContainer } from "../fieldCheckboxContainer/FieldCheckboxContainer";
import { FieldFileContainer } from "../fieldFileContainer/FieldFileContainer";


/**
 * Компонент создает блок контейнер в виде модального окна с перекритием содержимого на экране прозрачным блоком и формирует поля описания задания из дочерних компонентов.
 * 
 * Через контекст принимает editState и createState, для передачи для дочерних компонентов.
 * 
 * Родительский компонент TaskBody.
 * 
 * @param {{task: object | null}} task выбранная задача по клику на заголовке списка. 
 * @returns 
 */
export const TaskItemField = ({task = null}) => {

	const { editState, createState } = useContextData()

	return (
		<div className="task-body__task-cover">
			<div className = "task-body__task-field task-field">
				
				<FieldTitleContainer {...task} edit={editState}	/> 
				<FieldDescriptionContainer {...task} edit={editState}	/>
				<FieldFileContainer {...task} edit = {editState} />
				<FieldDeadlineContainer	{...task}	edit={editState} />
				<FieldCheckboxContainer {...task} create={createState} />
				<FieldButtonContainer	{...task} edit={editState} />
				
			</div>		
		</div>
	)
}