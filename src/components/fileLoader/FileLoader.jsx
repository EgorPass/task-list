import { useContextData } from "../../hooks/useContextData"


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

	const { loadState, clickAtCancelLoad } = useContextData()
	let progress = 0
	
	const state = loadState[loaderId] ? true : false
	
	if (!!state) {
		progress = loadState[loaderId]
	}

	if (loadState[loaderId] && progress < 100) return (
		<div className={`task-field__file-loader_visible`} data-loader={loaderId}>
			<div
				style={{ width: `${progress}%` }}
				className="task-field__file-loader-progress"
			></div>
			<span
				onClick = {()=> clickAtCancelLoad(id, loaderId)}
				className="task-field__file-loader-cancel_visible"
			>X</span>
		</div>
	)
	else return null;
}