import { createSlice } from "@reduxjs/toolkit";

export const { actions: textFieldActions, reducer: textField } = createSlice({
	name: "textField",
	initialState: {
		id: 0,
		title: "",
		description: "",
		deadline: "",
	},
	reducers: {
		setTitle: {
			prepare: ( val ) => ( { payload: val } ),
			reducer: ( state, { payload } ) => ( { ...state, title: payload } )
		},
		setDescription: {
			prepare: ( val ) => ({ payload: val }),
			reducer: ( state, { payload } ) => ( {...state, description: payload } )
		},
		setDeadline: {
			prepare: ( val ) => ({ payload: val }),
			reducer: ( state, { payload } ) => ( {...state, deadline: payload} )
		},
		resetTextField: (state) => ({
			id: 0,
			title: "",
			description: "",
			deadline: "2023-02-05",
		}),
		newTextField: {
			prepare: ( task ) => ( {payload: task} ),
			reducer: ( state, { payload } ) => ( { ...payload } )
		}

	}
})