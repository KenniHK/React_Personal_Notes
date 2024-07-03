import React from "react";
import NoteList from "../components/NoteList";
import { getActiveNotes } from "../utils/api";
import { deleteNote } from "../utils/api";
import { LocaleConsumer } from '../context/LocaleContext';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            notes: [],
        };

        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    }

    async componentDidMount() {
        const { data } = await getActiveNotes();
        
        this.setState(() => {
          return {
            notes: data
          }
        })
      }
    

    onSearchChangeHandler(event) {
        this.setState({
            searchKeyword: event.target.value,
        });
    }

    async onDeleteHandler(id) {
        await deleteNote(id);
        const { data  } = await getActiveNotes();
        this.setState(() => {
          return {
            notes: data,
          }
        });
      }

    onArchiveHandler(id) {
        const notes = this.state.notes.map((note) => {
            if (note.id === id) {
                return { ...note, archived: true };
            }
            return note;
        });
        this.setState({ notes });
    }

    onUnarchiveHandler(id) {
        const notes = this.state.notes.map((note) => {
            if (note.id === id) {
                return { ...note, archived: false };
            }
            return note;
        });
        this.setState({ notes });
    }

    render() {
        const { searchKeyword, notes} = this.state;


        const filteredNotes = searchKeyword.trim() === '' ? notes : notes.filter((note) => note.title.includes(searchKeyword));
        const activeNotes = filteredNotes.filter((note) => !note.archived);
        const archivedNotes = filteredNotes.filter((note) => note.archived);

        return (
            <LocaleConsumer>
            {
              ({ locale }) => {
                return (
            <div className="note-app">
                <input
                    type="text"
                    placeholder={locale === 'id' ? 'Cari Catatan' : 'Search Notes'}
                    value={searchKeyword}
                    onChange={this.onSearchChangeHandler}
                />
                <h2>{locale === 'id' ? 'Note Aktif' : 'Active Notes'}</h2>
                <br />
                {activeNotes.length === 0 ? (
                    <p>{locale === 'id' ? 'Tidak ada catatan yang ditemukan.' : 'No notes found.'}</p>
                ) : (
                    <NoteList notes={activeNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                )}
                <br />
                <h2>{locale === 'id' ? 'Arsip Catatan' : 'Notes Archive'}</h2>
                <br />
                <NoteList notes={archivedNotes} onDelete={this.onDeleteHandler} onArchive={this.onUnarchiveHandler} />
            </div>
                )
              }
            }
            
                 </LocaleConsumer>
        );
    }
}

export default HomePage;
