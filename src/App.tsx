import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState([
    { task: "Make an App", completed: true, comment: "Start Now" },
    { task: "Reply To Email", completed: false, comment: "" },
  ]);
  const [input, setInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: string
  ): void => {
    setTodo(
      todo.map((value, ind) => {
        if (type === "checkbox") {
          return index === ind
            ? { ...value, completed: !value.completed }
            : value;
        } else {
          return index === ind ? { ...value, comment: e.target.value } : value;
        }
      })
    );
  };

  const handleDelete = (index: number): void => {
    setTodo(todo.filter((_, ind) => ind !== index));
  };

  const handleAdd = (): void => {
    setTodo([...todo, { task: input, comment: "", completed: false }]);
    setInput("");
  };

  const handleInput = (value: string): void => {
    setInput(value);
  };

  return (
    <>
      <div className='justify-center mx-auto'>
        <div className='mt-10 w-2/5 mx-auto '>
          <div className='font-mono text-5xl'>Simple To-Do App</div>
        </div>
        <div className='bg-amber-200 shadow-2xl rounded-md p-10 mt-10 w-2/5 mx-auto flex-col'>
          {/* body */}
          <div className='mb-5'>
            <div className='font-mono text-3xl flex space-x-2'>
              <input
                className='bg-transparent text-black border border-none focus:outline-none font-mono text-xl3 underline'
                type='text'
                placeholder='Input Task Here!'
                onChange={(e) => handleInput(e.target.value)}
                value={input}
              />
              <button
                disabled={input === "" && true}
                onClick={handleAdd}
                className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono px-4 border border-gray-400 rounded shadow disabled:bg-transparent disabled:border-none disabled:text-transparent disabled:shadow-none'
              >
                Add
              </button>
            </div>
          </div>
          {todo.map((value, index) => {
            return (
              <div
                key={index}
                className='items-center space-x-1 grid grid-cols-12 gap-2 '
              >
                <input
                  type='checkbox'
                  className='appearance-none h-4 w-4 border border-gray-400 checked:bg-black checked:border-transparent focus:outline-none rounded-full col-span-1'
                  checked={value.completed}
                  onChange={(e) => handleChange(e, index, "checkbox")}
                />
                <p className={`font-mono text-xl col-span-5`}>
                  {value.completed ? <s>{value.task}</s> : value.task}
                </p>
                <input
                  type='text'
                  className={`bg-transparent text-black border border-none focus:outline-none font-mono text-xs underline col-span-5`}
                  value={value.comment}
                  onChange={(e) => handleChange(e, index, "text")}
                  placeholder='Comment Here!'
                />
                <button
                  disabled={!value.completed}
                  className={`ml-auto ${
                    value.completed ? "text-red-500" : "text-amber-200"
                  }  font-bold py-2 px-4 rounded col-span-1 `}
                  onClick={() => handleDelete(index)}
                >
                  X
                </button>
              </div>
            );
          })}

          {/* footer */}
          <div className='pt-10 font-mono text-xs'>
            Task Left: {todo.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
