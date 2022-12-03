/**
 * Компанент рисует процесс загрузки в компоненте FileLoader
 * 
 * @param {object} param0
 * @param {string | number} param.progress числовое значение (может быть в строке) от 0 до 100, для стиля контейнра, который рисует полосу завершенности загрузки 
 * @returns 
 */
export const FileLoaderProgress = ({ progress }) => {
	
	return (
		<div
			style={{ width: `${progress}%` }}
			className="file-container__file-loader-progress"
		></div>

	)
}