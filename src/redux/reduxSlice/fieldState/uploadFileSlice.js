import { createSlice } from "@reduxjs/toolkit";

export const { actions: uploadFileActions, reducer: uploadFile } = createSlice({
	name: "uploadFile",
	initialState: {},
	reducers: {
		setUploadFile: {
			prepare: ( id, fileId, name, progress = 0 ) => ( {
					payload: 	{
											id,
											fileId,
											name,
											progress,
										}
			} ),
			reducer: ( state, { payload } ) => {
					const prev = state[payload.id]
					const file = {
						[payload.fileId]: {
							name: payload.name,
							progress: payload.progress
						} 
					}
					
					if ( !prev ) {
						return { ...state, [payload.id]: file }
					}
					else {
						const newFile = { ...state[payload.id], ...file }
						const newTask = {
							[payload.id]: newFile
						}
						return { ...state, ...newTask }
					}				
			}
		},

		deleteUploadFile: {
			prepare: ( id, fileId ) => ( {
					payload: 	{
											id,
											fileId
										}
			} ),
			reducer: ( state, { payload } ) => {				
					delete state[payload.id][payload.fileId]
					if( !Object.keys(state[payload.id]).length ) delete state[payload.id]
			}
		},
	}
})