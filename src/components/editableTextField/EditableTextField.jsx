import { useContextData } from "../../ComponentsHooks/useContextData";


export const EditableTextField = ({ className, content, field }) => {
	const { changeEditState } = useContextData();

	return (		
			<textarea
				value={content}
				className={className}
				onChange={(e) => {
					changeEditState(field, e.target.value)	
				}}
			></textarea>
	)
			

}