import { useCallback } from "react";

import { useSearchActions, useTasksActions, useFieldStateActions, useTextFieldActions} from "../redux/reduxHooks/useBindActions";
import { useFirebase } from "./useFirebase";
import { useGetStore } from "../redux/reduxHooks/useGetStore";
import { useTaskItemField } from "./useTaskItemField.js";


/**
 * 
 * @returns {object} методы для интерфейса TaskHeader: 	changeSearch,
		createTask
 */
export function useTaskHeadr(  ) {
	
	
	const { search, textField, fieldState } = useGetStore();
	const { getTasks } = useTasksActions();
	const { setSearch } = useSearchActions();
	const { newTextField } = useTextFieldActions();
	const { clickAtCloseButton } = useTaskItemField()

	const { setFieldAtDatabase, getFilesFromDatabase } = useFirebase();
	const { setNewFieldState } = useFieldStateActions();

	/**
	 * Вспомогательная функция, которая используется для создания объекта новой задачи, внутри функции createTask.
	 * 
	 * создает объект с индификатором, который генерирутся Date.now(),
	 * 
	 * @returns {object} возвращает объкет для создания новой задачи, типа taskState: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean }
	 */
	const createNewTask = useCallback(
		() => {
			const id = Date.now();
			return {
				id,
				title: "Новая задача",
				description: "описание задачи",
				deadline: "2023-02-05",
				isComplite: false,
				files: {}
			}
		}
	, [])

	/**
	 * Создает и открывает новую задачу, 
	 * Загружает новую задачу на RealTimeDatabase.
	 * 
	 * состоянию field ставит вновь созданный объект, сразу открыватеся поле описаня задач, для её создания
	 * 
	 * состояние createState ставит в true
	 * 
	 * Используется на onClick кнопки создания задачи компоненты TaskHeader.
	 * @returns {void}
	 */
	const createTask = useCallback(
		async () => {		

			if (fieldState.openField) {
				clickAtCloseButton(textField.id)
			}

			const newTask = createNewTask()
			setFieldAtDatabase( '/', newTask.id, newTask )

			setNewFieldState()
			newTextField( newTask )
		}
	, [textField, fieldState])

	/**
	 * Вспомогательная функция для обрабтчика ввода в поисковую строку changeSearct
	 * 
	 * ищет в realtimeDatabase по частичному совпадению в словах названия и описания задачи
	 * 
	 * @param {string} value строка для поиска в задачах
	 * @returns {Array} массив с результом поиска, если ни чего возращает полный список задач
	 */

	const searchTask = useCallback(
		async ( value ) => {
			const newTasks = await getFilesFromDatabase( '/' )
			const tasks = Object.values( newTasks )

				const find = tasks.filter( it => { 
					const title = it.title ? it.title.toLowerCase() : "";
					const desc = it.description ? it.description.toLowerCase() : "";
					
						return title.includes( value ) || desc.includes( value )
				})  || []
													
			return find.length > 0 ? find : tasks;
		}
	, [])

	/**
	 * делает input управляемым и создает поиск по совпадению вводимой строки
	 * 
	 * результат выводи через 200ms после первого нажатия клавиши
	 * 
	 * @param {string} value параметр берется из события изменения input
	 */
	const changeSearch = useCallback(
		({ target: { value } }) => {
			
			if (fieldState.openField) {
				clickAtCloseButton(textField.id)
			}

			setSearch(value)
			
			new Promise( res => {			
				setTimeout( async () => {
					const newTasks = await searchTask( value.toLowerCase() )
					res( newTasks )
				}, 200)

			} )
			.then( res => getTasks( res ) )
		}
	, [ search, textField, fieldState ] )

	return {
		changeSearch,
		createTask
	}
}