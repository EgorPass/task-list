
/**
 * Компонент который рисует поле всплывающей подсказки над элементами у которых есть атриубут data-task-tooltip
 * 
 * Данный компонент передается в портал Tooltip портал
 * 
 * @param {object} param0
 * @param {string} param.tooltip - описание всплывающей подсказки которое берется из атрибута data-task-tooltip
 * @param {object} param.tooltipRef ссылка для обработчика появления и позиционирования подсказки
 * @returns 
 */
export const Tooltip = ({ tooltip, tooltipRef }) => (
	<span
		ref = {tooltipRef}
		className="task-tooltip__tooltip" >
			{tooltip}
	</span>
)
