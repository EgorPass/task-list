import { useRef } from "react";

export function useRefference() {
	
	const uploadTaskRef = useRef({}).current
	const tooltipRef = useRef( null )

	return {
		uploadTaskRef,
		tooltipRef
	}
}
