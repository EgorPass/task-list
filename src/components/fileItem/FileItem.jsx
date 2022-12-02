import { useContextData } from "../../ComponentsHooks/useContextData"
import { useGetStore } from "../../redux/reduxHooks/useGetStore";

/**
 * компонент отрисовывает элемент списка загруженных файлов
 * 
 * через контест принимает clickAtFile, clickAtRemoveFile.
 * 
 * А так же использует store для взятия параметра loadingFiles для определения необходимости кнопки для удаления файла.
 * 
 * @param {object} param0
 * @param {string | number} param0.id индификатор задачи для обработчиков clickAtFile, clickAtRemoveFile
 * @param {string | number} param0.fileId парамтер для формирования уникального ключа для названия файла, который так же используется в обработчике clickAtRemoveFile
 * @param {string} param0.name название для файла, которое отображается в списке и так же передается в обработчик clickAtRemoveFile
 * @returns 
 */
export const FileItem = ({id, fileId, name}) => {

	const { clickAtFile, clickAtRemoveFile  } = useContextData();
	const { loadingFiles } = useGetStore();

	return (
		<>
			<span
					className = "file-container__file-name"
					onClick = {(e)=> clickAtFile(id, fileId, name)}
				>
					{name}
				</span>
				<span
					key={`span${id}`}
					className={
						`file-container__file-remove_${(
										fileId in loadingFiles ? "hidden": "visible"
					)}`}
					onClick = {(e)=> {clickAtRemoveFile(id, fileId, name)}}
			>
				X
			</span>
		</>
	)
}