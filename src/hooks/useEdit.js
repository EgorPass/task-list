import { useState } from "react"
import { setFieldAtDatabase, getFilesFromDatabase } from "./useFirebase"

export const useEdit = () => {

	const [editState, setEditState] = useState(null)
	
	/**
	 * Функция для использования в useContentState, внутри ее методов.
	 * 
	 * Обновляет editState
	 * 
	 * @param {object} obj: тип: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean }
	 */
	const setEdit = (obj) => {
		setEditState(prev => obj)
	}

	/**
	 * Функция изменяет поля в описании задач в режиме редактирования.
	 * 
	 * Обновляет editState.
	 * 
	 * Используется на onChange в input компоненты EditTextField
	 * 
	 * @param {string} field свойство поля в которое вносяться изменения,  
	 * @param {string} str новое занчение для свойства field в editState 
	 */
	const changeEditState = (field, str) => {	
		setEditState(prev => ({
			...prev,
			[field]: str
		}))
	}

	/**
	 * Изменентие даты.
	 * 
	 * Обновляет editState.
	 * 
	 * Используется на onChange в input компоненты EditDateField
	 * 
	 * @param {nuber} id индификатор интересующей задачи из taskState, для редактирования даты
	 * @param {string} str дата из поля input
	 * @returns {void}
	 */
	const changeDate = async (id, str) => {
		await setFieldAtDatabase(`${id}/`, "deadline", str)
		
		setEditState({
			...editState,
			deadline: str,
		})
	}

	/**
	 * Функция для поиска задач по набору букв, части слова или слова целиком
	 * в массиве объектов taskState.
	 * 
	 * @param {object[]} tasks каждый элемент масива имеет тпи: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean }
	 * @param {string} value сочетание букв, или слово для поиска в task 
	 * @returns {object} возвращает объект типа: тип: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean }
	 */
	const searchTask = (tasks, value) => {
		return tasks
			.filter(it => (
				it.title.includes(value) || it.description.includes(value))
			) || []
	}

	/**
	 * Функция устанавливает новые значения(prom) для задачи под id 
	 * и возвращает обновленный вариант.
	 * 
	 * Используется как вспомогательная.
	 * 
	 * для обновления задачи path ставим в "/"
	 * 
	 * @param {string} path путь для realtimeDatabase 
	 * @param {number | string} prpp свойство, по которому можно найти данные задачи, для задачи это id задачи
	 * @param {string | number | object | boolean | null} value парамтры для обновления
	 * @returns {object} возвращает масив объектов списка задач из realtimeDatabase для taskState
	 */
	const updateStateAndDatabase = async (path, prop, value) => {
							await setFieldAtDatabase(path, prop, value)		
			return  await getFilesFromDatabase(path)
	} 

	/**
	 * Функция возвращает строку - модификатор классов заголовков в списке задаи и поля описания задачи, для изменения вида заголовков.
	 * 
	 * Используется в FieldTitleContainer и TaskItemList
	 * 
	 * @param {number | string} deadline дата исполнения задачи 
	 * @param {boolean | string} isComplite  состояние выполнени яздачи, готова или нет
	 * @returns {string} строка модификатор для заголовков: - "complite", "un-complite", "deadmen"
	 */
	const setModeForTitle = (deadline, isComplite) => {
		const date = new Date(deadline)
		const today = new Date()
		const diff = date - today
		const state = diff < 0;
		
		return isComplite ? "complite" : state ? "deadmen" : "un-complite"

	}


	return {
		editState,
		setEdit,
		searchTask,
		changeDate,
		changeEditState,
		updateStateAndDatabase,
		setModeForTitle,
	}
}