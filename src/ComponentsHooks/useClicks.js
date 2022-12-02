import { deleteFileFromStorage, setFieldAtDatabase, getFilesFromDatabase } from "./useFirebase"
import { useFieldActions, useCreateActions, useTasksActions } from "../redux/reduxHooks/useBindActions" 
import { useGetStore} from "../redux/reduxHooks/useGetStore"

/**
 * Хук для обработки кликов по списку задач
 * 
 * @returns {object} Возвращает объект методов для функциональности кнопок списка задач, который передается в контекст MyContext,
 * который используется за счет хука useContextData.
 */
export function useClicks(cancelState) {
		
	const { setField } = useFieldActions();
	const { removeTask } = useTasksActions();
	const { setCreateState } = useCreateActions();
	const { tasks, field, createState, }= useGetStore()
	
	/**
	 * Вспомогательная функция, которая используется для создания объекта новой задачи, внутри функции createTask.
	 * 
	 * создает объект с индификатором, который генерирутся Date.now(),
	 * 
	 * @returns {object} возвращает объкет для создания новой задачи, типа taskState: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean }
	 */
	const createNewTask = () => {
		const id = Date.now();
		return {
			id,
			title: "Новая задача",
			description: "описание задачи",
			deadline: "2022-12-01",
			isComplite: false,
			files: {}
		}
	}

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
	const createTask = async () => {		
		const newTask = createNewTask()
		setFieldAtDatabase('/', newTask.id, newTask)
		setField(newTask)
		setCreateState(true)
	}

	
	/**
	 * Отктрывае поле с описанием и вложениями из списка задач, по индификатору.
	 * 
	 * Ставит field объект выбранной задачи по id.
	 * 
	 * Функция используется на onClikc заголовка в списке задач, в компоненте Title.
	 * 
	 * @param {number} id инфификатор задачи (обекта из массива taskState), которая откроется при клики 
	 */
	const clickAtTitle = (id) => {
		const task = tasks.find(it => it.id === id) 
		if (task) {
			setField(task)
		}
	}


	/**
	 * Изменение состояния выполнения задачи.
	 * 
	 * обновляет в realtimeDatabase только поле isComplite выбрвнной задачи.
	 * 
	 * Используется на onChange в input компонента Checkbox.
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState)
	 * @returns {void}
	 */
	const clickAtCheckbox = async (id) => {
		if (field) {
			setField({
				...field,
				isComplite: !field.isComplite
			})
		}
		else { 
			const task = tasks.find(it=> it.id === id)
			setFieldAtDatabase(`/${task.id}`, "isComplite", !task.isComplite)
		}
	}


	/**
	 * Закрывает поле с описанием задачи, которое на экране.
	 * 
	 * Ставит field в  null.
	 * и сохраняет изменения на realtimeDatabase
	 * 
	 * Функция используется на onClick кнопки "Закрыть".
	 */
	const clickAtCloseButton = (id) => {		
		if(createState) setCreateState(false)
		const task = tasks.find(it => it.id === id)
		
		for (let prop in task) {
				if (field[prop] !== task[prop]) {
					setFieldAtDatabase(`/${id}`, prop, field[prop] )
				}
			}
		
		setField(null)
	}


	/**
	 * Удаление задачи и закрытие поля описания задачи.
	 * 
	 * Функция удаляет задачу из tasks, а так же все зависимости связанные с ней,
	 * а имеено удаляются загруженные файлы в storageFirebase, файлы, которые загружаются в storageFirebad в момент нажатия кнопки "Удалить", и удаление описание задачи из RealTimeDatabase.
	 * 
	 * Обновляет realtimeDatabase, storageFirebase, field, tasks.
	 * 
	 * Для удаления из realtimeDatabase и storageFirebase состояние cancelState, которое передается верхнему хуку через аргумент.
	 * 
	 * Функция срабатывает на onClick, кнопки "Удалить", компоненты RemoveItemButton.
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState), описание которой открыто на экране.
	 * @return {void}
	 */
	const clickAtRemoveButton = async (id) => {
		if(createState) setCreateState(false)
		setField(null)
		
			const files = await getFilesFromDatabase(`${id}/files`)

			if (files) {
				for (let [name, value] of Object.entries(files)) {
					if (cancelState && (name in cancelState) && cancelState[name]._state === "running") {
						cancelState[name].cancel();
					}
					else {
						deleteFileFromStorage(`${id}/${name}/${value}`, value)
					}
				}
			}
			
		setFieldAtDatabase("/", id, null)		
		removeTask(id)
	}


	return {
				
		clickAtTitle,
		clickAtCheckbox,
		
		createTask,
		
		clickAtRemoveButton,
		clickAtCloseButton,

	}
}