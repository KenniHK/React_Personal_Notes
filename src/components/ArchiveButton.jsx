import React from 'react';
import PropTypes from 'prop-types';

function ArchiveButton({ id, onArchive }) {
  return <button className='note-item__archive-button' onClick={() => onArchive(id)}>Archive</button>
}
 
ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired, 
  onArchive: PropTypes.func.isRequired 
};

export default ArchiveButton;