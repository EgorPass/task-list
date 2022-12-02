import {  getFilesFromDatabase } from "./useFirebase"
import {useGetStore} from '../redux/reduxHooks/useGetStore.js'
import { useTasksActions, useFieldActions, useSearchActions } from "../redux/reduxHooks/useBindActions" 

 /**
	* Хук для обработки изменения полей описания списка задач
	* 
	* @returns {objects}  Возвращает объект методов для функциональности полей списка задач, который передается в контекст MyContext,
 * который используется за счет хука useContextData.
	*/
export const useEdit = () => {

	const { setField } = useFieldActions()
	const {  getTasks } = useTasksActions()
	const { field, tasks } = useGetStore()
	const { setSearchState } = useSearchActions();

	/**
	 * Функция изменяет поля в описании задач.
	 * 
	 * Обновляет состояние field.
	 * 
	 * Используется на onChange в textarea компонентов TaskDescription и Title
	 * 
	 * @param {string} prop свойство поля в которое вносяться изменения,  
	 * @param {string} str новое занчение для свойства field в editState и fieldState,
 	 */
	const changeEditState = (prop, str,) => {
		if (str === "" ) str = "    "
		if (str.endsWith("\n")) str += "    "
		
		setField({
			...field,
			[prop]: str
		})

	}

	/**
	 * Изменентие даты.
	 * 
	 * Обновляет field.
	 * 
	 * Используется на onChange в input компоненты DeadlineForTask
	 * 
	 * @param {nuber} id индификатор интересующей задачи из taskState, для редактирования даты
	 * @param {string} str дата из поля input
	 * @returns {void}
	 */
	const changeDate = async (str) => {		
		setField({
			...field,
			deadline: str,
		})
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

	/**
	 * Функция для поиска задач по набору букв, части слова или слова целиком
	 * в состоянии tasks.
	 * 
	 * фильтрует список задач из состояния tasks, по совпадению в заголовке задачи или описании задачи.
	 * 
	 * 
	 * @param {string} value сочетание букв, или слово в нижнем регистре для поиска в task 
	 * @returns {object} возвращает объект типа: тип: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean }
	 */
	const searchTask = async ( value) => {
		let newTasks = await getFilesFromDatabase("/")
		if (newTasks) {
			 newTasks = Object.values( newTasks )
			return newTasks
				.filter(it => { 
					const title = it.title ? it.title.toLowerCase() : "";
					const desc = it.description ? it.description.toLowerCase() : "";
					return title.includes(value) || desc.includes(value)
				})  || tasks
					
		}
	}


	/**
	 * Функция поиска задач по строке 
	 * 
	 * Функция используется в onChange поля input поисковой строки компоненты TaskHeader.
	 * 
	 * принимает строку для поиска, передает ее функции searchTask и устанвливает новое состояние для tasks
	 * 
	 * @param {string} str принимает строку из события onChange на поле поиска (в input)
	 */
	const changeSearch = async({target: {value}}) => {
		setSearchState(value)
		if (value && tasks) {
			
			new Promise(res => { 
				setTimeout(async () => {
					const tasks = await searchTask(value.toLowerCase()) 
					res(tasks)
				}, 150)
				
			})
			.then(tasks => getTasks(tasks) )

		}
	}

	return {
		// searchTask,
		changeDate,
		changeEditState,
		setModeForTitle,
		changeSearch,
	}
}