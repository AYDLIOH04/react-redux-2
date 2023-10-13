import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector(state => state.todos)
  if (todos.status === 'loading') {
    return <h1 className="flex items-center justify-center mx-auto my-5">Loading...</h1>
  }

  if (todos.status === 'rejected') {
    return <h1 className="flex items-center justify-center mx-auto my-5">{todos.error}</h1>
  }

  return (
    <ul>
        {todos.listTodos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            {...todo} 
          />
        ))}
      </ul>
  );
}
 
export default TodoList;