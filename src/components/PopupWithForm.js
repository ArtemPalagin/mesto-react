import React from 'react';


class PopupWithForm extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
        <div className={`popup popup_${this.props.name} ${!this.props.isOpen ? ('popup_closed') : ('popup_opened')}`}>
            <div className="popup__container">
                <button className={`popup__icon popup__${this.props.name}-close-icon popup__close-icon`} type="button" onClick={this.props.closeAllPopups}></button>
                <h2 className="popup__title">{this.props.title}</h2>
                <form className="popup__form" name={this.props.name}>
                    {this.props.children}
                </form>
            </div>
        </div> 
        )
    }
}
export default PopupWithForm;