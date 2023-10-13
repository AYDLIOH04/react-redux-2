import { useDispatch } from "react-redux";
import { deleteTodo, toggleStatus } from "../store/todoSlice";

const TodoItem = ({id, title, completed}) => {
  const dispatch = useDispatch()

  return (
    <li
      className="flex items-center justify-center mx-auto"
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
        className="mr-[8px]"
      />
      <span className={`${completed ? "line-through" : ""}`}>
        {title}
      </span>
      <span onClick={() => dispatch(deleteTodo(id))} className="text-[30px] cursor-pointer  text-red-600 ml-[8px]">&times;</span>
    </li>
  );
}
 
export default TodoItem;