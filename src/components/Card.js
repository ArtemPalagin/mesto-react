import React from 'react';
import api from '../utils/Api.js';

import binTop from '../images/bin-top.svg';
import binBottom from '../images/bin-bottom.svg'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }
    componentDidMount() {
        api.getInitialCards().then(
            (list) => {
                this.setState({ cards: list })
            },
            (err) => {
                console.log(err);
            }
        )
    }
    render(){
        return(
            <section className="elements">
                    {this.state.cards.map((card, i) => (
                        <div className="element" key={i}>
                            <button className="element__image" onClick={ () => {this.props.onCardClick(card.link)} } style={{ backgroundImage: `url(${card.link})` }} type="button"></button>
                            {(card.owner._id===this.props.userId) ? (
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
        )
    }
}
export default Card;