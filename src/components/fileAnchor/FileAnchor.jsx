/**
 * отрисовывает на элементе списка задач скрепку, если у задачи есть вложенные файлы
 * 
 * @returns 
 */
export const FileAnchor = () => {
	return (
		<span
			data-task-tooltip = "Задача содержит прекрипленные файлы"
			className="task-item__file-anchor"
		>
			&#128206;
		</span>
	)
}