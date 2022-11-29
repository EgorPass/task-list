import { useContextData } from "../../hooks/useContextData"

/**
 * Компонент отрисовывает поле input для поля описания задач в режиме редактирования
 * 
 * Компонент ставит фокус в поле input елси пропс field === "title".
 * А так же за счет field и editState определяет значение value для input. 
 * 
 * Через контекст принимает changeEditState, editState, делая input управляемым и возможным записывать изменения.
 * 
 * Родительский компонент FieldDescriptionContainer и FieldTitleContainer, в которых определяется класс для стилей.
 * 
 * @param {object} param 
 * @param {string} param.className для задания стилей из от родительского компонента 
 * @param {string} param.field для определения значения value для input
 * @returns 
 */
export const EditTextField = ({ className, field}) => {
	const { changeEditState, editState, setFieldState } = useContextData()	
	const value = editState[field]

	return (
		<textarea
			autoFocus = {field === "title" ? true : false}
			value={value}
			className={className}
			onChange = {(e)=> {changeEditState(field, e.target.value, setFieldState)}}
		>
			
		</textarea>
	)

}