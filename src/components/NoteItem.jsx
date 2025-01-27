import React from "react";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import PropTypes from 'prop-types';

function NoteItem({title, body, createdAt, id, onDelete, onArchive}) {
    return (
        <div className="note-item">
            <NoteItemBody id={id} title={title} body={body} createdAt={createdAt}/>
            <DeleteButton id={id} onDelete={onDelete} />
            <ArchiveButton id={id} onArchive={onArchive} />
        </div>
    );
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired, 
    body: PropTypes.string.isRequired, 
    createdAt: PropTypes.string.isRequired, 
    id: PropTypes.string.isRequired, 
    onDelete: PropTypes.func.isRequired, 
    onArchive: PropTypes.func.isRequired 
};

export default NoteItem;