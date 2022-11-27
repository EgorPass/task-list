import { TaskDescription } from "../taskDescription/TaskDescription";
import { EditTextField } from "../editTextField/EditTextField";

/**
 * Компонент создает элемент описания задачи.
 * 
 * Компонент отрисовывает только один из компонентов TaskDescription или EditTextField, в зависимости от состояния edit, если edit содержит null, то TaskDescription иначе EditTextField. 
 * 
 * @param {object} param
 * @param {string} param.description описание задачи из объекта массива taskState,
 * @param {object | null} param.edit объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldDescriptionContainer = ({description, edit }) => (
	<div className="task-field__descriptio-container">
		{
			!edit &&	<TaskDescription 
									description={description} 
								/>  
		}
		{
			edit &&	<EditTextField
								field="description"
								className="task-field__edit-field task-field__edit-field_description"
							/>
		}			
	</div>
) 