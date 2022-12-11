import { useCallback, useMemo } from "react";
import { useTooltipActions } from "../redux/reduxHooks/useBindActions";

/**
 * Хук для создания и позиционирования подсказки для элеменом с атрибутом data-tooltip
 * 
 * Основной обработчик для начала это onMouseOver, его ставим на window при построении объекта.
 * 
 * позиционирование зависит от ссылки на дочерний элемент портала tooltipRef, имеено в него и ставится содержимое data-tooltip
 * 
 * для позиционирования используется positionAt, которая принимает координаты элемента с атрибутом data-tooltip во время события onmouseover, далее 
 * 
 * @returns {object} методы для создания и позиционирования подсказки
 */
export function useTooltip() {
	
	const { setTooltip, removeTooltip } = useTooltipActions()

	let tooltipTarget = useMemo( ()=> null, [  ] );
	let tooltipData =  useMemo( ()=> "", [  ] );
	let coords =  useMemo( ()=> null, [  ] );
	let isOver = useMemo( ()=> false, [  ] );
	let isHover = useMemo( ()=> false, [  ] );
	let clientXBegin =  useMemo( ()=> 0, [  ] );
	let clientXEnd =  useMemo( ()=> 0, [  ] );
	let clientYBegin =  useMemo( ()=> 0, [  ] );
	let clientYEnd =  useMemo( ()=> 0, [  ] );
	let timeBegin =  useMemo( ()=> 0, [  ] );
	let timeEnd = useMemo( () => 0, [ ] );
	let sens = useMemo( ()=> 0.01, [ ] )

	/**
	 * обработчик для window на событие onmouseover для определения зашла ли мышь на элемент с атрбутом data-tooltip.
	 * 
	 * Если обработчки нашел элемент с аттрибутом data-tooltip, то запускаются функции onClickAtTarget, onMouseMove и onMouseOut
	 */
	const onMouseOver = useCallback(
		( e ) => {
			tooltipTarget = e.target.closest( "[data-task-tooltip" )
			if ( !tooltipTarget ) return;

			isOver = true;

			tooltipData = tooltipTarget.dataset.taskTooltip
		
			clientXBegin = e.clientX;
			clientYBegin = e.clientY;
			timeBegin = Date.now();

			tooltipTarget.addEventListener( "click", onClickAtTarget )
			tooltipTarget.addEventListener( "mousemove", onMouseMove )
			tooltipTarget.addEventListener( "mouseout", onMouseOut )
		}
	, [  ] )

	/**
	 * обработчик для события onclick на элементе с аттрибутом data-tooltip.
	 * 
	 * обработчик ставит состояние tooltip в null, убирая подсказку с элемента на котором произошел клик, а также с нимает с элемента обработчики onClickAtTarget, onMouseOut и onMouseMove.
	 */
	const onClickAtTarget = useCallback(
		( e ) => {
			tooltipTarget.removeEventListener( "mouseout", onMouseOut )
			tooltipTarget.removeEventListener( "click", onClickAtTarget )
			
			if(isOver && !isHover) 
				tooltipTarget.addEventListener( "mousemove", onMouseMove )
			
			isOver = false;
			isHover = false;
		
			removeTooltip();
		}
	, [  ] )


	/**
	 * обработчик определяет с какой скоростью проходит указатель над нужным элементом
	 * 
	 * чувствительность к скорости в пременной sens
	 * 
	 * если скорость меньше sens ставиться подсказка, экшеном setTooltip.
	 * Первый параметр экшена это строка из data-tooltip
	 * 
	 */
	const onMouseMove = useCallback(
		( e ) => {
			console.log("mouse moving")

			timeEnd = Date.now();
			clientXEnd = e.clientX;
			clientYEnd = e.clientY;

				if (timeBegin === timeEnd) return;

			const time = timeEnd - timeBegin
			const speed = (((clientXBegin + clientYBegin) - (clientXEnd + clientYEnd)) ** 2) / (time ** 2)
			
				if (!speed || speed < 0 || speed === "Infinity") return;

			if ( speed > sens ) {
				clientXBegin = clientXEnd;
				clientYBegin = clientYEnd;
				timeBegin = timeEnd;
			}
			else {
				coords = tooltipTarget.getBoundingClientRect();
				tooltipTarget.removeEventListener("mousemove", onMouseMove)
				isHover = true;
				setTooltip(tooltipData, coords.left, coords.top, coords.right, coords.bottom, coords.width, coords.height)
			}
		}
	, [ ] )

	/**
	 * обработчик для отслеживания, что мышь ушла за пределы нужного элемента, что бы удалить подсказку, если та была создана
	 * 
	 * снимает обработчики onMouseMove и onMouseOut
	 * 
	 * 
	 */
	const onMouseOut = useCallback(
		( e ) => {
			if ( tooltipTarget && !tooltipTarget.contains( e.relatedTarget ) ) {
				if ( isOver ) {
					isOver = false;
					if ( !isHover) tooltipTarget.removeEventListener( "mousemove", onMouseMove )
					if ( isHover ) {
						isHover = false;
						removeTooltip();
					}
				}
			}
			tooltipTarget.removeEventListener( "mouseout", onMouseOut )
		}
		, [ ] );
		
	/**
	 * позиционирование подсказки
	 * 
	 * @param {HTMLElement} node узел который позиционируем, то есть элемент подсказки
	 * @param {object} coords объект координат элемента с атрибутом data-tooltip, в отношении, которого позиционируем подсказку
	 */
	const positionAt = useCallback(
		( node, { left, top, right, bottom, width } ) => {
		
			const docWidth = document.documentElement.clientWidth;
			const docHeight = document.documentElement.clientHeight;

			const coordsNode = node.getBoundingClientRect();
			let x = left + ( width - coordsNode.width ) / 2,
					y = bottom + 10 ;

			if(  x  <  10 ) x = left;
			if( ( left + node.offsetWidth + 15 ) > docWidth ) x = right - node.offsetWidth;

			if ( y > docHeight ) y = top - node.offsetHeight - 5;

			node.style.left = x + "px";
			node.style.top = y + "px";
		}
	, [ ] )
	
		return {
			onMouseOver,
			positionAt
	}

}