import { FileRemove } from "../buttons/FileRemove";
import { FileName } from "../fileName/FileName";


/**
 * компонент отрисовывает элемент списка загруженных файлов за счет компонентов FileName - имя задачи, и FileRemove - кнопка удаления задачи
 * 
 * 
 * @param {object} param0
 * @param {string | number} param.id индификатор задачи для обработчиков clickAtFile, clickAtRemoveFile
 * @param {string | number} param.fileId парамтер для формирования уникального ключа для названия файла, который так же используется в обработчике clickAtRemoveFile
 * @param {string} param.name название для файла, которое отображается в списке и так же передается в обработчик clickAtRemoveFile
 * @returns 
 */
export const FileItem = ({id, fileId, name}) => {

	return (
		<>
			<FileName
				id={id} fileId={fileId} name={name}
			/>
			<FileRemove
				id={id} fileId={fileId} name={name}
			/>	
		</>
	)
}