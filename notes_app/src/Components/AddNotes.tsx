import React, { useState, useEffect } from 'react';
import { useNotes } from './NotesContext';
import { NoteFormProps } from './interfaces';

const NoteForm: React.FC<NoteFormProps> = ({ noteToEdit, setNoteToEdit }) => {
  const { addNote, editNote } = useNotes();
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [content, setContent] = useState(noteToEdit?.content || '');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteToEdit) {
      editNote(noteToEdit.id, { id: noteToEdit.id, title, content });
      setNoteToEdit?.(undefined);
    } else {
      addNote({ id: new Date().toISOString(), title, content });
    }
    setTitle('');
    setContent('');
  };

  return (
    <form id='Add-notes' onSubmit={handleSubmit}>
      <h2>{noteToEdit ? 'Edit Note' : 'Add Note'}</h2><br/>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">{noteToEdit ? 'Edit Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;