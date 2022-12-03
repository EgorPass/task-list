import { useTooltipActions } from "../redux/reduxHooks/useBindActions";
import { useGetStore } from "../redux/reduxHooks/useGetStore"

export function useTooltip() {
	
	const { setTooltip, removeTooltip } = useTooltipActions()
	const { tooltip } = useGetStore();

	let tooltipTarget = null;
	let tooltipData = ""
	let coords = null;

	let isOver = false;
	let isHover = false;
	let clientXBegin, clientXEnd = 0;
	let clientYBegin, clientYEnd = 0;
	let timeBegin, timeEnd = 0

	function onMouseOver(e) {
		if (!tooltip && tooltipTarget) {
			tooltipTarget.removeEventListener("mouseMove", onMouseMove);
			isOver = isHover = false;
		}
		if (isOver) return;
		
		tooltipTarget = e.target.closest("[data-task-tooltip")
		if (!tooltipTarget) return;

			isOver = true;

			tooltipData = tooltipTarget.dataset.taskTooltip
			coords = tooltipTarget.getBoundingClientRect();
		
			clientXBegin = e.clientX;
			clientYBegin = e.clientY;
			timeBegin = Date.now();

		tooltipTarget.addEventListener("mousemove", onMouseMove)
		tooltipTarget.addEventListener("mouseout", onMouseOut)
	}

	function onMouseMove(e) {
		timeEnd = Date.now();
		clientXEnd = e.clientX;
		clientYEnd = e.clientY;

			if (timeBegin === timeEnd) return;

		const time = timeEnd - timeBegin
		const speed = (((clientXBegin + clientYBegin) - (clientXEnd + clientYEnd)) ** 2) / (time ** 2)
		
			if (!speed || speed < 0 || speed === "Infinity") return;

		if ( speed > 0.01 ) {
			clientXBegin = clientXEnd;
			clientYBegin = clientYEnd;
			timeBegin = timeEnd;
		}
		else {
			isHover = true;
			tooltipTarget.removeEventListener("mousemove", onMouseMove)

			setTooltip(tooltipData, coords.left, coords.top, coords.right, coords.bottom, coords.width, coords.height)
		}
	}

	function onMouseOut(e) {
		if(isOver) {
			if( !tooltipTarget.contains(e.relatedTarget) ) {
				isOver = false;
				tooltipTarget.removeEventListener("mouseout", onMouseOut)
	
				if (isHover) {
					removeTooltip();
					isHover = false;
				}
			}
		}
	}
	
	function positionAt(node, {left, top, right, bottom, width } ) {
		
		const docWidth = document.documentElement.clientWidth;
		const docHeight = document.documentElement.clientHeight;

		const coordsNode = node.getBoundingClientRect();
		let x = left + (width - coordsNode.width) / 2,
				y = bottom + 10 ;

		if( x  <  10) x = left;
		if ((left + node.offsetWidth + 15) > docWidth) x = right - node.offsetWidth;

		if (y > docHeight) y = top - node.offsetHeight - 5;

		node.style.left = x + "px";
		node.style.top = y + "px";


	}

	

	return {
		onMouseOver,
		positionAt
	}
}