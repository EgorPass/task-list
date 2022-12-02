import React, { useState, useEffect } from "react";
import { MyContext} from "./ComponentsHooks/useContextData"

import { useEdit } from "./ComponentsHooks/useEdit"
import { useClicks } from "./ComponentsHooks/useClicks"
import { useGetStore } from "./redux/reduxHooks/useGetStore";
import { monitor } from "./ComponentsHooks/useFirebase"
import { useFilesContent } from "./ComponentsHooks/useFilesContent"

import { useTasksActions } from "./redux/reduxHooks/useBindActions";

import { TaskBody } from "./components/taskBody/TaskBody"

function App() {
	
	console.log("render...")

	const [cancelState, setCancelState] = useState(null);
	const store = useGetStore()
	const editMethods = useEdit();
	const {getTasks} = useTasksActions()	
	const clicksMethods = useClicks(cancelState)
	const filesMethods = useFilesContent(cancelState, setCancelState)

	useEffect(() => {
			monitor(getTasks)
	}, [])

	return (

		<MyContext value={
			{
				...store,
				...editMethods,
				...filesMethods,
				...clicksMethods,
			}}>
			<TaskBody />
		</MyContext>
  );	
}

export default App;
