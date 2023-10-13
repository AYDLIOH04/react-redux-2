const InputField = ({text, handleInput, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className="flex justify-center space-x-[25px]">
      <input
        placeholder="Введите дело..."
        className="border-2 rounded-[8px] py-[5px] px-[5px]"
        value={text}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="border-2 rounded-[8px] px-[15px] py-[8px] hover:bg-indigo-400 ease-in duration-300"
      >
        Add Todo
      </button>
    </form>
  );
}
 
export default InputField;