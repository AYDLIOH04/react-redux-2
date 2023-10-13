import { useEffect, useState } from "react";
import "./index.css";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import { useDispatch } from "react-redux";
import { addNewTodo, fetchTodos } from "./store/todoSlice";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "./redux/productsApi";
export default function App() {

  // ? Fetch
  // const [text, setText] = useState("");
  // const dispatch = useDispatch();

  // const addTask = (e) => {
  //   e.preventDefault();
  //   if (text.trim().length) {
  //     dispatch(addNewTodo(text));
  //     setText("");
  //   }
  // };

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  // return (
  //   <div className="mt-[20px] w-[1000px] mx-auto">
  //     <InputField text={text} handleInput={setText} handleSubmit={addTask} />
  //     <TodoList />
  //   </div>
  // );

  // ? RTK Query
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data = [], isLoading } = useGetProductsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async (event) => {
    event.preventDefault()
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap()
  }

  if (isLoading) return <h1 className="text-center">Loading...</h1>;

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value="">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <ul>
        {data.map((item) => (
          <li className="text-center" key={item.id} onClick={() => handleDeleteProduct(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

