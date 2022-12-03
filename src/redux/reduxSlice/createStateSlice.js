import { createSlice } from "@reduxjs/toolkit";

export const { actions: createActions, reducer: createState } = createSlice({
	name: "create",
	initialState: false,
	reducers: {
		setCreateState: {
			prepare: (val) => ({payload: val}),
			reducer: (state, {payload}) => { 
				return payload
			 },

		}
	}
})