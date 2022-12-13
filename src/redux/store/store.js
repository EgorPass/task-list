import { configureStore } from "@reduxjs/toolkit"

import { loader } from "../reduxSlice/createLoader.js"
import { tasks } from "../reduxSlice/tasksSlice.js"

import { search } from "../reduxSlice/headerState/searchSlice.js"

import { textField } from "../reduxSlice/fieldState/textFieldSlice.js"
import { fieldState } from "../reduxSlice/fieldState/fieldStateSlice.js"
import { uploadFile } from "../reduxSlice/fieldState/uploadFileSlice.js"
import { taskFile } from "../reduxSlice/fieldState/taskFileSlice.js"

import { tooltip } from "../reduxSlice/tooltipSlice.js"

export const store = configureStore({
	reducer: {
		loader,
		taskFile,
		
		search,
		tasks,

		fieldState,
		textField,
		tooltip,
		uploadFile,
	}
})