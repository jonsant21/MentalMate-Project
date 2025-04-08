import React, { useState, useEffect } from 'react';
import { FaPen, FaTrashAlt, FaPlus } from 'react-icons/fa';
import '../styles/Journaling.css';

function Journaling() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [expandedEntries, setExpandedEntries] = useState({});

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch('http://localhost:8081/journal', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch entries');
        const data = await response.json();
        setJournalEntries(data);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchJournalEntries();
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleEntryChange = (e) => setEntry(e.target.value);

  const handleCreateNewEntryClick = () => {
    setIsCreating(true);
    setEditingIndex(null);
    setTitle('');
    setEntry('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTitle = (title || '').trim();
    const newEntry = (entry || '').trim();

    const entryData = {
      title: newTitle !== '' ? newTitle : (editingIndex !== null && journalEntries[editingIndex]?.TITLE) || '',
      entry: newEntry,
    };

    try {
      if (editingIndex !== null && journalEntries[editingIndex]) {
        // Update existing entry
        const journalID = journalEntries[editingIndex].ID;
        const response = await fetch('http://localhost:8081/journal/update-journal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...entryData, journalID }),
        });

        if (!response.ok) throw new Error('Failed to update entry');
        const updatedEntry = await response.json();

        const updatedEntries = [...journalEntries];
        updatedEntries[editingIndex] = updatedEntry;
        setJournalEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        // Create new entry
        const response = await fetch('http://localhost:8081/journal/save-journal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(entryData),
        });

        if (!response.ok) throw new Error('Failed to save entry');
        const savedEntry = await response.json();
        setJournalEntries([savedEntry, ...journalEntries]);
      }

      setIsCreating(false);
      setTitle('');
      setEntry('');
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  const handleEdit = (index) => {
    const entryToEdit = journalEntries[index];
    setTitle(entryToEdit.title || entryToEdit.TITLE);
    setEntry(entryToEdit.entry || entryToEdit.CONTENT);
    setEditingIndex(index);
    setIsCreating(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this journal entry?')) return;

    try {
      const entryId = journalEntries[index].ID;
      const response = await fetch(`http://localhost:8081/journal/delete-journal/${entryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete entry');

      setJournalEntries(journalEntries.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setEntry('');
    setEditingIndex(null);
    setIsCreating(false);
  };

  const toggleExpand = (index) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="journaling-container">
      <h1>Journaling</h1>

      {!isCreating && editingIndex === null && (
        <>
          {journalEntries.length === 0 ? (
            <p>You haven't written any journal entries yet.</p>
          ) : (
            <div className="journal-records">
              <h2>Your Journal Entries</h2>
              {journalEntries.map((entryItem, index) => (
                <div key={entryItem.ID || index} className="journal-record">
                  <div className="journal-header" onClick={() => toggleExpand(index)}>
                    <h3 className="journal-title">{entryItem.title || entryItem.TITLE || 'Untitled Entry'}</h3>
                    <div className="journal-header-right">
                      <p className="journal-date">
                        Created on: <br />
                        {new Date(entryItem.WRITE_DATE || entryItem.date).toLocaleDateString()}
                      </p>
                      <div className="journal-actions" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleEdit(index)} className="edit-button">
                          <FaPen />
                        </button>
                        <button onClick={() => handleDelete(index)} className="delete-button">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                  {expandedEntries[index] && (
                    <div className="journal-details">
                      <p className="journal-text">{entryItem.entry || entryItem.CONTENT}</p>
                    </div>
                  )}
                </div>
              ))}
              <button onClick={handleCreateNewEntryClick} className="add-entry-button">
                <FaPlus />
              </button>
            </div>
          )}
        </>
      )}

      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className={editingIndex !== null ? 'edit-entry-form' : 'create-entry-form'}
        >
          <label htmlFor="title">
            {editingIndex !== null ? 'Edit Title (Optional):' : 'Title (Optional):'}
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title for your journal entry"
          />
          <label htmlFor="entry">
            {editingIndex !== null ? 'Edit Journal Entry:' : 'Journal Entry:'}
          </label>
          <textarea
            id="entry"
            value={entry}
            onChange={handleEntryChange}
            placeholder="Write your journal entry here"
            required
          />
          <div className="form-buttons">
            <button
              type="submit"
              className={editingIndex !== null ? 'edit-submit-button' : 'submit-button'}
            >
              {editingIndex !== null ? 'Update Entry' : 'Save Entry'}
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Journaling;
