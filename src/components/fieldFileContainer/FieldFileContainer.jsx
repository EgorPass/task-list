import { memo } from "react"
import { FileConetnt } from "../fileContent/FileContent"
import { FileAddButton } from "../buttons/FileAddButton"
import "../../styles/file-container.scss"


/**
 * Мемоизированный компонент контейнер для создания раздела загрузки файлов в поле описания задачи.
 * 
 * Компонент отрисовывает компоненты FileContent (список фалов) и мемоизированный компонент FileAddButton кнопка подгрузки файла.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {number | string} nextProp.id id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {object | null} nextProp.uploadFile содержит информацию о файле для отгрузке (fileId и progress-уровень загрузки),
 * @param {object} nextProp.files объект содержащий список загруженных и загружаемых файлов к задаче,
 * @param {function} nextProp.clickAtAddFile обработчик добавления файла для компонента FileAddButton
 * @param {function} nextProp.clickAtFile обработчик клика по названию файла для компонента FileName в компоненте FileContent
 * @param {function} nextProp.clickAtCancelLoad обработчик отмены загрузки файла для компонента FileLoaderCancel в компоненте FileLoader
 * @param {function} nextProp.clickAtRemoveFile обработчик удаления файла из списка файлов для компонента FileRemove в компоненте FileContent
 * @returns 
 */
export const FieldFileContainer =	memo(
	({id, upload, clickAtAddFile, files, clickAtFile, clickAtCancelLoad, clickAtRemoveFile, }) => {

		console.log("file field render...")

		return (
			<div className="task-field__file-container file-container">	
					<FileConetnt
						id = {id }
						files = {files}
						upload = { upload }
						clickAtFile = { clickAtFile }
						clickAtCancelLoad = { clickAtCancelLoad }
						clickAtRemoveFile = { clickAtRemoveFile }

					/>
					<FileAddButton
						id = { id }
						clickAtAddFile = { clickAtAddFile }
					/>
			</div>
		)
	}
	
)