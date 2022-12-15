import { useCallback } from "react";
import { useGetStore} from "../redux/reduxHooks/useGetStore.js"
import {	
	useTextFieldActions,
	useFieldStateActions,
	useTaskFileActions
} from "../redux/reduxHooks/useBindActions" 
import { useFirebase } from "./useFirebase";
import { useTaskItemField } from "./useTaskItemField.js";

/**
 * Хук для обработки кликов по списку задач.
 * 
 * @returns {object} методы для обработки кликов по списку задач: 		clickAtTitle,	clickAtCheckboxTitle,
 */
export function useTaskItemList() {

	const { newTextField } = useTextFieldActions()
	const {setOpenField, setIsCompliteField} = useFieldStateActions()
	const { setTaskFile  } = useTaskFileActions();

	const { clickAtCloseButton } = useTaskItemField()
	const {  setFieldAtDatabase } = useFirebase()
	const { tasks,  uploadFile, taskFile,fieldState, textField }= useGetStore()
	
	
	/**
	 * Отктрывае поле с описанием и вложениями из списка задач, по индификатору.
	 * 
	 * Ставит fieldState в true.
	 * 
	 * заполняет состояния textField и taskFile из состояни task
	 * 
	 * Функция используется на onClikc заголовка в списке задач, в компоненте Title.
	 * 
	 * @param {number} id инфификатор задачи (обекта из массива taskState), которая откроется при клики 
	 */
	const clickAtTitle = useCallback(
		( id ) => {
		 			
			if (fieldState.openField) {
				clickAtCloseButton(id)
			}

			const task = tasks.find( it => it.id === id ) 
			if ( !task ) return;
			
			let files

				if ( uploadFile[ id ] ) {
					const oldFiles = task.files;
					const uploadingFiles = {}

						for ( let [ prop, val ] of Object.entries( uploadFile[ id ] ) ) {
							uploadingFiles[ prop ] = val.name
						}
						
					files = oldFiles ? ( { ...oldFiles, ...uploadingFiles } ) : ( { ...uploadingFiles } )
									
				}
				else {
					files  = task.files ?  ( { ...task.files } ) : {} 
				}

			
			newTextField( {
											id,
											title: task.title,
											description: task.description,
											deadline: task.deadline,
										} )
			setTaskFile( { ...task.files, ...files } )
			setIsCompliteField( task.isComplite )
			setOpenField( true )
			


		}
	, [ tasks, taskFile, textField, fieldState ])

	/**
	 * Изменение компонента Chexkbox в списке задач.
	 * 
	 * @param {number} id инфификатор задачи (обекта из массива taskState), которая откроется при клики 
	 */
	const clickAtCheckboxTitle = useCallback(
		( id ) => {
			
			const task = tasks.find(it => it.id === id)
			setFieldAtDatabase(`/${task.id}`, "isComplite", !task.isComplite)
			
		}
	, [ tasks ] )


	return {				
		clickAtTitle,
		clickAtCheckboxTitle,
	}

}