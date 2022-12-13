import { useCallback } from "react"
import { getDatabase, onValue, ref as databasRef, update, get, set, child, } from "firebase/database"
import { deleteObject, getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useLoaderActions } from "../redux/reduxHooks/useBindActions"


/**
 * 
 * @returns {object} методы работы с хранилищем и базой хранящей данные о задачах: 		monitor, setFieldAtDatabase, uploadFileToStorage, getFilesFromDatabase, deleteFileFromStorage, downlaodFileFromStorage,
 */
export function useFirebase() {
	
	const { setLoader } = useLoaderActions()

	/**
	 * Обновляет содержимое realtimeDatabae, из которого формируется список задач.
	 * 
	 * Ставим в path место в хранилище (может быть конкретный объет или корень), а fieldId укзывате точку в куда ставить prop.
	 * 
	 * Для обновлния задачи ставим для path "/", fieldId укажет на конкретную задачу.
	 * 
	 * @param {string} path строка пути до места в realTimeDatabase для обновления (может быть как "/"),
	 * @param {string | number} field поле задачи в realTimeDatabase,
	 * @param {string | null | object | boolean| number} prop значение для поля задачи
	 * @returns {any} вернуть может объект или строку
	 */
	const setFieldAtDatabase = useCallback(
		async ( path, field, prop ) => {
			const db = databasRef( getDatabase(), path )
			return await update( db, { [ field ]: prop } )
		}
	, [ ] )


	/**
	 * Возвращает данные с realtimeDatabase зависимости от запроса в парамтере path.
	 * 
	 * @param {string} path путь внутри realtimeDatabase,
	 * @returns {Promis<object | string>} может вернуть объект или строку
	 */
	const getFilesFromDatabase = useCallback(
		async ( path ) => {
			const map = await get( child( databasRef( getDatabase() ), path) )
			return await map.val();
	}, [ ] )


	/**
	 * Удаляет файл из storageFirebase по пути path (укзывается с названием, которое должно передаться в file)
	 * 
	 * пример для заполнения path: id/nameFolder/nameFile
	 * 
	 * @param {string} path путь до файла для удаления,
	 * @param {string} file опциональный параметр, имя файла для удаления,
	 * @returns {void}
	 */
	const deleteFileFromStorage = useCallback(
		async ( path, file ) => {
			const storage = storageRef( getStorage(), path )
			deleteObject( storage )
				.then( () => {
					console.log( "Файл: ", file, " - удален" )
				} )
				.catch( () => {
					console.log( "что то пошло не так, файл: ", file, " - не удален" )
				} )
		}
	, [ ] )


	/**
	 * загрузка файла к задаче в storageFirebase по пути path.
	 * 
	 * пример для path: 'id/nameFolder/nameFile
	 * 
	 * @param {string} path путь до места куда нужно сохранить, включая название
	 * @param {any} file файл для загрузки
	 * @returns {object} типа uploadTask 
	 */
	const uploadFileToStorage = useCallback(
		( path, file ) => {
			const storage = storageRef( getStorage(), `${ path }` )
			const uploadTask = uploadBytesResumable( storage, file )
					
			return uploadTask
		}
	, [ ] )

	/**
	 * сохранение файла прикрепленного к задаче
	 * 
	 * формирует ссылку, ставит параметры для клика и инициирует клик, через скрипт
	 * 
	 * @param {string} path полный путь до файла, включая имя 
	 * @param {string} name название файла, используется для постановки параметра download 
	 */
	const downlaodFileFromStorage = useCallback(
		async ( path, name ) => {
			const url = await getDownloadURL( storageRef( getStorage(), path ) )
			const anch = document.createElement( 'a' );
			anch.setAttribute( "download", `${ name }` )
			anch.setAttribute( "target", `_blank` )
			anch.href = url;
			anch.click();
		}
	, [ ] )


	/**
	 * делает первую загрузку, и следит запоследующими изменениям в realtimeDatabas,
	 * при изменении загружает список объектов задач и обновляет компонент
	 * 
	 * принимает как callback сеттер для списка объектов задач
	 * 
	 * Так же устанавливает состояние loader в зависимости от полученных данных:
	 * 
	 * есть список задач - complite;
	 * если пусто - empty
	 * 
	 * в начале ставит в "loading", для выводк React-loader-spiner во время ожидания загрузки
	 * 
	 * @param {setTaskState} callback 
	 */
	const monitor = useCallback(
		async ( callback ) => {
			
			setLoader( "loading" )
			
			const db = databasRef( getDatabase(), '/' );
			
			onValue( db, async snapshot => {
				let arr = []
				let loader = "empty";
				const dataFromSnapshot = snapshot.val()

					if ( dataFromSnapshot ) {
						arr = Object.values(dataFromSnapshot)
						loader = "complite"
					}
				
				setLoader(loader)
				callback(arr);
			})

		}
	, [ ] )

	return {
		monitor,
		setFieldAtDatabase,
		uploadFileToStorage,
		getFilesFromDatabase,
		deleteFileFromStorage,
		downlaodFileFromStorage,
	}

}