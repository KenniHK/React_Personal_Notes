import React from 'react';
import { addNote } from '../utils/api';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            noteBody: '',
            maxTitleLength: 50,
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onNoteBodyChangeEventHandler = this.onNoteBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        const inputTitle = event.target.value;
        if (inputTitle.length <= this.state.maxTitleLength) {
            this.setState({
                title: inputTitle,
            });
        }
    }

    onNoteBodyChangeEventHandler(event) {
        this.setState({
            noteBody: event.target.value,
        });
    }

    async onSubmitEventHandler(event) {
        event.preventDefault();
        try {
            const response = await addNote({
                title: this.state.title,
                body: this.state.noteBody,
            });

            if (!response.error) {
                console.log('Note created successfully:', response.data);
                this.setState({
                    title: '',
                    noteBody: '',
                });
            } else {
                console.error('Failed to create note');
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
    }

    render() {
        const { title, noteBody, maxTitleLength } = this.state;
        const remainingChars = maxTitleLength - title.length;

        return (
            <form className="note-input" onSubmit={this.onSubmitEventHandler}>
                <input
                    type="text"
                    placeholder="Judul"
                    value={title}
                    onChange={this.onTitleChangeEventHandler}
                />
                <div>{remainingChars} karakter tersisa</div>
                <input
                    type="text"
                    placeholder="Masukan Catatan"
                    value={noteBody}
                    onChange={this.onNoteBodyChangeEventHandler}
                />
                <button type="submit">Tambah</button>
            </form>
        );
    }
}

export default NoteInput;
