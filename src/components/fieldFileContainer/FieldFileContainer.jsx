import { FileConetnt } from "../fileContent/FileContent"
import { FileAddButton } from "../fileAddButton/FileAddButton"

import "../../styles/file-container.scss"

/**
 * Компонент контейнер для создания раздела загрузки файлов в поле описания задачи.
 * 
 * Компонент отрисовывает компоненты FileContent и FileAddButton, только если состояния createState и editState выставлены в null.
 * То есть компонент не отрисовывается если поле описания задач в режиме редактирования или эта задача только создана.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param
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