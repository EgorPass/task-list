import { RemoveItemButton } from "../buttons/RemoveItemButton";
import { CloseItemButton } from "../buttons/CloseItemButton";
import { EditFieldButton } from "../buttons/EditFieldButton";
import { CancelEditButton } from "../buttons/CancelEditButton"
import { AcceptEditButton } from "../buttons/AcceptEditButton";

/**
 * Компонент контейнер, создает блок с классом "task-field__button-container" для размещения кнопок сохранения изменений, отмены изменений, закрытия, редактирования и удаления.
 * 
 * Отрисовывает компоненты кнопок AcceptEditButton, CancelEditButton, CloseItemButton, EditFieldButton, RemoveItemButton.
 * 
 * Отрисовывает группы кнопок (закрыть, изменить, удалить) или (сохранить, отменить) в зависимости от состояния пропса edit.
 * 
 * Если edit содержит null то отрисовывается CloseItemButton, EditFieldButton, RemoveItemButton иначе  AcceptEditButton и CancelEditButton.
 * 
 * Родительский компонент TaskItemField.
 * 
 * @param {object} param
 * @param { number | string } param.id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков,
 * @param {object | null} param.edit объект который содержит информацию для режима редактирования
 * @returns 
 */
export const FieldButtonContainer = ({ id, edit }) => (

		<div
			className="task-field__button-container">
			{
				!edit && (
					<>
						<RemoveItemButton id={id} />
						<EditFieldButton id={id} />
						<CloseItemButton id={id} />
					</>
				)}
				{
					edit && (
						<>
							<CancelEditButton id={id} />
							<AcceptEditButton id={id} />
						</>
					)}					
				</div>
)