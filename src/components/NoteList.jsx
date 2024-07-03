import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from 'prop-types';

function NoteList({notes, onDelete, onArchive}) {
    return (
        <div className="notes-list">
            {
                 notes.map((note) => (
                    <NoteItem 
                    key={note.id} 
                    id={note.id}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    {...note}/>
                ))
            }
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({ 
        id: PropTypes.string.isRequired, 
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired, 
        createdAt: PropTypes.string.isRequired, 
        archived: PropTypes.bool.isRequired 
    })).isRequired,
    onDelete: PropTypes.func.isRequired, 
    onArchive: PropTypes.func.isRequired 
};


export default NoteList;