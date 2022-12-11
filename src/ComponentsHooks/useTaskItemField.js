import {  useCallback } from "react";

import { useFirebase } from "./useFirebase"
import {
				useTasksActions,
				useUploadFileActions,
				useTextFieldActions,
				useFieldStateActions,
				useTaskFileActions
										} from "../redux/reduxHooks/useBindActions" 
import { useGetStore} from "../redux/reduxHooks/useGetStore"

/**
 * Хук для обработки изменений описания поля задачи (кнопики закрыть или удалить, чекбокс, изменение текстовых полей)
 * 
 * @returns {object} Возвращает объект методов для функциональности описания поля задачи: 		clickAtCheckboxField, clickAtRemoveButton, clickAtCloseButton, changeTitle, changeDescription, changeDate,
 */
export function useTaskItemField( uploadTaskRef ) {
	
	const { resetTextField, setTitle, setDescription, setDeadline } = useTextFieldActions()
	const { setOpenField, setNewField, setIsCompliteField } = useFieldStateActions()
	const { resetTaskFile } = useTaskFileActions();

	const { removeTask } = useTasksActions();
	const { setUploadFile, deleteUploadFile } = useUploadFileActions()
	const { textField, taskFile, fieldState, uploadFile, } = useGetStore()
	const { deleteFileFromStorage, setFieldAtDatabase, uploadFileToStorage, downlaodFileFromStorage } = useFirebase()
	
	const { setTaskFile, removeTaskFile } = useTaskFileActions()

	
	/**
	 * Изменение состояния чекбокса о выполнения задачи в поле описания задачи.
	 * 
	 * обновляет fieldState 
	 * 
	 * @returns {void}
	 */
	const clickAtCheckboxField = useCallback(
		() => {
			setIsCompliteField( !fieldState.isComplite )
		}
	, [ fieldState ]  )

	/**
	 * Закрывает поле с описанием задачи, которое на экране.
	 * 
	 * заносит изменения в realtimeDatabase по id беря текущие значения из состояний для работы с полем.
	 * 
	 * изменяет состояния textField, fieldState и taskFile.
	 * @param {number} id для индификации в методе setFieldAtDatabase
	 */
	const clickAtCloseButton = useCallback(
		( id ) => {

			setFieldAtDatabase( `/${ id }`, "title", textField.title )
			setFieldAtDatabase( `/${ id }`, "description", textField.description )
			setFieldAtDatabase( `/${ id }`, "deadline", textField.deadline )
			setFieldAtDatabase( `/${ id }`, "isComplite", fieldState.isComplite )

			setOpenField( false )
			resetTextField()
			resetTaskFile()
			if ( fieldState.newField ) {
				setNewField( false )
			}
		}
	, [ textField, fieldState ])

	/**
	 * Удаление задачи и закрытие поля описания задачи.
	 * 
	 * Функция удаляет задачу из tasks, а так же все зависимости связанные с ней,
	 * а имеено удаляются загруженные файлы в storageFirebase, файлы, которые загружаются в storageFirebad в момент нажатия кнопки "Удалить", и удаление описание задачи из RealTimeDatabase.
	 * 
	 * Обновляет realtimeDatabase, storageFirebase, fieldState, taskFile, uploadFile.
	 * 
	 * Для удаления из realtimeDatabase и storageFirebase состояние cancelState, которое передается верхнему хуку через аргумент.
	 * 
	 * Функция срабатывает на onClick, кнопки "Удалить", компоненты RemoveItemButton.
	 * 
	 * @param {number} id индификатор задачи (обекта из массива taskState), описание которой открыто на экране.
	 * @return {void}
	 */
	const clickAtRemoveButton = useCallback(
		async ( id ) => {
			const entries = Object.entries( taskFile ) || []
			
			if ( fieldState.newField ) {
				setNewField( false )
			}				
			setOpenField( false )
			resetTaskFile()
			removeTask( id )
			setFieldAtDatabase( "/", id, null )

				
				for ( let [ name, value ] of entries ) {
				
					if ( ( name in uploadTaskRef ) && ( uploadTaskRef[ name ]._state === "running" ) ) {

						uploadTaskRef[ name ].cancel();
						deleteUploadFile( id, name );
						delete uploadTaskRef[ name ];
					
					}
					else
						deleteFileFromStorage( `${ id }/${ name }/${ value }`, value );

				}
			

		}
	, [ taskFile ] )
	

	/**
	 * Изменение textarea поля EditableTextField в названии задачи. 
	 * 
	 * метод делает управляемым тестовое поле
	 * 
	 * @param {string} value значение из объекта события onChanhge у textarea 	 
	 */
	const changeTitle = useCallback ( 
		( { target: { value } } ) => {
			setTitle( value )
		}
	, [ textField.title ] )
		
	/**
	 * Изменение textarea поля EditableTextField в описании задачи.
	 * 
	 * метод делает управляемым тестовое поле
	 * 
	 * @param {string} value значение из объекта события onChanhge у textarea 	 
	 */
	const changeDescription =	useCallback(
		( { target: { value } } ) => {
			setDescription( value )
		}
	, [ textField.description ])
	
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
	const changeDate = useCallback (
		( { target: { value } } ) => {		
			setDeadline( value )
		}
	, [ textField.deadline ] )


	////////// Работа с отделом по загрузке файлов ////////////////


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


	////////////////////////////////////////////////////////////

	return {	
		clickAtCheckboxField,
		clickAtRemoveButton,
		clickAtCloseButton,

		changeTitle,
		changeDescription,
		changeDate,

		clickAtFile,
		clickAtAddFile,
		clickAtRemoveFile,
		clickAtCancelLoad,
	}
}