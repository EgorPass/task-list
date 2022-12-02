import { createSlice } from "@reduxjs/toolkit";

export const { actions: loadingFilesActions, reducer: loadingFiles } = createSlice({
	name: "loadingFiles",
	initialState: {},
	reducers: {
		setLoadingFiles: {
			prepare: (fileId, progress = 0) => {
				return {
					payload: {
						[fileId]: {	
							progress,
						}
						
					}
				}
			},
			reducer: (state, action) => {
				const prop = action.payload
				console.log(prop)

				return {...state, ...prop}
			}
		},
		updateProgress: {
			prepare: (fileId, val) => ({ payload: { val, fileId} }),
			reducer: (state, action) => {
				if (state[action.payload.fileId]) state[action.payload.fileId].progress = action.payload.val
				else return state
			}
		},
		deleteLoadingFile: {
			prepare: (fileId) => {
				return {
					payload: fileId
				}
			},
			reducer: (state, { payload }) => {
				delete state[payload]
			}
		}
	}
})