import React from 'react';
import editButton from '../images/edit-button.svg';
import addButton from '../images/add-button.svg';
import api from '../utils/Api.js';
import binTop from '../images/bin-top.svg';
import binBottom from '../images/bin-bottom.svg'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userDescription: "",
            userAvatar: "",
            userId: "",
            cards: []
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
        api.getInitialCards().then(
            (list) => {
                this.setState({ cards: list })
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

                <section className="elements">
                    {this.state.cards.map((card, i) => (
                        <div className="element" key={i}>
                            <button className="element__image" onClick={() => {
                                this.props.onCard(card.link)
                            }} style={{ backgroundImage: `url(${card.link})` }} type="button"></button>
                            {(card.owner._id===this.state.userId) ? (
                            <button className="element__delete-button" type="button">
                                <img className="element__bin_top" src={binTop} alt="Удалить" />
                                <img className="element__bin_bottom" src={binBottom} />
                            </button>) : (<></>)}
                            <div className="element__wrapper">
                                <h3 className="element__text">{card.name}</h3>
                                <div className="element__group-wrapper">
                                    <button className="element__group" type="button"></button>
                                    <p className="element__group-number">{card.likes.length}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </>
        )
    }
}

export default Profile;