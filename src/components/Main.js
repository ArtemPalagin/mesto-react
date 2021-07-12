import React from 'react';
import editButton from '../images/edit-button.svg';
import addButton from '../images/add-button.svg';
import api from '../utils/Api.js';

import Card from './Card.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userDescription: "",
            userAvatar: "",
            userId: ""
        }

    }



    componentDidMount() {
        api.getInitialProfile().then(
            (list) => {
                this.setState({ tuserName: list.name, userDescription: list.about, userAvatar: list.avatar, userId: list._id })
            },
            (err) => {
                console.log(err);
            }
        )
    }

    render() {
        return (
            <>
                <section className="profile">
                    <button className="profile__avatar-button" onClick={this.props.onEditAvatar} type="button">
                        <div className="profile__avatar-vector-wrapper">
                            <img className="profile__avatar-vector" src={editButton} alt="Изображение не загрузилось" />
                        </div>
                        <img className="profile__avatar" src={this.state.userAvatar} alt="Не получислось загрузить вашу фотографию" />
                    </button>
                    <div className="profile__intro">
                        <h1 className="profile__username">{this.state.userName}</h1>
                        <button className="profile__edit-button-wrapper" onClick={this.props.onEditProfile} type="button">
                            <img className="profile__edit-button" src={editButton} alt="Редактировать профиль" />
                        </button>
                        <p className="profile__himself">{this.state.userDescription}</p>
                    </div>
                    <button className="profile__add-button-wrapper" onClick={this.props.onAddPlace} type="button">
                        <img className="profile__add-button" src={addButton} alt="Добавить место" />
                    </button>
                </section>

                <Card onCardClick={this.props.onCardClick} userId={this.state.userId} />
            </>
        )
    }
}

export default Main;