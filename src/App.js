import React, { useState, useEffect, useRef } from "react";
import { MyContext} from "./ComponentsHooks/useContextData"

import { useEdit } from "./ComponentsHooks/useEdit"
import { useClicks } from "./ComponentsHooks/useClicks"
import { useGetStore } from "./redux/reduxHooks/useGetStore";
import { monitor } from "./ComponentsHooks/useFirebase"
import { useFilesContent } from "./ComponentsHooks/useFilesContent"

import { useTasksActions } from "./redux/reduxHooks/useBindActions";

import { TaskBody } from "./components/taskBody/TaskBody"

import { TooltipPortal } from "./components/tooltipPortal/TooltipPortal";

import { Tooltip } from "./components/tooltip/Tooltip";


import { useTooltip } from "./ComponentsHooks/useTooltips"

function App() {
	
	console.log("render...")

	const [cancelState, setCancelState] = useState(null);
	const store = useGetStore()
	const editMethods = useEdit();
	const { getTasks } = useTasksActions()
	const clicksMethods = useClicks(cancelState)
	const filesMethods = useFilesContent(cancelState, setCancelState)
	const tooltipRef = useRef(null)
	const { onMouseOver, positionAt } = useTooltip();


	useEffect(() => {
		monitor(getTasks)
		
		window.addEventListener("mouseover", onMouseOver)

		return () => {
			window.removeEventListener("mouseover", onMouseOver)
		}
	}, [])

	useEffect(() => {
		if (tooltipRef.current) {
			
			positionAt(tooltipRef.current, store.tooltip)
		}
			
	}, [store.tooltip] )


	return (

		<MyContext value={
			{
				...store,
				...editMethods,
				...filesMethods,
				...clicksMethods,
			}}>
			<TaskBody />
			{
				store.tooltip && (

					<TooltipPortal>
				 		<Tooltip
							{...store.tooltip}
				 			tooltipRef={tooltipRef}
				 		/>
				
					</TooltipPortal>
				
				 )
			}
		</MyContext>
  );	
}

export default App;
