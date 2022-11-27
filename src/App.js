import React, {  useEffect } from "react";
import { MyContext} from "./hooks/useContextData"

import { useContentState } from "./hooks/useContentState"
import { monitor, getFilesFromDatabase } from "./hooks/useFirebase"

import { TaskBody } from "./components/taskBody/TaskBody"

function App() {
	
	const value = useContentState() 
	const {	search, setTaskState	} = value
		
	useEffect(() => {
		if (!search) monitor(setTaskState)
	}, [setTaskState, search])

	return (

		<MyContext value={	value	}>
			<TaskBody />
		</MyContext>
  );	
}

export default App;
