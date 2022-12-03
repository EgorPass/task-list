import { useContextData } from "../../ComponentsHooks/useContextData"
import { useGetStore } from "../../redux/reduxHooks/useGetStore";

/**
 * Компонент рисует кнопу удаления файла в компоненте FileItem
 * 
 * Для удаления используется обработчик клика clickAtRemoveFile, который передается через контектс
 * 
 * @param {objects} param0
 * @param {string | number } param.id индификатор задачи для обработчика clickAtRemoveFile
 * @param {string | number } param.fileId индификатор файла в хранилище для clickAtRemoveFile
 * @param {string } param.name название файла в хранилище для clickAtRemoveFile
 *  
 * @returns 
 */
export const FileRemove = ({ id, fileId, name }) => {

	const { clickAtRemoveFile  } = useContextData();
	const { loadingFiles } = useGetStore();

	return (
		<span
			key={`span${id}`}
			className={
					`file-container__file-remove_${(
									fileId in loadingFiles ? "hidden": "visible"
				)}`}
			onClick={
				(e) => {
					clickAtRemoveFile(id, fileId, name)
				}
			}
			data-task-tooltip ={`Удалить ${name}`}
		>
			X
		</span>
	)
}