"use client"
import React, { ChangeEvent, useState, MouseEvent } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null); // Estado para controlar o índice da task em edição
  const [editedTask, setEditedTask] = useState<string>(''); // Estado para armazenar o texto editado da task

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleNewTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (indexToDelete: number) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const handleEditTask = (index: number) => {
    setEditIndex(index);
    setEditedTask(tasks[index]); // Preenche o formulário de edição com o texto atual da task
  };

  const handleSaveEditedTask = () => {
    if (editedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex as number] = editedTask;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditedTask('');
    }
  };

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
            onChange={handleSearchChange}
          />
          <button
            className="p-2 bg-red-500 text-white rounded-r-lg"
            onClick={handleNewTask}
          >
            Add
          </button>
        </form>

        <hr className="mb-4" />

        <div className="max-h-96 overflow-y-auto space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="pl-8 flex flex-row justify-between items-center p-2 bg-gray-200 rounded-lg">
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
                />
              ) : (
                <p>{task}</p>
              )}
              <div>
                {editIndex === index ? (
                  <button
                    className="p-2 bg-green-500 text-white rounded-lg mr-2"
                    onClick={handleSaveEditedTask}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="p-2 bg-red-500 text-white rounded-lg mr-2"
                    onClick={() => handleEditTask(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="p-2 bg-red-500 text-white rounded-lg"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
