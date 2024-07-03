import React from 'react';
import NoteDetail from '../components/NoteDetail';
import { getNote } from '../utils/api';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function DetailPageWrapper() {
    const { id } = useParams();
    return <DetailPage id={id} />;
  }

class DetailPage extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      note: null,
      loading: true,
  };
}

  async componentDidMount() {
        const { error, data } = await getNote(this.props.id);
        if (!error) {
            this.setState({ note: data, loading: false });
        } else {
            this.setState({ note: null, loading: false });
        }
    }

render() {
  const { note, loading } = this.state;

  if (loading) {
      return <p>Loading...</p>;
  }

  if (!note) {
      return <p>Tidak ada Note!</p>;
  }

  return (
      <section>
          <div className='detail-gap'>
              <NoteDetail {...note} />
          </div>
      </section>
  );
}
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired 
};

export default DetailPageWrapper;
