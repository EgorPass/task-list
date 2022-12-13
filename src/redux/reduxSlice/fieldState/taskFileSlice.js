import { createSlice } from "@reduxjs/toolkit";

export const { actions: taskFileActions, reducer: taskFile } = createSlice({
	name: "taskFile",
	initialState: {},
	reducers: {
		setTaskFile: {
			prepare: ( val ) => ( { payload: val } ),
			reducer: ( state, { payload } ) => ( { ...state, ...payload } )
		},
		removeTaskFile: {
			prepare: ( fileId ) => ( { payload: fileId } ),
			reducer: ( state, { payload } ) => {
				const res = Object.entries( state ).filter( ( [key, val] ) => {
					return key !== payload;
				})

				return Object.fromEntries( res );
			}
		},
		resetTaskFile: ( state ) => ( {} )
	}

})