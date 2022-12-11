import { memo } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useGetStore } from "../../redux/reduxHooks/useGetStore"

/**
 * Мемоизированный компонент для отрисовки лоадера ожидания
 * 
 * Или строит фразу о создании первой задачи
 */
export const TaskContainerLoader =
	// memo(
	( { state, content } ) => {
		
		console.log("three dots render ....")
		console.log( "   ... TaskContainerLoader's state: ", state )

		const { tasks } = useGetStore()

		return (
			<div className = "task-body__content-container-loader">
				
				{ 
					(state === '' || tasks.length === 0 )  &&
					<div className = "task-body__content-container-begin">
						{ content }
					</div>
				}
				
				<ThreeDots
					height = "35"
					width = "50" 
					radius = "9"
					color = "#4fa94d"
					// color="gray" 
					
					ariaLabel = "three-dots-loading"
					wrapperStyle = { {} }
					wrapperClassName = ""
					visible = { state === "loading"}
				/>
			</div>
		)
	} 
// )