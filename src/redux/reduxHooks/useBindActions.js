import { bindActionCreators } from "redux"
import { useDispatch } from "react-redux"

import { tasksActions } from "../reduxSlice/tasksSlice"
import { fieldActions } from "../reduxSlice/fieldSlice"
import { loadingFilesActions } from "../reduxSlice/loadingFileSlice"
import { createActions } from "../reduxSlice/createStateSlice"
import { searchActions } from "../reduxSlice/searchSlice"

export const useTasksActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(tasksActions, dispatch)
}

export const useFieldActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(fieldActions, dispatch)
}

export const useLoadingFilesActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(loadingFilesActions, dispatch)
}

export const useCreateActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(createActions, dispatch)
}

export const useSearchActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(searchActions, dispatch)
}

