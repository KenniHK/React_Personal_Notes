import React from "react";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { addNote } from "../utils/api";

function NewNotePage() {
    const navigate = useNavigate();

    async function onAddNoteHandler(note) {
        const { error, data } = await addNote({
            title: note.title,
            body: note.body
        });

        if (!error) {
            navigate('/');
        } else {
            console.error("Failed to add note:", data);
        }
    }

    return (
        <div className="new-note-page">
            <NoteInput addNote={onAddNoteHandler} />
        </div>
    );
}

NewNotePage.propTypes = {
    addNote: PropTypes.func.isRequired 
};

export default NewNotePage;
