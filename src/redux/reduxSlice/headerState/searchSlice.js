import { createSlice } from "@reduxjs/toolkit";

export const { actions: searchActions, reducer: search } = createSlice({
	name: "search",
	initialState: "",
	reducers: {
		setSearch: {
			prepare: ( val ) => ( { payload: val } ),
			reducer: ( state, { payload } ) => payload
		},
	}
})