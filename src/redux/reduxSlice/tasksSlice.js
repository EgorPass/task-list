import { createSlice } from "@reduxjs/toolkit"

export const { actions: tasksActions, reducer: tasks } = createSlice({
	name: "tasks",
	initialState: [],
	reducers: {
		removeTask: {
			prepare: ( id ) => ( { payload: id } ),
			reducer: ( state, action ) =>  state.filter( it => it.id !== action.payload )
		},
		getTasks: {
			prepare: ( val ) => ( { payload: val } ),
			reducer: ( state, { payload } ) => payload
		},
	}

})

