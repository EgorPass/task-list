import ReactDOM from "react-dom"
import { useRef } from "react"

/**
 * Компонент для создания портала всплывающих подсказок
 * 
 * 
 * @param {object} param0
 * @param {React.ReactNode} param.children дочерние компоненты или элементы в портале  
 * @returns 
 */
export const TooltipPortal = ({ children }) => {
	
	const taskTooltip = useRef( document.getElementById("task-body__task-tooltip") )
	
	return (
		ReactDOM.createPortal(children, taskTooltip.current)
	)
}