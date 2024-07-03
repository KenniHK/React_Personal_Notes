import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPageWrapper from "../pages/DetailPage";
import NewNotePage from "../pages/NewNotePage";
import Navigation from "../components/Navigation";
import { getActiveNotes, addNote } from "../utils/api";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from '../utils/api';
import { ThemeProvider } from "../context/ThemeContext";
import ToggleTheme from "../components/ToggleTheme";
import Loading from "../components/Loading";
import { LocaleProvider } from '../context/LocaleContext';


class App extends React.Component {
    constructor(props) {
                super(props);
                this.state = {
                    authedUser: null,
                    initializing: true,
                    theme: localStorage.getItem('theme') || 'light',
                    isLoading: false,
                    notes: [],
                    localeContext: {
                      locale: localStorage.getItem('locale') || 'id',
                      toggleLocale: this.toggleLocale.bind(this),
                  }
                };

                this.onLoginSuccess = this.onLoginSuccess.bind(this);
                this.onLogout = this.onLogout.bind(this);
                this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
                this.onDeleteHandler = this.onDeleteHandler.bind(this);
                this.onArchiveHandler = this.onArchiveHandler.bind(this);
                this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
                this.toggleTheme = this.toggleTheme.bind(this);
                this.toggleLocale = this.toggleLocale.bind(this);
            }

            componentDidUpdate(prevProps, prevState) {
              if (prevState.theme !== this.state.theme) {
                document.documentElement.setAttribute('data-theme', this.state.theme);
              }
            }
      
          toggleTheme() {
              this.setState((prevState) => {
                const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                  return {
                    theme: newTheme
                  };
              });
          }

          toggleLocale() {
            this.setState((prevState) => {
              const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
              localStorage.setItem('locale', newLocale);
                return {
                    localeContext: {
                        ...prevState.localeContext,
                        locale: newLocale
                    }
                }
            });
        }

            onLogout() {
                this.setState(() => {
                  return {
                    authedUser: null
                  }
                });
                putAccessToken('');
              }

                async onLoginSuccess({ accessToken }) {
                  this.setState({ isLoading: true });
                    putAccessToken(accessToken);
                    const { data } = await getUserLogged();
                    this.setState(() => {
                      return {
                        authedUser: data,
                        isLoading: false,
                      };
                    });
                    this.fetchNotes(); 
                  }

                  async fetchNotes() {
                    this.setState({ isLoading: true });
                    const { data } = await getActiveNotes();
                        this.setState(() => {
                            return {
                                notes: data,
                                isLoading: false 
                            };
                        });
                    }
                

                  async componentDidMount() {
                    this.setState({ isLoading: true });
                    document.documentElement.setAttribute('data-theme', this.state.theme);
                    const { data } = await getUserLogged();
                    this.setState(() => {
                      return {
                        authedUser: data,
                        initializing: false,
                        isLoading: false,
                      };
                    });
                    if (data) {
                      this.fetchNotes();  
                  }
              }
                
        
            onAddNoteHandler({ title, noteBody }) {
                const newNote = {
                    id: "notes-" + new Date(),
                    title: title,
                    body: noteBody,
                    archived: false,
                    createdAt: new Date().toISOString(),
                };
        
                this.setState((prevState) => {
                    return {
                        notes: [...prevState.notes, newNote],
                    };
                });
            }
        
            onDeleteHandler(id) {
                const notes = this.state.notes.filter((note) => note.id !== id);
                this.setState({ notes });
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
                if (this.state.initializing) {
                    return null;
                  }

                if (this.state.authedUser === null) {
                    return (
                      <LocaleProvider value={this.state.localeContext}>
                      <div>
                        <header>
                          <h1 className="headApp">Aplikasi Note</h1>
                        </header>
                        <main>
                            <Router>
                          <Routes>
                          <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                            <Route path="/register" element={<RegisterPage />} />
                          </Routes>
                          </Router>
                        </main>
                      </div>
                      </LocaleProvider>
                    )
                  }

                return (
                  <LocaleProvider value={this.state.localeContext}>
                    <Router>
                      <ThemeProvider value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}>
                        <div className="note-app">
                        <ToggleTheme />
                            <h1 className="note-app__header h1">{this.state.localeContext.locale === 'id' ? 'Daftar Catatan' : 'Notes List'}</h1><br></br>
                            <Navigation logout={this.onLogout} name={this.state.authedUser.name} />
                            <main>
                            {this.state.isLoading && <Loading />}
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <HomePage
                                                notes={this.state.notes}
                                                onDelete={this.onDeleteHandler}
                                                onArchive={this.onArchiveHandler}
                                                onUnarchive={this.onUnarchiveHandler}
                                            />
                                        }
                                    />
                                    <Route path="/notes/:id" element={<DetailPageWrapper />} />
                                    <Route
                                        path="/notes/new"
                                        element={<NewNotePage addNote={this.onAddNoteHandler} />}
                                    />
                                   <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </main>
                        </div>
                        </ThemeProvider>
                    </Router>
                    </LocaleProvider>
                );
            }
        }

export default App;
