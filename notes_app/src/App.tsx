import React from 'react';
import { NotesProvider } from './Components/NotesContext';
import NoteForm from './Components/AddNotes';
import NoteList from './Components/ListNotes';

const App: React.FC = () => {
  return (
    <NotesProvider>
        <h1>Notes App</h1>
        <NoteList />
    </NotesProvider>
  );
};

export default App;