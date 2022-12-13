import { FileLoader } from "../fileLoader/FileLoader";
import { FileRemove } from "../buttons/FileRemove";
import { FileName } from "../fileName/FileName";

/**
 * Компонент контейнер создает контейнер списка с калассом "task-field__file-list" для размещения списка загруженных файлов.
 * 
 * В пропсах принимает объект files и из него создает сиписок файлов.
 * 
 * К имени файла при загрузке отрисовывает FileLoader - уровень загрузки.
 * 
 * @param {object} param0
 * @param {string | number} param0.id 
 * @param {object | null} prop0.uploadFile
 * @param {object} prop0.files
 * @param {function} prop0.clickAtAddFile
 * @param {function} prop0.clickAtFile
 * @param {function} prop0.clickAtCancelLoad
 * @param {function} prop0.clickAtRemoveFile
 * 
 * @param id индификатор задачи (обекта из массива taskState), использутся для обработки кликов в методами clickAtFile и clickAtRemoveFile,
 * @param  prop0.uploadFile содержит информацию о файле для отгрузке (fileId и progress-уровень загрузки),
 * @param files объект содержащий список загруженных и загружаемых файлов к задаче,
 * @param clickAtAddFile обработчик добавления файла в список файлов для компонента FileAddButton
 * @param clickAtFile обработчик клика по файлу в списке фаойлов для компонента FileName в компоненте FileContent
 * @param clickAtCancelLoad обработчик отмены загрузки файла для компонента FileLoaderCancel в компоненте FileLoader
 * @param clickAtRemoveFile обработчик удвлени файла из списка файлов для компонента FileRemove в компоненте FileContent
 * @returns 
 */
export const FileConetnt =( {
			id,
			files,
			upload,
			clickAtFile,
			clickAtCancelLoad,
			clickAtRemoveFile,
	} ) => {
	
		// console.log("/file content render ....")

		const entries = (files && Object.entries(files)) || []	
						
		return (
			<ul className="file-container__file-list" >
				{
					entries && entries.map( ([fileId, name]) => ( 

						<li
							key={`li$	${fileId}`}
							data-item = {fileId}
							className="file-container__file-item"
						>
							{
								(upload && upload[fileId]) ?
									<FileLoader
										id = { id }
										name = { name }
										fileId = { fileId }
										progress = { upload[fileId].progress }
										clickAtCancelLoad = { clickAtCancelLoad }
									/>		
										:
									<>
										<FileName
											id={id}
											fileId={fileId}
											name={name}
											clickAtFile = { clickAtFile }
										/>
										<FileRemove
											id={id}
											fileId={fileId}
											name={name}	
											clickAtRemoveFile = { clickAtRemoveFile }			
										/>	
									</>
							}
						
						</li>
						) 
					)
				}
			</ul>
		)
	} 