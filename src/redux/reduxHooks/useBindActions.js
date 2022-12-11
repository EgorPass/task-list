import { bindActionCreators } from "redux"
import { useDispatch } from "react-redux"

import { LoaderActions } from "../reduxSlice/createLoader"

import { searchActions } from "../reduxSlice/headerState/searchSlice"
import { tasksActions } from "../reduxSlice/tasksSlice"

import { uploadFileActions } from "../reduxSlice/fieldState/uploadFileSlice"
import { textFieldActions } from "../reduxSlice/fieldState/textFieldSlice"
import { fieldStateActions } from "../reduxSlice/fieldState/fieldStateSlice"
import { taskFileActions } from "../reduxSlice/fieldState/taskFileSlice"

import { tooltipActions } from "../reduxSlice/tooltipSlice"

export const useLoaderActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(LoaderActions, dispatch)
}

export const useSearchActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(searchActions, dispatch)
}

export const useTasksActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(tasksActions, dispatch)
}

// работа с открытым полем ..

export const useTaskFileActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(taskFileActions, dispatch)
}

export const useFieldStateActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(fieldStateActions, dispatch)
}

export const useTextFieldActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(textFieldActions, dispatch)
}


export const useUploadFileActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(uploadFileActions, dispatch)
}


// работа с подсказкой

export const useTooltipActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(tooltipActions, dispatch)
}