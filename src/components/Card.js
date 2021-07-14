import React from 'react';

import binTop from '../images/bin-top.svg';
import binBottom from '../images/bin-bottom.svg'

class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="element">
                <button className="element__image" onClick={() => { this.props.onCardClick(this.props.card.link, this.props.card.name) }} style={{ backgroundImage: `url(${this.props.card.link})` }} type="button"></button>
                {(this.props.card.owner._id === this.props.userId) ? (
                    <button className="element__delete-button" type="button">
                        <img className="element__bin_top" src={binTop} alt="Удалить" />
                        <img className="element__bin_bottom" src={binBottom} />
                    </button>) : (<></>)}
                <div className="element__wrapper">
                    <h3 className="element__text">{this.props.card.name}</h3>
                    <div className="element__group-wrapper">
                        <button className="element__group" type="button"></button>
                        <p className="element__group-number">{this.props.card.likes.length}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Card;