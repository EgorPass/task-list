import { useContextData } from "../../hooks/useContextData"

/**
 * Создает кнопку добавления файла в раздел загрузки файлов о поле описания задачи.
 * 
 * Через контекст принимает clickAtAddFile для обработки клика.
 * 
 * Родительский компонент FieldFileContainer.
 * 
 * @param {{id:number | string}} id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtAddFile 
 * @returns 
 */
export const FileAddButton = ({ id }) => {

	const {clickAtAddFile} = useContextData()

	return (
		<div className="task-field__file-add-position">
			<label
				// className="task-field__file-add"
			>
				<input
					onChange = {(e)=> clickAtAddFile(id, e.target)}
					name = "files"
					type="file"
					className = 'task-field__file-add-input'
				/>
				<div className="task-field__file-add">
				 +
				</div>
			</label>
		</div>
	)
}