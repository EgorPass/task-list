import { useCallback } from "react";
import { useFirebase } from "./useFirebase"
import { useGetStore} from "../redux/reduxHooks/useGetStore"
import { useUploadFileActions, useTaskFileActions } from "../redux/reduxHooks/useBindActions" 


/**
 * хук содержит обработчики кликов для добавления файла, отмены загрузки, сохранения и удаления файла
 * 
 * Использует внутри useFirebase для загрузки, сохранения и удаления файлов к задаче
 * 
 * @param {object} cancelState состояние в виде массива для uploadTask - загрузчиков фаойлов
 * @param {functinon} setCancelState action для постановки в состояние массива cancelState очередного загрузчика. 
 * @returns {object} методы для интерфейса работы с загружаемыми файлами к задаче: 		clickAtFile, clickAtAddFile, clickAtRemoveFile, сlickAtCancelLoad,
 */
export const useFieldFileContainer = ( uploadTaskRef) => {

	const { uploadFile,  taskFile } = useGetStore()
		
	const { setTaskFile, removeTaskFile } = useTaskFileActions()
	const { setUploadFile, deleteUploadFile } = useUploadFileActions()
	
	const {
		uploadFileToStorage,
		setFieldAtDatabase,
		deleteFileFromStorage,
		downlaodFileFromStorage
														} = useFirebase()
	
	/**
	 * метод удаляет файл у задаче в realtimeDatabase и состояния taskFile
	 * 
	 * зависти от taskFile
	 * 
	 * @param {number | string} id индификатор для определения задачи в realtimeDatabase
	 * @param {strgin} path полный путь до нужной задачи или свойства в задаче 
	 * @param {number | string} fileId название раздела задачи или индификатор файла
	 * @param {string | object | null} prop название для файла или содержимое свойства задачи
	 */
	const updateFieldAfterUpLoadOrCancel = useCallback(
		( path, fileId, prop ) => {
			setFieldAtDatabase( path, fileId, prop )	
			removeTaskFile( fileId )		
		}
	, [ taskFile ])

	/**
	 * Добавление файла к задаче, в поле описания задачи.
	 * 
	 * Обновляет realtimeDatabase, storageFirebase, cancelState, loadingFiles .
	 * 
	 * Примис от uploadBytesResumable заноситься в cancelState для отмены загрузки,
	 * при удалении задачи, или возможности отменить загрузку.
	 * 
	 * В обрабтчике примиса от uploadBytesResumable для uploadFile ставиться прогресс загрузки для каждого загружаемого файла.
	 * 
	 * Используется на onClick эмитации кнопки (тэг input[type ='file']) компоненты FileAddButton.
	 * 
	 * @param {number} id инфификаотр задачи (объекта массива taskState), к которой загружаем файл,
	 * @param {object} target объект события input[type='file'] для забора файла который выбрали,
	 * @returns {void} 
	 */
	const clickAtAddFile = useCallback(
		async ( id, target ) => {

			if ( !target ) return;

			const files = target.files
			if ( !files ) return 
						
			Array.from( files ).forEach( async ( file ) => {

				const name = file.name;
				const fileId = Date.now();
				const uploadTask = uploadFileToStorage(`${ id }/${ fileId }/${ name }`, file );
								
				uploadTaskRef[ fileId ] = uploadTask;

				setTaskFile( { [ fileId ]: name } )
				setUploadFile( id, fileId, name )			
				
				uploadTask
					.on( "state_changed",
						async ( snapshot ) => {
								const progress = Math.round(
									( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
								);
							setUploadFile(id, fileId, name, progress)
						},
						( err ) => {
								console.log( `Файл ${ name } не загрузился `)
						},
						(data) => {
								setFieldAtDatabase( `${ id }/files/`, fileId, name )	
								delete uploadTaskRef[fileId]
								deleteUploadFile( id, fileId )
						}
					)
			})
		}
	, [  ])

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
	 * @param {string | number} fileId поле для хранения файла,
	 */
	const clickAtCancelLoad = useCallback(
		( id, fileId ) => {
			
			if ( ( id in uploadFile ) && ( fileId in uploadFile[ id ] ) ) {
		
					if (uploadFile[ id ][ fileId ].progress === 100) return;
				
				updateFieldAfterUpLoadOrCancel(`${ id }/files/`, fileId, null)

				uploadTaskRef[ fileId ].cancel()			
				delete uploadTaskRef[ fileId ]			
				deleteUploadFile( id, fileId )
			}
		}
	, [ uploadFile ])

	/**
	 * Удаление загруженного файла в поле описания задачи.
	 * 
	 * Обновляет taskFile, realtimeDataBase, storageFirebase
	 * удаляет из трех сущностей.
	 * 
	 * Используется на onClick эмитации кнопки (тэг span) в компоненте FileConetnt.
	 * 
	 * @param {number} id индификатор задачи (объекта массива taskState),
	 * @param {string} fileId индификатор поля файла для удаления,
	 * @param {string} name названия файла для удаления
	 * @returns {void}
	 */
	const clickAtRemoveFile = useCallback(
		async ( id, fileId, name ) => {
			updateFieldAfterUpLoadOrCancel(`${ id }/files/`, fileId, null)		
			deleteFileFromStorage(`${ id }/${ fileId }/${ name }`, name)				
		}
	, [])

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
	const clickAtFile = useCallback(
		async ( id, fileId, name ) => {
			downlaodFileFromStorage(`${ id }/${ fileId }/${ name }`, name)
		}
	, [])

	return {
		clickAtFile,
		clickAtAddFile,
		clickAtRemoveFile,
		clickAtCancelLoad,
	}
	
}