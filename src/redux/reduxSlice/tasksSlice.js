import { createSlice } from "@reduxjs/toolkit"

export const { actions: tasksActions, reducer: tasks } = createSlice({
	name: "tasks",
	initialState: [],
	reducers: {
	
		removeTask: {
			prepare: (id) => {
				return {
					payload: id,
				}
			},
			reducer: (state, action) => {
				return state.filter(it => it.id !== action.payload)
			}
		},
		getTasks: {
			prepare: (val) => {
				return {
					payload: val
				}
			},
			reducer: (state, action) => {
				state = action.payload
				return state
			}
		},
	}

})

