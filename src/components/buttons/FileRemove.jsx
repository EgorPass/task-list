import { memo } from "react";

/**
 * Мемоизированный компонент рисует кнопу удаления файла в FileContent
 *  
 * @param {string | number } nextProp.id индификатор задачи для обработчика clickAtRemoveFile
 * @param {string | number } nextProp.fileId индификатор файла в хранилище для clickAtRemoveFile
 * @param {string } nextProp.name название файла в списке и хранилище для clickAtRemoveFile
 * @param {function} nextProp.clickAtRemoveFile обработчик для удаления файла из задачи
 *  
 * @returns 
 */
export const FileRemove = memo(
	( { id, fileId, name, clickAtRemoveFile } ) => {

		console.log("///file remove render ...")

		return (
			<div
				key = { `span${ id }` }
				className = {
					`file-container__file-remove`
				}
				onClick = {
					(e) => {
						clickAtRemoveFile( id, fileId, name )
					}
				}
				data-task-tooltip = {`Удалить ${ name }` }
			>
				X
			</div>
		)
	}
)