import { useMemo } from "react"
import { useSelector } from "react-redux"

export const useGetStore = () => {
	const store = useSelector(store => store)
	// return useMemo(() => store, [store])
	return store
	
}