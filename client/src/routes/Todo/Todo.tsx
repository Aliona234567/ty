import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../../app/apiSlice";
import { ITask } from "../../app/type";
import { Task } from "../../components/Tasks/Tasks";
import { useState } from "react";

export const Todo = () => {
  const { data = [], isLoading, isError } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [value, setValue] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTask({ done: false, description: value }).unwrap();
      setValue('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTask = async (task: ITask) => {
    try {
      await updateTask({ ...task }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Add a new task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {data.map((el: ITask) => (
          <Task key={el.id} id={el.id} description={el.description} done={el.done} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        ))}
      </ul>
    </>
  );
};