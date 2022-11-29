import {  useState } from "react"
import { deleteFileFromStorage, uploadFileToStorage, setFieldAtDatabase, getFilesFromDatabase, downlaodFileFromStorage } from "./useFirebase"

import { useEdit } from "./useEdit"


/**
 * @returns {object} Возвращает объект методов для функциональности кнопок списка задач, который передается в контекст MyContext,
 * который используется за счет хука useContextData.
 */
export function useContentState() {
	
	const [taskState, setTaskState] = useState(null)	
	const [createState, setCreateState] = useState(null)
	const [fieldState, setFieldState] = useState(null)
	const [search, setSearchState] = useState("")
	const [loadState, setLoadState] = useState({});
	const [cancelState, setCancelState] = useState(null)
	
	const {
		editState,
		setEdit,
		searchTask,
		changeDate,
		changeEditState,
		updateStateAndDatabase,
		setModeForTitle
	} = useEdit();


	/**
	 * Для поиска конкретной задачи в масиве объектов taskState.
	 * Используется как вспомогательная внутри функций.
	 * 
	 * @param {number} id индификатор для поиска задачи в taskState
	 * @returns {object} возвращает объект для taskState,
	 * тип: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean } 
	 */
	const findTask = (id) => taskState.find((it) => it.id === id)
	

	/**
	 * для установления полей стейтов editState и createState,
	 * при создании новой задачи.
	 * За счет, чего задача сразу открывается в режиме редактирования.
	 * 
	 * Для editState ставиться объект с задачей, переданной в пропс.
	 * 
	 * Для createState ставиться в true.
	 * 
	 * используется внутри функции createTask
	 * 
	 * @param {object} newTask - принимает объект типа: { id: number, title: string, description: string, deadline: Date,	isComplite: boolean } 
	 */
	const openNewField = (newTask) => {
		setFieldState(newTask)
		setCreateState(true)
		setEdit(newTask)

	}


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
		}
	}


	/**
	 * Для обновления видимого поля выбранной задачи.
	 * Обновляет fieldState.
	 * 
	 * Используется для исключения повторов кода, при работе с добавлением или удалением файлов в поле загрузках задачи или отмены загрузки файла (clickAtRemoveFile, clickAtAddFile, clickAtCancelLoad).
	 * 
	 * @param {number} id индификатор интересующей задачи из taskState,
	 * @param {string} prop поле задачи,
	 * @param {string | number | object | boolean} value значения поля задачи. 
	 */
	const updateFieldState = (id, prop, value) => {
		const task = findTask(id)
		setFieldState({...task, [prop]: value})
	}


	/**
	 * Создает и открывает новую задачу, 
	 * Загружает новую задачу на RealTimeDatabase.
	 * 
	 * createState ставит в true
	 * 
	 * editState ставит объект вновь созданной задчи.
	 * 
	 * Используется на onClick кнопки создания задачи компоненты TaskHeader.
	 * @returns {void}
	 */
	const createTask = async () => {		
		const newTask = createNewTask()
		await setFieldAtDatabase("/", newTask.id, newTask)		
		openNewField(newTask)
	}


	/**
	 * Отктрывае поле с описанием и вложениями из списка задач, по индификатору.
	 * 
	 * Ставит в fieldState объект выбранной задачи по id.
	 * 
	 * Функция используется на onClikc заголовка в списке задач, в компоненте Title.
	 * 
	 * @param {number} id инфификатор задачи (обекта из массива taskState), которая откроется при клики 
	 */
	const clickAtTitle = (id) => {
		const tasks = findTask(id)
		if (tasks) {
			setFieldState(tasks)
		} 
	}


	/**
	 * Закрывает поле с описанием задачи, которое на экране.
	 * 
	 * Ставит fieldState  в  null.
	 * 
	 * Функция используется на onClick кнопки "Закрыть".
	 */
	const clickAtCloseButton = () => {
		setFieldState(null)
	}


	/**
	 * Удаление задачи и закрытие поля описания задачи.
	 * 
	 * Функция удаляет задачу из taskState, а так же все зависимости связанные с ней,
	 * а имеено удаляются загруженные файлы в storageFirebase, файлы, которые загружаются в storageFirebad в момент нажатия кнопки "Удалить", и удаление описание задачи из RealTimeDatabase.
	 * 
	 * Обновляет realtimeDatabase, storageFirebase, fieldState, taskState.
	 * 
	 * Для удаления из realtimeDatabase и storageFirebase состояние cancelState.
	 * 
	 * Функция срабатывает на onClшck, кнопки "Удалить", компоненты RemoveItemButton.
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState), описание которой открыто на экране.
	 * @return {void}
	 */
	const clickAtRemoveButton = async (id) => {
		setFieldState(prev => null);
		
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
		
		let tasks = await updateStateAndDatabase('/', id, null)
		setTaskState( ( (tasks && Object.values(tasks)) || []) )
	}


	/**
	 * функция включает режим редактирования открытого поля описания задачи.
	 * 
	 * Ставит объект для editState.
	 * 
	 * использется на onClick компонента EditFieldButton, кнопка "Изменить".
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState) для редактирования открытого поля описания задачи.
	 * @returns {void}
	 */
	const clickAtEditButton = (id) => {
		const task = findTask(id)
		if (task) {
			setEdit(task);
		}
	}


	/**
	 * Удаление загруженного файла в поле описания задачи.
	 * 
	 * Обновляет fieldState, realtimeDataBase, storageFirebase
	 * удаляет из трех сущностей.
	 * 
	 * Используется на onClick эмитации кнопки (тэг span) в компоненте FileConetnt.
	 * 
	 * @param {number} id индификатор задачи (объекта массива taskState),
	 * @param {string} fileId индификатор поля файла для удаления,
	 * @param {string} name названия файла для удаления
	 * @returns {void}
	 */
	const clickAtRemoveFile = async (id, fileId, name) => {
		const files = await updateStateAndDatabase(`${id}/files/`, fileId, null)

			updateFieldState(id, "files", files)
			deleteFileFromStorage(`${id}/${fileId}/${name}`, name)
	}


	/**
	 * Отменяет внесенные изменения в режиме редактирования поля описания задачи.
	 * 
	 * Если функция запущена на задачи которая вновь создана, то задача не сохраняется в taskState, то есть удаляется.
	 * 
	 * Обновляет сотсояния taskState, fieldState а createState ставить в false.
	 * 
	 * Использутеся на onClick компонента CancelEditButton, кнопка "Отменить".
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState) поле описания, которай находиться в режиме редатирования,
	 * @returns {void}
	 */
	const clickAtCancelButton = async (id) => {
		setEdit(null);

		if (createState) {
			setFieldState(null)
			setCreateState(false)
			let tasks = await updateStateAndDatabase("/", editState.id, null)
			setTaskState(((tasks && Object.values(tasks)) || []))
		}

		else if (fieldState) {
			setFieldState(taskState.find(it => it.id === id) )
		} 
	}


	/**
	 * Сохраняет изменения внесенные в поле описания задачи, которая в режиме редактирования. Возвращает в поле описания задачи.
	 * 
	 * createState ставит в false.
	 * 
	 * Обновляет состояния: editState , fieldState, realtimeDatabase.
	 * 
	 * Используюется на onClick компонента AcceptEditButton, кнопка "Сохранить".
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState), который открыт в режиме редактирования 
	 * @returns {void}
	 */
	const clickAtAcceptButton = async (id) => {
		if (editState.title.length < 3) return

		console.log(editState.title)

			setFieldAtDatabase("/", editState.id, editState)
			setFieldState(editState)
			setEdit(null);

		if (createState) { 
			setCreateState(false);
		}
	}


	/**
	 * Добавление фала к задаче, в поле описания задачи.
	 * 
	 * Обновляет realtimeDatabase, storageFirebase, cancelState, loadState .
	 * 
	 * Примис от uploadBytesResumable заноситься в cancelState для отмены загрузки,
	 * при удалении задачи, или возможности отменить загрузку после закрытия поля описания задчи.
	 * 
	 * В обрабтчике примиса от uploadBytesResumable для loadState ставиться прогресс загрузки для каждого загружаемого файла.
	 * 
	 * Используется на onClick эмитации кнопки (тэг input[type ='file']) компоненты FileAddButton.
	 * 
	 * @param {number} id инфификаотр задачи (объекта массива taskState), к которой загружаем файл,
	 * @param {object} target объект события input[type='file'] для забора файла который выбрали,
	 * @returns {void} 
	 */
	const clickAtAddFile = async (id, target) => {
		if (!target) return;
		
		const files = target.files
			if (!files) return 
		
		Array.from(files).forEach(async (file) => {

			const name = file.name;
			const nameForFile = Date.now();
			const fileForTask = await updateStateAndDatabase(`${id}/files/`, nameForFile, name)

			updateFieldState(id, "files", fileForTask)
			setLoadState(prev => ({
				...prev,
					[nameForFile]: 1
			}))

			const uploadTask = uploadFileToStorage(`${id}/${nameForFile}/${name}`, file);

			setCancelState(prev => ({
				...prev,
				[nameForFile]: uploadTask
			}))

			uploadTask
				.on("state_changed", async (snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setLoadState(prev => ({
							...prev,
								[nameForFile]: progress
					}))			
				})		
		})
	}


	/**
	 * По клику на название в списке прикрепленных файлов, функция направит по ссылке,
	 * которую сформирует из пути до storageFirebase + "id/fileId/name".
	 * 
	 * Для загрузки откроется новое окно.
	 * 
	 * Используется на onClick эмуляции ссылки (строчный элемент) на компоненте FileConetnt.
	 * 
	 * @param {number} id индификатор задачи в которой находиться файл,
	 * @param {string | number} fileId поле (контейнер) для хранения файла,
	 * @param {string} name название файла
	 * @returns {void}
	 */
	const clickAtFile = async (id, fileId, name) => {
		downlaodFileFromStorage(`${id}/${fileId}/${name}`, name)
	}


	/**
	 * Отмена загузки файла к задаче (в описание задачи).
	 * 
	 * Для отмены использует примис от uploadBytesResumable (функция для загрузки на storageFirebase), который содержиться в состоянии cancelState.
	 * 
	 * Обновляет состояние fieldState, realtimeDatabase.
	 * 
	 * Используется на onClick эмуляции кнопки (тэг span) компоненты FileLoader.
	 * 
	 * @param {number} id индификатор задачи в которой поставили загрузку файла,
	 * @param {string | number} fileId поле (контейнер) для хранения файла,
	 * @param {string | null} name название файла
	 */
	const clickAtCancelLoad = async (id, fileId, name) => {
		if (cancelState[fileId]) {
			cancelState[fileId].cancel()
			const files = await updateStateAndDatabase(`${id}/files/`, fileId, null)
			updateFieldState(id, "files", files)
		}
	}


	/**
	 * Изменение состояния выполнения задачи.
	 * 
	 * обновляет taskState, fieldSate, realtimeDatabase.
	 * 
	 * Используется на onChange в input компонента Checkbox.
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState)
	 * @returns {void}
	 */
	const clickAtCheckbox = async (id) => {
		const state = findTask(id);
					state.isComplite = !state.isComplite
		
		setTaskState(prev => ([...prev, state]))
		
		if (fieldState) {
			setFieldState(prev => ({ ...prev, isComplite: state.isComplite }))
		}
		
		await setFieldAtDatabase("/", state.id, state)
	}


	/**
	 * Функция поиска задач по строке и формирование массива taskState, на основе найденных совпадений.
	 * 
	 * фильтрует вывод на экран списока задач из масива taskState, по совпадению в заголовке задачи или описании задачи.
	 * 
	 * Функция используется в onChange поля input поисковой строки компоненты TaskHeader.
	 * 
	 * @param {string} str принимает строку из события onChange на поле поиска (в input)
	 */
	const changeSearch = ({target: {value}}) => {
		setSearchState(value)
		if (value && taskState) {
			const tasks = searchTask(taskState, value) 
			 setTaskState(tasks)
		}
	}

	return {

		search,
		taskState,
		editState,
		fieldState,
		createState,
		loadState,
		
		clickAtCancelLoad,

		clickAtFile,
		changeSearch,
		setTaskState,
		setFieldState,

		createTask,
		clickAtAddFile,
		clickAtRemoveFile,

		clickAtTitle,
		
		changeDate,
		changeEditState,
		
		clickAtCheckbox,
		
		clickAtRemoveButton,
		clickAtCloseButton,
		clickAtEditButton,
		
		clickAtAcceptButton,
		clickAtCancelButton,

		setModeForTitle
	}
}