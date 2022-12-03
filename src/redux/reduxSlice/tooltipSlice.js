import { createSlice } from "@reduxjs/toolkit"

export const { actions: tooltipActions, reducer: tooltip } = createSlice({
	name: "tooltip",
	initialState: null,
	reducers: {
		setTooltip: {
			prepare: (tooltip, left, top, right, bottom, width, height) => {
				return {
					payload: {
						tooltip, left, top, right, bottom, width, height,
					}
				}
			},
			reducer: (state, { payload }) => {
				return payload
			}
		},
		removeTooltip(state) { return null },
	}
})