import { memo } from "react";
/**
 * Мемоизированный компонент отрисовывает в списке файлов название файлов.
 * 
 * Если компонент отрисовывается в FileLoader принимает отрибуты по умолчанию, числовые атрибуты ставяться в 0, а строковые в пустую строку.
 * 
 * По клику на сформированном элементе, начинается загрузка файла, за счет обработчика клика clickAtFile.
 * 
 * @param {string | number } nextProp.id индификатор задачи для обработчика clickAtFile,
 * @param {string | number } nextProp.fileId индификатор файла в хранилище для clickAtFile,
 * @param {string } nextProp.name название файла в хранилище для clickAtFile,
 * @param {function} nextProp.clickAtFile обработчик загрузки файла.
 * @returns 
 */
export const FileName = memo(
	( { id = 0, fileId = 0, name = "", clickAtFile = () => { } }) => {

		console.log("///file name render ....")

		return (
			<div
				className = "file-container__file-name"
				onClick = {(e)=> clickAtFile(id, fileId, name)}
			>
				<span>
					{name}
				</span>
			</div>
		)
	}
)