
/**
 * Компонент отрисовывает описание задачи в поле описания задачи
 * 
 * Родительский компонент FieldDescriptionContainer
 * 
 * @param {{description: string}} description описание задачи 
 * @returns 
 */
export const TaskDescription = ({ description }) => (
	<pre className = "task-field__description">
		{description}
	</pre>
)
