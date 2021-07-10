import React from 'react';

class ImagePopup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`popup image-popup ${!this.props.isOpen ? ('popup_closed') : ('popup_opened')}`}>
                <div className="image-popup__wrapper">
                    <button className="popup__icon image-popup__close-icon" onClick={this.props.closeAllPopups}></button>
                    <img className="image-popup__image" src={this.props.link} alt="Не получислось загрузить картинку места" />
                    <h3 className="image-popup__text"></h3>
                </div>
            </div>
        )
    }
}
export default ImagePopup;