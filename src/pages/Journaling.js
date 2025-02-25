import React, { useState } from 'react';
import '../styles/Journaling.css';
import { FaPen, FaTrashAlt } from 'react-icons/fa'; // Import icons for Edit and Delete

function Journaling() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // To track which entry is being edited

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleEntryChange = (e) => setEntry(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // If we're editing an existing entry
      const updatedEntries = [...journalEntries];
      updatedEntries[editingIndex] = { title, entry, date: new Date().toLocaleDateString() };
      setJournalEntries(updatedEntries);
      setEditingIndex(null); // Reset the editing state
    } else {
      // Add new entry
      const newEntry = { title, entry, date: new Date().toLocaleDateString() };
      setJournalEntries([newEntry, ...journalEntries]);
    }

    setTitle('');
    setEntry('');
  };

  const handleEdit = (index) => {
    const entryToEdit = journalEntries[index];
    setTitle(entryToEdit.title);
    setEntry(entryToEdit.entry);
    setEditingIndex(index); // Set which entry is being edited
  };

  const handleDelete = (index) => {
    const updatedEntries = journalEntries.filter((_, i) => i !== index);
    setJournalEntries(updatedEntries);
  };

  return (
    <div className="journaling-container">
      <h1>Journaling</h1>

      {/* Form to add or edit journal entries */}
      <form onSubmit={handleSubmit} className="journaling-form">
        <label htmlFor="title">Title (Optional):</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title for your journal entry"
        />

        <label htmlFor="entry">Journal Entry:</label>
        <textarea
          id="entry"
          value={entry}
          onChange={handleEntryChange}
          placeholder="Write your journal entry here"
          required
        />

        <button type="submit" className="submit-button">{editingIndex !== null ? 'Update Entry' : 'Save Entry'}</button>
      </form>

      {/* Display all journal entries */}
      <div className="journal-records">
        <h2>Your Journal Entries</h2>
        {journalEntries.length === 0 ? (
          <p>No journal entries yet. Start writing!</p>
        ) : (
          journalEntries.map((entry, index) => (
            <div key={index} className="journal-record">
              <div className="journal-header">
                <h3 className="journal-title">{entry.title || 'Untitled Entry'}</h3>
                <div className="journal-actions">
                  <button onClick={() => handleEdit(index)} className="edit-button">
                    <FaPen />
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete-button">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
              <p className="journal-date">{entry.date}</p>
              <p className="journal-text">{entry.entry}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Journaling;
