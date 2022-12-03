import { useGetStore } from "../../redux/reduxHooks/useGetStore"

import { FileLoaderCancel } from "../buttons/FileLoaderCancel"

import { FileLoaderProgress } from "../fileLoaderProgress/FileLoaderProgress";

/**
 * Компонент отрисовывает степень загрузки загружаемого файла
 * 
 * Компонент отрисовывается в случае если loaderId есть в loadingFiles
 * По loadingFiles[loaderId] заполняется ширина для уровня загрузки
 * 
 * Через конеткст принимает loadingFiles, clickAtCancelLoad
 *  
 * Родительский компонент FileConetnt
 * 
 * @param {object} param0
 * @param {string | number} param.loaderId индификатор который присуждается при файлу при его создании
 * @param {string | number} param.id индификатор задачи (обекта из массива taskState), использутся для обработка clickAtCancelLoad
 * @returns 
 */
export const FileLoader = ({ loaderId , id}) => {

	const { loadingFiles } = useGetStore();
	const state = (loaderId in loadingFiles)
	
	let progress = 0
	
	if (state) {
		progress = loadingFiles[loaderId].progress
	}

	if (state) return (
		<div className={`file-container__file-loader`} data-loader={loaderId}>

			<FileLoaderProgress progress = {progress} />
			<FileLoaderCancel id={id} loaderId={loaderId} />
			
		</div>
	)
	else return null;
}