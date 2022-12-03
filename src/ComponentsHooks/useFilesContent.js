import { deleteFileFromStorage, uploadFileToStorage, setFieldAtDatabase, getFilesFromDatabase, downlaodFileFromStorage } from "./useFirebase"
import { useGetStore} from "../redux/reduxHooks/useGetStore"
import { useFieldActions, useLoadingFilesActions, useTooltipActions } from "../redux/reduxHooks/useBindActions" 

/**
 * хук для раздела загрузки файлов: загрузка, сохранение
 * 
 * обрабатывается клики для добавления файла, отмены загрузки, сохранения и удаления файла
 * 
 * @param {[]} cancelState 
 * @param {functinon} setCancelState 
 * @returns 
 */
export const useFilesContent = (cancelState, setCancelState) => {

	const {  loadingFiles, tooltip }= useGetStore()
	const { setField } = useFieldActions();
	const { removeTooltip } = useTooltipActions()
	const { setLoadingFiles, updateProgress, deleteLoadingFile } = useLoadingFilesActions()

	/**
	 * функция для обновления поля описания задач при загрузке или удаления файла к задаче.
	 * 
	 * работает с realtimeDatabase, в начле обновляет с учетом появившегося файла или удаленного, после забирает по id  задачу и обновляет ее для состояния field
	 * 
	 * @param {number | string} id индификатор для определения задачи в realtimeDatabase
	 * @param {strgin} path полный путь до нужной задачи или свойства в задаче 
	 * @param {number | string} fileId название раздела задачи или индификатор файла
	 * @param {string | object | null} prop название для файла или содержимое свойства задачи
	 */
	const updateField = async (id, path, fileId, prop) => {
		await setFieldAtDatabase(path, fileId, prop)	
		const task = await getFilesFromDatabase(`${id}`)
		setField(task)
	}

	/**
	 * Добавление фала к задаче, в поле описания задачи.
	 * 
	 * Обновляет realtimeDatabase, storageFirebase, cancelState, loadingFiles .
	 * 
	 * Примис от uploadBytesResumable заноситься в cancelState для отмены загрузки,
	 * при удалении задачи, или возможности отменить загрузку после закрытия поля описания задчи.
	 * 
	 * В обрабтчике примиса от uploadBytesResumable для loadingFiles ставиться прогресс загрузки для каждого загружаемого файла.
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

			updateField(id, `${id}/files/`, nameForFile, name)		
			
			const uploadTask = uploadFileToStorage(`${id}/${nameForFile}/${name}`, file);
		
		
			setLoadingFiles(nameForFile)
			setCancelState(prev => ({
				...prev,
				[nameForFile]: uploadTask
			}))


			uploadTask
				.on("state_changed", async (snapshot) => {
					const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );

					updateProgress(nameForFile, progress)
					
					if (progress >= 100) {
						deleteLoadingFile(nameForFile)
					}
				})
			
			// uploadTask.then(() => { 

			// })
			
		})
	}

	/**
	 * Отмена загузки файла к задаче (в описание задачи).
	 * 
	 * Для отмены использует примис от uploadBytesResumable (функция для загрузки на storageFirebase), который содержиться в состоянии cancelState.
	 * 
	 * Обновляет состояние field, realtimeDatabase.
	 * 
	 * Используется на onClick эмуляции кнопки (тэг span) компоненты FileLoader.
	 * 
	 * @param {number} id индификатор задачи в которой поставили загрузку файла,
	 * @param {string | number} fileId поле (контейнер) для хранения файла,
	 * @param {string | null} name название файла
	 */
	const clickAtCancelLoad = async (id, fileId, name) => {
		if (fileId in loadingFiles) {

			if(tooltip) removeTooltip()

			deleteLoadingFile(fileId)
			cancelState[fileId].cancel()
			updateField(id, `${id}/files/`,fileId, null)		

		}
	}

	/**
	 * Удаление загруженного файла в поле описания задачи.
	 * 
	 * Обновляет field, realtimeDataBase, storageFirebase
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
			if(tooltip) removeTooltip()

		deleteFileFromStorage(`${id}/${fileId}/${name}`, name)
		updateField(id, `${id}/files/`, fileId, null)
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

	return {

		clickAtFile,
		clickAtAddFile,
		clickAtRemoveFile,
		clickAtCancelLoad,
	}
	
}