import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: {
                isImagePopupOpen: false,
                cardLink: "",
                cardName: ""
            },
            currentUser: {},
            cards: []
        };
    }


    componentDidMount() {
        Promise.all([
            api.getInitialProfile(),
            api.getInitialCards()
        ])
            .then(([profile, card]) => {
                this.setState({ currentUser: profile, cards: card, ready: true })
            })
            .catch((err) => {
                console.log(err);
            })
            // Вообще функцуию, которая будет срабатывать при отклонении промиса, можно записывать вторым аргументом в then, но я, в любом случае, исправил все на вариант с использованием catch. Если разница между этими способами есть, то я ее не понял
    }
    handleCardLike = (card, profileId) => {
        const isLiked = card.likes.some(i => i._id === profileId);
        if (isLiked) {
            api.deliteLike(card._id).then(
                (newCard) => {
                    const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
                    this.setState({ cards: newCards })
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            api.addLike(card._id).then(
                (newCard) => {
                    const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
                    this.setState({ cards: newCards })
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    handleCardDelete = (card) => {
        api.deliteCard(card._id).then(
            () => {
                // debugger
                const newCards = this.state.cards.filter((c) => c._id === card._id ? false : true);
                this.setState({ cards: newCards })
            }).catch((err) => {
                console.log(err);
            })
    }
    handleAddPlaceSubmit = (card) => {
        api.setNewCard(card.text, card.link).then(
            (newCard) => {
                this.setState({ cards: [newCard, ...this.state.cards] });
                this.closeAllPopups();
            }).catch((err) => {
                console.log(err);
            })
    }

    handleEditAvatarClick = () => {
        this.setState({ isEditAvatarPopupOpen: true });
    };
    handleEditProfileClick = () => {
        // debugger
        this.setState({ isEditProfilePopupOpen: true });
    };
    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    };
    handleCardClick = (link, name) => {
        this.setState({ selectedCard: { isImagePopupOpen: true, cardLink: link, cardName: name } });
    };

    closeAllPopups = () => {
        this.setState({ isEditProfilePopupOpen: false, isAddPlacePopupOpen: false, isEditAvatarPopupOpen: false, selectedCard: { isImagePopupOpen: false, cardLink: "" } });
    };
    handleUpdateUser = (value) => {
        api.setProfileData(value.name, value.about).then((profile) => {
            this.setState({ currentUser: profile })
            this.closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    };
    handleUpdateAvatar = (obj) => {
        api.setAvatar(obj.avatar).then((profile) => {
            this.setState({ currentUser: profile })
            this.closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="body">
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <div className="page">
                        <Header />
                        <Main cards={this.state.cards} onCardDelete={this.handleCardDelete} onCardLike={this.handleCardLike} onCardClick={this.handleCardClick} onEditAvatar={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} />
                        <Footer />
                    </div>

                    {this.state.ready ? <EditProfilePopup onUpdateUser={this.handleUpdateUser} isOpen={this.state.isEditProfilePopupOpen} closeAllPopups={this.closeAllPopups} />
                        : null}

                    <AddPlacePopup onAddPlace={this.handleAddPlaceSubmit} isOpen={this.state.isAddPlacePopupOpen} closeAllPopups={this.closeAllPopups} />


                    <EditAvatarPopup onUpdateAvatar={this.handleUpdateAvatar} isOpen={this.state.isEditAvatarPopupOpen} closeAllPopups={this.closeAllPopups} />



                    {/* <div className="popup popup_deletion popup_closed">
                        <div className="popup__container">
                            <button className="popup__icon popup__deletion-close-icon popup__close-icon" type="button"></button>
                            <h2 className="popup__title">Вы уверены?</h2>
                            <form className="popup__form" name="editprofile">
                                <button className="popup__button" type="submit">Да</button>
                            </form>
                        </div>
                    </div> */}

                    <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}></ImagePopup>
                </CurrentUserContext.Provider>
            </div>
        );
    }
}

export default App;
