import ReactDOM from "react-dom"
import { useRef, memo } from "react"

/**
 * Компонент для создания портала всплывающих подсказок
 * 
 * 
 * @param {object} param0
 * @param {React.ReactNode} param0.children
 * 
 * @param children дочерние компоненты или элементы в портале для подсказки
 * @returns 
 */
export const TooltipPortal = ( { children } ) => {

	console.log("tooltip portal render....")
	
	const taskTooltip = useRef( document.getElementById( "task-body__task-tooltip" ) )
	
	return (
		ReactDOM.createPortal( children, taskTooltip.current )
	)
}
