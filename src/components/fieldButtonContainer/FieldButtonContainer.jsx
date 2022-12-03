import { RemoveItemButton } from "../buttons/RemoveItemButton";
import { CloseItemButton } from "../buttons/CloseItemButton";

import "../../styles/button-container.scss"

/**
 * Компонент контейнер, создает блок с классом "task-field__button-container" для размещения кнопок закрытия и удаления.
 * 
 * Отрисовывает компоненты кнопок CloseItemButton, RemoveItemButton.
 * 
 * Отрисовывает группы кнопок (закрыть, изменить, удалить) или (сохранить, отменить) в зависимости от состояния пропса edit.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param0
 * @param { number | string } param.id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {object | null} param.edit объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldButtonContainer = ({ id }) => (
		<div	className="task-field__button-container button-container">
			<RemoveItemButton id={id} />
			<CloseItemButton id={id} />
		</div>
)