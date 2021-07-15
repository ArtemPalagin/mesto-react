import React from 'react';
import editButton from '../images/edit-button.svg';
import addButton from '../images/add-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';


import Card from './Card.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextType = CurrentUserContext;






    render() {
        return (
            <>
                <section className="profile">
                    <button className="profile__avatar-button" onClick={this.props.onEditAvatar} type="button">
                        <div className="profile__avatar-vector-wrapper">
                            <img className="profile__avatar-vector" src={editButton} alt="Изображение не загрузилось" />
                        </div>
                        <img className="profile__avatar" src={this.context.avatar} alt="Не получислось загрузить вашу фотографию" />
                    </button>
                    <div className="profile__intro">
                        <h1 className="profile__username">{this.context.name}</h1>
                        <button className="profile__edit-button-wrapper" onClick={this.props.onEditProfile} type="button">
                            <img className="profile__edit-button" src={editButton} alt="Редактировать профиль" />
                        </button>
                        <p className="profile__himself">{this.context.about}</p>
                    </div>
                    <button className="profile__add-button-wrapper" onClick={this.props.onAddPlace} type="button">
                        <img className="profile__add-button" src={addButton} alt="Добавить место" />
                    </button>
                </section>
                <section className="elements">
                    {this.props.cards.map((card, i) => (
                        <Card key={card._id} onCardDelete={this.props.onCardDelete} onCardLike={this.props.onCardLike} onCardClick={this.props.onCardClick} card={card} />
                    ))}
                </section>

            </>
        )
    }
}

export default Main;