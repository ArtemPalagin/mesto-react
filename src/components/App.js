import React from 'react';

import Header from './Header.js';
import Profile from './Profile.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isImagePopupOpen: false,
            selectedCard: ""
        };

    }

    handleEditAvatarClick = () => {
        this.setState({ isEditAvatarPopupOpen: true });
    };
    handleEditProfileClick = () => {
        this.setState({ isEditProfilePopupOpen: true });
    };
    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    };
    handleCardClick = (link) => {
        this.setState({ isImagePopupOpen: true, selectedCard: link });
    }

    closeAllPopups = () => {
        this.setState({ isEditProfilePopupOpen: false, isAddPlacePopupOpen: false, isEditAvatarPopupOpen: false, isImagePopupOpen: false });
    };
    render() {
        return (
            <div className="body">

                <div className="page">
                    <Header />
                    <Profile onCard={this.handleCardClick} onEditAvatar={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} />
                    <Footer />
                </div>

                <PopupWithForm name="profile" title="Редактировать профиль" isOpen={this.state.isEditProfilePopupOpen} closeAllPopups={this.closeAllPopups}>
                    <input className="popup__entry popup__username-profile" id="username-input" type="text" placeholder="Имя" name="firstname" required minLength="2" maxLength="40" />
                    <span className="username-input-error popup__span popup__input-error"></span>
                    <input className="popup__entry popup__himself-profile" id="himself-input" type="text" placeholder="Кем являетесь" name="lastname" required minLength="2" maxLength="200" />
                    <span className="himself-input-error popup__span popup__input-error"></span>
                    <button className="popup__button" type="submit">Сохранить</button>
                </PopupWithForm>

                <PopupWithForm name="places" title="Новое место" isOpen={this.state.isAddPlacePopupOpen} closeAllPopups={this.closeAllPopups}>
                    <input className="popup__entry popup__name-places" id="name-input" type="text" placeholder="Название" name="firstname" required minLength="2" maxLength="30" />
                    <span className="name-input-error popup__span popup__input-error"></span>
                    <input className="popup__entry popup__link-places" id="link-input" type="url" placeholder="Ссылка на картинку" name="lastname" required />
                    <span className="link-input-error popup__span popup__input-error"></span>
                    <button className="popup__button" type="submit">Создать</button>
                </PopupWithForm>


                <PopupWithForm name="avatar" title="Обновить аватар" isOpen={this.state.isEditAvatarPopupOpen} closeAllPopups={this.closeAllPopups}>
                    <input className="popup__entry" id="avatar-input" type="text" placeholder="ссылка на фото" name="firstname" required />
                    <span className="avatar-input-error popup__span popup__input-error"></span>
                    <button className="popup__button" type="submit">Сохранить</button>
                </PopupWithForm>


                <div className="popup popup_deletion popup_closed">
                    <div className="popup__container">
                        <button className="popup__icon popup__deletion-close-icon popup__close-icon" type="button"></button>
                        <h2 className="popup__title">Вы уверены?</h2>
                        <form className="popup__form" name="editprofile">
                            <button className="popup__button" type="submit">Да</button>
                        </form>
                    </div>
                </div>
                
                <ImagePopup link={this.state.selectedCard} isOpen={this.state.isImagePopupOpen} closeAllPopups={this.closeAllPopups}></ImagePopup>
            </div>
        );
    }
}

export default App;
