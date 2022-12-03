import { useContextData } from "../../ComponentsHooks/useContextData";

/**
 * компонент рисует в TaskHeader поле поиска задачи по частичному совпадению в названии задачи или описании.
 * 
 * Работает на управляемом элементе input который обрабатывает ввод за счет функции changeSearch и сотояния search.
 * 
 * @returns 
 */
export const SearchField = () => {

	const {changeSearch, search} = useContextData()

	return (
		<div className="task-header__search-field">
			<input
				type="search"
				onChange={changeSearch}
				value = {search}
			/>
		</div>

	)
}