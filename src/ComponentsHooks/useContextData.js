import React, {useContext} from "react";

import { useRefference } from "../ref/useRefference.js"

import { useTaskHeadr } from "./useTaskHeader";
import { useTaskItemList } from "./useTaskItemList";
import { useTaskItemField } from "./useTaskItemField"
import { useEdit } from "./useEdit"


const ContextForTaskHeader = React.createContext( null )
const ContextForTaskItemList = React.createContext( null )
const ContextForTaskItemField = React.createContext( null )
const ContextForEdit = React.createContext( null )


export const TaskHeaderContext = ( { value, children } ) => {
	
	const headerMethods = useTaskHeadr()
	
	return (
		<ContextForTaskHeader.Provider value = { headerMethods } >
			{ children }
		</ContextForTaskHeader.Provider>
	)
}
export const useTaskHeaderContext = () => useContext( ContextForTaskHeader )


export const TaskItemListContext = ( { value, children } ) => {
	
	const taskItemListMethods = useTaskItemList();

	return (
		<ContextForTaskItemList.Provider value = { taskItemListMethods } >
			{ children }
		</ContextForTaskItemList.Provider>
	)
}
export const useTaskItemListContext = () => useContext( ContextForTaskItemList )


export const TaskItemFieldContext = ( { value, children } ) => {
	
	let { uploadTaskRef } = useRefference();
	const taskItemFieldMethods = useTaskItemField( uploadTaskRef );

		console.log("uploadTaskRef from TaskFieldContext: ", uploadTaskRef)

	return (
		<ContextForTaskItemField.Provider value={{ ...taskItemFieldMethods, uploadTaskRef } } >
			{ children }
		</ContextForTaskItemField.Provider>
	)
}
export const useTaskItemFieldContext = () => useContext( ContextForTaskItemField )


export const EditContext = ( { value, children } ) => {
	
	const editMethods = useEdit()

	return (
		<ContextForEdit.Provider value = { editMethods } >
			{ children }
		</ContextForEdit.Provider>
	)	
}
export const useEditContext = () => useContext(ContextForEdit)