import React, { useEffect } from "react";
import {
	TaskHeaderContext,
	TaskItemListContext,
	TaskItemFieldContext,
	EditContext,
} from "./ComponentsHooks/useContextData"

import { useGetStore } from "./redux/reduxHooks/useGetStore";

import { useRefference } from "./ref/useRefference.js"

import { useFirebase } from "./ComponentsHooks/useFirebase"

import { useTasksActions } from "./redux/reduxHooks/useBindActions";

import { useTooltip } from "./ComponentsHooks/useTooltips"

import { TaskBody } from "./components/taskBody/TaskBody"
import { TooltipPortal } from "./components/tooltipPortal/TooltipPortal";
import { Tooltip } from "./components/tooltip/Tooltip";


function App() {
	
	console.log("render...")

	const { tooltip } = useGetStore()

	let {  tooltipRef } = useRefference();

	const { monitor } = useFirebase();
	const { getTasks } = useTasksActions()
				
	const { onMouseOver, positionAt } = useTooltip();

	useEffect(() => {
		monitor(getTasks)
		
	}, [])

	useEffect(() => {
		window.addEventListener("mouseover", onMouseOver)
		
		if (tooltipRef.current) {
			positionAt(tooltipRef.current, tooltip)
		}

		return () => {
			window.removeEventListener("mouseover", onMouseOver)
		}
			
	}, [ tooltip ] )

	return (
		
		<> 
			<TaskHeaderContext>
				<TaskItemListContext>
					<TaskItemFieldContext>
							<EditContext>
								
									<TaskBody	/>
								
							</EditContext>
					</TaskItemFieldContext>
				</TaskItemListContext>
			</TaskHeaderContext>
					
			{
				tooltip && (
					
					<TooltipPortal>
						<Tooltip
							{ ...tooltip }
							tooltipRef = { tooltipRef }
							/>
				
					</TooltipPortal>
				
				)
			}
		</>
  )	
}

export default App;
