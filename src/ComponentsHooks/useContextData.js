import React, {useContext} from "react";
const ContextData = React.createContext(null);

/**
 * Контекст для размещения в App, принимает TaskBody.
 * 
 * принимает в value объект содержащий мтоды для обработки кликов и стейты для передачи информации между компонентами
 * 
 * @param {{value: object, children: React.ReactNode}} 
 * @param value объект мтодов и состояний
 * @param children компонент или компоненты React
 * @returns 
 */
export const MyContext = ({ value, children }) => {
	
	return (
		<ContextData.Provider value={value }>
			{children}
		</ContextData.Provider>
	)
}

/**
 * 
 * Для передачи методов и стейтов для работы кнопок.
 * 
 * Возвращает следующие методы и стейты:
 *  search, 			taskState,
		editState,		fieldState,
		createState,	loadState,
		
 *	
 *	clickAtCancelLoad,
 *
 *	clickAtFile,	changeSearch,
		setTaskState,	createTask,
 *	
 *	clickAtAddFile, 	clickAtRemoveFile,
		changeDate,				changeEditState,
		clickAtTitle, 		clickAtCheckbox,
 *	
 *	clickAtRemoveButton,
		clickAtCloseButton,
		clickAtEditButton,
 *	
 *	clickAtAcceptButton,
		clickAtCancelButton,
 *
 *	setModeForTitle
 * 
 * @returns {void}
 */
export const useContextData = () => {
	return useContext(ContextData)
}
