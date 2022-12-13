import { memo } from "react";

/**
 * Мемоизированный компонент создает элемент кнопки удаения задачи, которая отрисовывается в компоненте FieldButtonContainer.
 * 
 * @param {number | string} nextParam.id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtRemoveButton
 * @param {function} nextParam.clickAtRemoveButton обработчик для удаления задачи
 * @returns
 */
export const RemoveItemButton = memo(
		( { id, clickAtRemoveButton } ) => {

		// console.log( "/remove button render ...." )

		return (
			<button
				onClick = { (e) => { clickAtRemoveButton( id ) } }
				className = "button-container__item-button"
			>
				Удалить
			</button>
	)
	} 
)