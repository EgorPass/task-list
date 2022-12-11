import { useCallback } from "react";

 /**
	* Вспомогательный хук для рзных функций
	* 
	* содержит:
	* 
	* setModeForTitle - задание модификатора для стиля заголовков задач
	*
	*
	* @returns {objects}  Возвращает объект методов для функциональности полей списка задач, который передается в контекст EditContext: setModeForTitle.
	*/
export const useEdit = () => {

	/**
	 * Функция возвращает строку - модификатор классов заголовков в списке задаи и поля описания задачи, для изменения вида заголовков.
	 * 
	 * Используется в FieldTitleContainer и TaskItemList
	 * 
	 * @param {number | string} deadline дата исполнения задачи 
	 * @param {boolean | string} isComplite  состояние выполнени яздачи, готова или нет
	 * @returns {string} строка модификатор для заголовков: - "complite", "un-complite", "deadmen"
	 */
	const setModeForTitle = useCallback(
		( deadline, isComplite ) => {
			const date = new Date( deadline )
			const today = new Date()
			const diff = date - today
			const state = diff < 0;
			
			return isComplite ? "complite" : state ? "deadmen" : "un-complite"
		}
	, [] )

	return {
		setModeForTitle,
	}
}