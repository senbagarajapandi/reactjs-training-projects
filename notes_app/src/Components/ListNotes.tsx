import React, { useState } from 'react';
import { useNotes } from './NotesContext';
import NoteForm from './AddNotes'
import { Note } from './interfaces'

const NoteList: React.FC = () => {
  const { notes, deleteNote, searchNotes } = useNotes();
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = searchNotes(searchTerm);

  return (
    <div className='container'>
        <NoteForm noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit}/>
        <div className='divider'></div>
        <div id="list-notes">
          <div className='search-container'>
            <h2>Notes</h2><br/>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search notes..."
              className='search-bar'
            />
          </div>
          <div className='display-notes'>
            <div className={notes.length > 0 ?'hidden':'active'}>
              <p>No Data !</p>
            </div>
            <table>
              {filteredNotes.map((note) => (
                <tr key={note.id}>
                  <td><h3>{note.title}</h3>
                  <p>{note.content}</p></td>
                  <td><button onClick={() => setNoteToEdit(note)}>Edit</button>
                  <button onClick={() => deleteNote(note.id)}>Delete</button></td>
                </tr>
              ))}
            </table>
          </div>
        </div>
    </div>
    
  );
};

export default NoteList;