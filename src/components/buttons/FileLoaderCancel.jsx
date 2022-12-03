import { useContextData } from "../../ComponentsHooks/useContextData"

/**
 * Компоненте рисует в FileLoader кнопку отмены загрузки
 * 
 * Для реализации отмены принимает clickAtCancelLoad через контекст
 * 
 * @param {object} param0
 * @param {string | number} param.id индификатор для обработчика клика clickAtCancelLoad
 * @param {string | number} param.liaderId инфификатор файла для хранилища
 * @returns 
 */
export const FileLoaderCancel = ({ id, loaderId }) => {
	
	const { clickAtCancelLoad } = useContextData()

	return (
		<span
			onClick = {()=> clickAtCancelLoad(id, loaderId)}
			className="file-container__file-loader-cancel"
			data-task-tooltip = {`Отменить загрузку`}
		>X</span>

	)
}