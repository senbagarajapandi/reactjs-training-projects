import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Note, NotesContextType } from './interfaces'

// Create context with default value of undefined
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Create a provider component
export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Add a new note
  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  // Edit an existing note
  const editNote = (id: string, updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  // Delete a note by id
  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Search notes by title or content
  const searchNotes = (keyword: string): Note[] => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase()) ||
      note.content.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, editNote, deleteNote, searchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use the NotesContext
export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
