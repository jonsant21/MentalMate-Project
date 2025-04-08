import React, { useState } from 'react';
import { FaPen, FaTrashAlt, FaPlus } from 'react-icons/fa';
import '../styles/Journaling.css';

function Journaling() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [expandedEntries, setExpandedEntries] = useState({});

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleEntryChange = (e) => setEntry(e.target.value);

  const handleCreateNewEntryClick = () => {
    setIsCreating(true);
    setEditingIndex(null);
    setTitle('');
    setEntry('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { title, entry, date: new Date().toLocaleDateString() };

    if (editingIndex !== null) {
      const updatedEntries = [...journalEntries];
      updatedEntries[editingIndex] = newEntry;
      setJournalEntries(updatedEntries);
      setEditingIndex(null);
    } else {
      setJournalEntries([newEntry, ...journalEntries]);
    }

    setTitle('');
    setEntry('');
    setIsCreating(false);
  };

  const handleEdit = (index) => {
    const entryToEdit = journalEntries[index];
    setTitle(entryToEdit.title);
    setEntry(entryToEdit.entry);
    setEditingIndex(index);
    setIsCreating(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this Journal Entry?')) {
      const updatedEntries = journalEntries.filter((_, i) => i !== index);
      setJournalEntries(updatedEntries);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setEntry('');
    setEditingIndex(null);
    setIsCreating(false);
  };

  // Toggle expand/collapse for the entry contents
  const toggleExpand = (index) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="journaling-container">
      <h1>Journaling</h1>

      {/* Only show list if not creating/editing */}
      {editingIndex === null && !isCreating && (
        <>
          {journalEntries.length === 0 ? (
            <div className="no-entries-message">
              <h2>Your Journal Entries</h2>
              <p>You have zero journal entries.</p>
              <button onClick={handleCreateNewEntryClick} className="create-entry-button">
                Create New Journal Entry
              </button>
            </div>
          ) : (
            <div className="journal-records">
              <h2>Your Journal Entries</h2>
              {journalEntries.map((entryItem, index) => (
                <div key={index} className="journal-record">
                  {/* Header row: Title on the left, date + buttons on the right */}
                  <div className="journal-header" onClick={() => toggleExpand(index)}>
                    <h3 className="journal-title">
                      {entryItem.title || 'Untitled Entry'}
                    </h3>

                    {/* Right side: date and action buttons */}
                    <div className="journal-header-right">
                      <p className="journal-date">{entryItem.date}</p>

                      {/* Stop propagation so clicking icons doesn't toggle expand */}
                      <div
                        className="journal-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleEdit(index)}
                          className="edit-button"
                        >
                          <FaPen />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="delete-button"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedEntries[index] && (
                    <div className="journal-details">
                      <p className="journal-text">{entryItem.entry}</p>
                    </div>
                  )}
                </div>
              ))}
              {/* "+" icon to add a new entry */}
              <button onClick={handleCreateNewEntryClick} className="add-entry-button">
                <FaPlus />
              </button>
            </div>
          )}
        </>
      )}

      {/* Create or edit form */}
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
            {editingIndex !== null && (
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Journaling;