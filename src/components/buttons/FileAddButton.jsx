import { memo } from "react";

/**
 * Создает мемоизированный компонент, кнопку добавления файла в раздел загрузки файлов в поле описания задачи.
 * 
 * @param {number | string} nextProp.id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtAddFile
 * @param {function} nextProp.clickAtAddFile обработчик для создания новой задачи
 * 
 * @returns 
 */
export const FileAddButton =
	memo(
	( { id, clickAtAddFile } ) => {
		
		// console.log( "//file add button render ...", id )

		return (
			<div className = "file-container__file-add-position">
				<label>
					<input
						onChange = {(e) => clickAtAddFile( id, e.target ) }
						name = "files"
						type = "file"
						className = 'file-container__file-add-input'
					/>
					<div
						className = "file-container__file-add"
						data-task-tooltip = "Прикрепить файл к задаче"
					>
						+
					</div>
				</label>
			</div>
		)
	}
)