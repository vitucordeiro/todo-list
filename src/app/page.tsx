"use client"; // Necessário para permitir uso de hooks no Next.js (se aplicável)

import { ChangeEvent, useState, MouseEvent } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]); // Inicializa o estado das tarefas como array vazio de strings
  const [newTask, setNewTask] = useState<string>(''); // Estado para controlar o valor do input
  const [editTask,setEditTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("")

  // Manipula a mudança de texto no input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  // Adiciona nova tarefa na lista
  const handleNewTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão de recarregar a página
    if (newTask.trim() !== '') { // Verifica se a nova tarefa não está vazia
      setTasks([...tasks,newTask]); // Adiciona a nova tarefa ao array de tarefas
      setNewTask(''); // Limpa o campo de input após adicionar
    }
  };
  const handleDeleteTask = (indexToDelete:number) =>{

    setTasks(tasks.filter((_, index) => index != indexToDelete));


  }

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-blue-600">
      <div className="h-[70vh] w-[80vh] bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Things to do:</h1>
        
        <form className="flex mb-4">
          <input
            className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none"
            placeholder="Type a new task"
            type="text"
            aria-label="New task"
            value={newTask}
            onChange={handleSearchChange} // Atualiza o estado `newTask` ao digitar
          />
          <button
            className="p-2 bg-red-500 text-white rounded-r-lg"
            onClick={handleNewTask} // Adiciona a nova tarefa ao clicar
          >
            new
          </button>
        </form>

        <hr className="mb-4" />

        {/* Área de tarefas com barra de rolagem quando necessário */}
        <div className="max-h-96 overflow-y-auto space-y-2 ">
          {tasks.map((task, index) => (
            
              <div key={index} className="pl-8 flex flex-row justify-between items-center p-2 bg-gray-200 rounded-lg">
                <p>{task}</p>
                <button
                className="p-2 bg-red-500 text-white rounded-lg"
                onClick={()=>{handleDeleteTask(index)}}
              >
                delete
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded-lg"
                onClick={()=>{
                  <div>
                    <p>teste</p>
                  </div>
                }}
              >
                edit
              </button>
              </div>

      
            
          ))}
        </div>
      </div>
    </main>
  );
}

