
/**
 * Компоненте рисует в FileLoader кнопку отмены загрузки
 * 
 * Не мемоизируем, зависит от сотостояния uploadFile, которое постоянно обновляется при загрузке файла.
 * 
 * @param {object} param0
 * @param {string | number} param0.id 
 * @param {string | number} param0.liaderId 
 * @param {function} param0.clickAtCancelLoad
 * 
 * @param id индификатор для обработчика клика clickAtCancelLoad
 * @param liaderId инфификатор файла в хранилище
 * @param clickAtCancelLoad обработчик для отмены загрузки 
 * @returns 
 */
export const FileLoaderCancel =	( { id, fileId, clickAtCancelLoad } ) => {

	console.log( "///file cancel render ..." )

	return (
		<div
			onClick = { () => clickAtCancelLoad( id, fileId ) }
			className = "file-container__file-loader-cancel"
			data-task-tooltip = "Отменить загрузку"
		>X</div>

	)
}