
/**
 * Компонент который рисует поле всплывающей подсказки над элементами у которых есть атриубут data-task-tooltip
 * 
 * Данный компонент передается в портал TooltipPortal 
 * 
 * отрисовывается только если состояние tooltip не равно null
 * 
 * tooltip строка из атрибута data-tooltip принимается из состояния tooltip
 * 
 * @param {object} param0
 * @param {string} param0.tooltip 
 * @param {object} param0.tooltipRef
 *  
 * @param tooltip - описание всплывающей подсказки которое берется из состояния tooltip
 * @param tooltipRef ссылка для обработчика появления и позиционирования подсказки
 * @returns 
 */
export const Tooltip = ({ tooltip, tooltipRef }) => {

	// console.log("tooltip render...")

	return (
		<span
		ref = {tooltipRef}
		className="task-tooltip__tooltip" >
			{tooltip}
	</span>
)

}