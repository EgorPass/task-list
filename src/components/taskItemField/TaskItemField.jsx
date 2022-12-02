import { useContextData } from "../../ComponentsHooks/useContextData";

import { FieldTitleContainer } from "../fieldTitleContainter/FieldTitleContainter";
import { FieldDescriptionContainer } from "../fieldDescriptionContainer/FieldDescriptionContainer";
import { FieldDeadlineContainer } from "../fieldDeadlineContainer/FieldDeadlineContainer";
import { FieldButtonContainer } from "../fieldButtonContainer/FieldButtonContainer";
import { FieldCheckboxContainer } from "../fieldCheckboxContainer/FieldCheckboxContainer";
import { FieldFileContainer } from "../fieldFileContainer/FieldFileContainer";

import '../../styles/task-field.scss';

/**
 * Компонент создает блок контейнер в виде модального окна с перекритием содержимого на экране прозрачным блоком и формирует поля описания задания из дочерних компонентов.
 * 
 * Через контекст принимает состояния field и createState, для передачи для дочерних компонентов.
 * 
 * Родительский компонент TaskBody.
 * 
 * @param {{task: object | null}} task выбранная задача по клику на заголовке списка. 
 * @returns 
 */
export const TaskItemField = ({task = null}) => {

	const { createState, field } = useContextData()

	return (
		<div className="task-body__task-cover">
			<div className = "task-body__task-field task-field">
				
				<FieldTitleContainer {...task} edit={field}	/> 
				<FieldDescriptionContainer {...task} edit={field}	/>
				<FieldFileContainer {...task} edit = {field} />
				<FieldDeadlineContainer	{...task}	edit={field} />
				<FieldCheckboxContainer {...task} create={createState} />
				<FieldButtonContainer	{...task} edit={field} />
				
			</div>		
		</div>
	)
}