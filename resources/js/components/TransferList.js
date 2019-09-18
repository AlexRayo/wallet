import React, { Component } from 'react'
import TransferItem from './TransferItem'
import PropTypes from 'prop-types'
export default class TransferList extends Component {
    
    render() {
        //we can return a mapping prop of this component; wich is going to loop each data on 'state' all this like a 'for each' loop
        return this.props.transfers.map ( (transferencia)=>(
           //a key is required for data management, usually the id
           <TransferItem key={transferencia.id} transfer={transferencia} transferCompleted={this.props.transferCompleted} />//here we passes the prop to TransferItem 
        ));
    }
}
//PropTypes is used for validating on component's props
TransferList.propTypes = {
    transfers: PropTypes.array.isRequired//'array' is the type of this prop
}