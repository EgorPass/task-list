import { FileConetnt } from "../fileContent/FileContent"
import { FileAddButton } from "../buttons/FileAddButton"

import "../../styles/file-container.scss"

/**
 * Компонент контейнер для создания раздела загрузки файлов в поле описания задачи.
 * 
 * Компонент отрисовывает компоненты FileContent и FileAddButton.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param0
 * @param {number | string} param.id id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {object | null} param.edit объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldFileContainer = ({id, files}) => {

		return (
		<div className="task-field__file-container file-container">	
				<FileConetnt files={files} id={id} />
				<FileAddButton id={id} />
		</div>
	)
}