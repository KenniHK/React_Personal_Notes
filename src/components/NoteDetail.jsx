import React from "react";
import PropTypes from 'prop-types';

function NoteDetail({ title, body, createdAt }) {
    return (
        <div className="note-detail">
            <h2>{title}</h2><br></br>
            <p>{body}</p><br></br>
            <p>{createdAt}</p><br></br>
        </div>
    );
}

NoteDetail.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
};

export default NoteDetail;
