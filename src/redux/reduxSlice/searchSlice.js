import { createSlice } from "@reduxjs/toolkit";

export const { actions: searchActions, reducer: search } = createSlice({
	name: "search",
	initialState: "",
	reducers: {
		setSearchState: {
			prepare: (val) => ({ payload: val }),
			reducer: (state, { payload }) => payload,
		}
	}
})