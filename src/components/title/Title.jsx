import { useContextData } from "../../hooks/useContextData"


/**
 * Создает элемент заголовка для названия задиня.
 * 
 * Родительские компоненты: FieldTitleContainer и TaskItemList.
 * 
 * Обрабатывает клик для открытия описания поля задачи.
 * 
 * Через контекст принимает clickAtTitle для обработки клика.
 * 
 * @param {object} param
 * @param {number | string} param.id индификатор задачи (обекта из массива taskState), использутся в обработчике clickAtTitle,
 * @param {string} param.title название задачи,
 * @param {string} param.className принимает динамически изменяемое название класса, из родительского компонента (модификатор класса зависит от состояния выоплнения задания, даты завершения задания и текущей даты)
 * @returns 
 */
export const Title = ({  id, title, className }) => {
	
	const { clickAtTitle } = useContextData()

	return (
		<pre
			className={className}
			onClick= {()=>clickAtTitle(id)}
		> {title}</pre>
	)
		
}
