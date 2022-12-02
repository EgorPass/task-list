import { createSlice } from "@reduxjs/toolkit";

export const { actions: fieldActions, reducer: field } = createSlice({
	name: "field",
	initialState: null,
	reducers: {
		setField: {
			prepare: (val) => {
				return {
					payload: val,
				}
			},
			reducer: (state, action) => {
				return action.payload
			}
		},
	}

})