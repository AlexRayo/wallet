import React, { Component } from 'react'
import PropType from 'prop-types'
export default class TransferItem extends Component {
    
    //Dynamic styles; this one for the transfer list if payed
    payedStyle = () => {
        return {
            //css style con jsx have to be cammel case type and separated by coma not semicolon
            color: '',
            //textDecoration: this.props.transfer.payed ? 'line-through' : 'none'
        }
    }
    //This method as an arrow function allows u access the prop without binding it like: onChange={this.transferCompleted.bind(this)} 
    
    render() {
        return (
            <div style={this.payedStyle()}>
                <p>
                    {/*onChange property will look for a method */}
                    {/* We bind the prop for passing the id as paramather. the first bind's paramether have to be 'this' to reference itself */}
                    {/*<input type="checkbox" onChange={this.props.transferCompleted.bind(this, this.props.transfer.key)} />*/}
                    {this.props.transfer.description} | {this.props.transfer.amount} <a className="btn-sm btn-danger" onClick={this.props.onClick.bind(this, this.props.transfer.id)}>x</a>
                </p>
            </div>
        )
    }
}

//PropTypes
TransferItem.propType = {
    transfers : PropType.object.isRequired
}
