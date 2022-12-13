/**
 * Компонент рисует редактируемую часть тестовых полей в описании задачи.
 * 
 * Не мемоизируем, мемоизацию создают родители.
 * 
 * Используется в компонентах FieldTitleContainer и FieldDescriptionContainer
 * 
 * Для изменения тесктового поля используется контролируемый textarea с обраотчиком onchange и состоянием feild
 * 
 * @param {object} param0
 * @param {string} param0.className 
 * @param {string} param0.content 
 * @param {string} param0.onchange 
 * 
 * @param className - для определения класса для поля, для заголовка передается с модификатором,
 * @param content содержимое для элемента,
 * @param onchange обработчик для изменения содержимого textarea 
 * @returns 
 */
export const EditableTextField = ( { className, content, onchange, } ) => {

	// console.log( "/editableTextField render..." )

	return (		
		<textarea
			value = { content }
			className = { className }
			onChange = { onchange }
		></textarea>
	)
}