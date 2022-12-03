import { useContextData } from "../../ComponentsHooks/useContextData"

/**
 * Компонент отрисовывает в списке файлов название файлов.
 * 
 * По клику на сформированном элементе, начинается загрузка файла, за счет обработчика клика clickAtFile.
 * 
 * @param {*} param0 
 * @param {string | number } id индификатор задачи для обработчика clickAtFile
 * @param {string | number } fileId индификатор файла в хранилище для clickAtFile
 * @param {string } name название файла в хранилище для clickAtFile
 * @returns 
 */
export const FileName = ({ id, fileId, name }) => {
	const { clickAtFile  } = useContextData();
	
	return (
		<span
			className = "file-container__file-name"
			onClick = {(e)=> clickAtFile(id, fileId, name)}
		>
			{name}
		</span>
	)
}