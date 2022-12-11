
/**
 * компонент рисует в TaskHeader поле поиска задачи
 * 
 * Поиск по частичному совпадению в названии задачи или описании.
 * 
 * Работает на управляемом элементе input который обрабатывает ввод за счет функции changeSearch и сотояния search, которое передается в пропсу content.
 * 
 * @param {object} param0
 * @param {function} param0.changeSearch 
 * @param {string} param0.content 
 * 
 * @param changeSearch  обработчик для изменения поисковой строки и одновременно делает поиск по совпадениям
 * @param content состояния для передачи в value элемента  input
 * @returns 
 */
export const SearchField = ( { changeSearch, content }  ) => {

	console.log("/searchFiled render...")

	return (
		<div className = "task-header__search-field">
			<input
				type = "search"
				onChange = { changeSearch }
				value = { content }
			/>
		</div>

	)
} 