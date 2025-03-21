import React, { useState } from 'react';
import s from './Task.module.css';
import { ITask } from '../../app/type';

interface TaskProps extends ITask {
  onUpdate: (task: ITask) => void;
  onDelete: (id: string) => void;
}

export const Task = ({ id, title, description, done, onUpdate, onDelete }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  // Обработчик переключения состояния "выполнено"
  const handleToggleDone = () => {
    onUpdate({ ...{ id, title, description, done: !done } }); // передаем все значения в обработчик
  };

  // Обработчик начала редактирования
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Обработчик сохранения изменений
  const handleSave = () => {
    onUpdate({ ...{ id, title: editedTitle, description: editedDescription, done } }); // передаем все значения в обработчик
    setIsEditing(false);
  };

  // Обработчик удаления задачи
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className={s.task}>
      <input type="checkbox" checked={done} onChange={handleToggleDone} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <span>{title}</span>
          <span>{description}</span>
        </>
      )}
      <div className={s.actions}>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};
