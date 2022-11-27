import { useContextData } from "../../hooks/useContextData";
import { FileLoader } from "../fileLoader/FileLoader";

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
	
	const { clickAtFile, clickAtRemoveFile, fileContainerRef, loadState,  } = useContextData();

	const entries = ( files && Object.entries(files) ) || []
	

	return (
		<ul className="task-field__file-list" ref = {fileContainerRef}>
			{
				entries && entries.map( ([fileId, name]) => ( 

					<li
						key={`li$	${fileId}`}
						data-item = {fileId}
						className="task-field__file-item"
					>
							<span
								className = "task-field__file-name"
								onClick = {(e)=> clickAtFile(id, fileId, name)}
							>
								{name}
							</span>
							<span
								key={`span${id}`}
							className={`task-field__file-remove_${(
								loadState[fileId] && loadState[fileId] < 100 ? "hidden": "visible"
							)}`}
								onClick = {(e)=> {clickAtRemoveFile(id, fileId, name)}}
						>X</span>
						
						<FileLoader loaderId={fileId} id={id} />
					</li>
					) 
				)
			}
		</ul>

	)
}