import { configureStore } from "@reduxjs/toolkit"
import { tasks } from "../reduxSlice/tasksSlice.js"
import { field } from "../reduxSlice/fieldSlice.js"
import { loadingFiles } from "../reduxSlice/loadingFileSlice.js"
import { createState } from "../reduxSlice/createStateSlice.js"
import { search } from "../reduxSlice/searchSlice.js"


export const store = configureStore({
	reducer: {
		tasks,
		field,
		search,
		createState,
		loadingFiles,
	}
})