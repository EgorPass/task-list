import { useSelector } from "react-redux"

export const useGetStore = () => {
	const store = useSelector(store => store)
	return store
}