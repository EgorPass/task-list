import { FileLoader } from "../fileLoader/FileLoader";
import { FileItem } from "../fileItem/FileItem";

/**
 * Компонент контейнер создает контейнер списка с калассом "task-field__file-list" для размещения списка загруженных файлов.
 * 
 * В пропсах принимает объект files и из него создает сиписок файлов.
 * 
 * Через контекст принимает clickAtFile, clickAtRemoveFile, loadState.
 * 
 * loadState использутеся для определения модификатора класса для кнопки удаления загруженного файла
 * 
 * Родительский компонент FieldFileContainer.
 * @param {object} param
 * @param {string | number} param.id индификатор задачи (обекта из массива taskState), использутся для обработки кликов в методами clickAtFile и clickAtRemoveFile,
 * @param {object} param.files объект с информацие по загруженным файлам к задаче
 * @returns 
 */
export const FileConetnt = ({id, files }) => {
	
	const entries = ( files && Object.entries(files) ) || []	

	return (
		<ul className="file-container__file-list" >
			{
				entries && entries.map( ([fileId, name]) => ( 

					<li
						key={`li$	${fileId}`}
						data-item = {fileId}
						className="file-container__file-item"
					>
						<FileLoader loaderId={fileId} id={id} />
						<FileItem id = {id} fileId = {fileId} name = {name} />
					</li>
					) 
				)
			}
		</ul>

	)
}