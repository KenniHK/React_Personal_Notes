import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showFormattedDate } from "../utils/api";

function NoteItemBody ({id, title, body, createdAt}) {
    return (
    <div className="note-item__content">
        <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
    <p className="note-item__body">{body}</p>
    <p className="note-item__date">{showFormattedDate(createdAt)}</p>
  </div>
    );
}

NoteItemBody.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default NoteItemBody;