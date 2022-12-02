import { Title } from "../title/Title";
import { Checkbox } from "../checkbox/Checkbox";
import { useContextData } from "../../ComponentsHooks/useContextData"
import { FileAnchor } from "../fileAnchor/FileAnchor";

import '../../styles/task-item.scss';

/**
 * Компонент контейнер, для отрисовки чекбокса задачи и названия задачи в отдельной линии списка задач.
 * 
 * Принимает в пропсы объект массива tasks 
 * 
 * Отрисовывает компоненты Checkbox и Title.
 * 
 * Через контекст принимает функцию setModeForTitle, которая создает модификотр для пропса className компонента Title.
 * 
 * Родительский компонент TaskContainer.
 * 
 * @param {object} param
 * @param {string | number} param.id индификатор задачи (обекта из массива taskState), использутся для передачи в дочерние компоненты для их обработчиков кликов,
 * @param {string} param.title название задачи, передается в Title,
 * @param {boolean} param.isComplite состояние готовности выполнения задачи, используется в функции setModeForTitle для создания модификатора пропса className компонента Title.
 * @param {string | number} param.deadline дата до которай нужно выплнить задачу, используется в функции setModeForTitle для создания модификатора пропса className компонента Title.
 * @returns 
 */
export const TaskItemList = ({ id, title, isComplite, deadline, files }) => {

	const { setModeForTitle } = useContextData();
	const classNameMod = setModeForTitle (deadline, isComplite)
		
	return (
		<>
			<Checkbox
				id = {id}
				isComplite={isComplite}
				className = "task-item__checkbox"
				/>
			<Title
				id={id}
				title={title}
				className={`task-item__title task-item__title_${classNameMod}`}
				/>

			{
				files && <FileAnchor />
			}
		</>
	)
}