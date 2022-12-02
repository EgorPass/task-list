import { useContextData } from "../../ComponentsHooks/useContextData"
import { useGetStore } from "../../redux/reduxHooks/useGetStore"

/**
 * Компонент отрисовывает степень загрузки загружаемого файла
 * 
 * Компонент отрисовывается в случае если loaderId есть в loadState
 * По loadState[loaderId] заполняется ширина для уровня загрузки
 * 
 * Через конеткст принимает loadState, clickAtCancelLoad
 *  
 * Родительский компонент FileConetnt
 * 
 * @param {object} param 
 * @param {string | number} param.loaderId индификатор который присуждается при файлу при его создании
 * @param {string | number} param.id индификатор задачи (обекта из массива taskState), использутся для обработка clickAtCancelLoad
 * @returns 
 */
export const FileLoader = ({ loaderId , id}) => {

	const { clickAtCancelLoad } = useContextData()
	const { loadingFiles } = useGetStore();
	const state = (loaderId in loadingFiles)
	
	let progress = 0
	
	if (state) {
		progress = loadingFiles[loaderId].progress
	}

	if (state) return (
		<div className={`file-container__file-loader`} data-loader={loaderId}>
			<div
				style={{ width: `${progress}%` }}
				className="file-container__file-loader-progress"
			></div>
			<span
				onClick = {()=> clickAtCancelLoad(id, loaderId)}
				className="file-container__file-loader-cancel"
			>X</span>
		</div>
	)
	else return null;
}