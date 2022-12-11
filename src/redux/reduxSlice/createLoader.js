import { createSlice } from "@reduxjs/toolkit"


export const { actions: LoaderActions, reducer: loader } = createSlice({
	name: "loader",
	initialState: "loading",
	reducers: {
		setLoader: {
			prepare: ( val ) => ( { payload: val } ),
			reducer: ( state, { payload } ) => payload
		}
	}
})