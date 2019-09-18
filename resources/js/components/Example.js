import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TransferForm from './TransferForm'
import TransferItem from './TransferItem'
import Axios from 'axios';

export default class Example extends Component {
    //constructor(){ super(); this.state = { wallet : [] } }
    constructor(){
        super()
        this.state = { wallet : [], transfers : [], form: { description: '', amount: '', wallet_id: '1'} }
        this.handleChange = this.handleChange.bind(this)//we have to initialize the handleChange and binding
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    
    componentWillMount(){
        Axios('/api/wallet').then(Response => {this.setState({ wallet: Response.data}); }).catch(errors => console.log(errors))
        Axios('/api/transfers').then(Response => {this.setState({ transfers: Response.data}); }).catch(errors => console.log(errors)) 
    }
    
    /*
    state = {
        transfer : [
            { id:1, description: 'spotify', total: 5, payed: false },
            { id:2, description: 'internet', total: 50, payed: false },
            { id:3, description: 'gas', total: 12, payed: false },
        ]
    }
    transferCompleted = (id) => console.log(id)//the is is called from TransferItem component*/

    deleteTransfer(id){
        try {
            if(confirm(`Estas seguro?`)){
                this.componentWillUnmount
                Axios(`api/transfer/${id}`, {
                    method: 'delete'
                }).then(this.componentWillMount()).catch(err => console.log(err))
            }
        } catch (error) {}      
    }

    handleSubmit(e){
        e.preventDefault()
        try {
            fetch('api/transfer', {
                method: 'post',
                body: JSON.stringify(this.state.form),
                headers: {'content-type': 'application/json'}
                }).then( this.componentWillMount()).catch(err => console.log(err));
        } catch (error) {}
    }
    handleChange(e){ //handleChange for input form
        this.setState({//setState refresh the component assigned
            form: {
                ...this.state.form,//here is used rest paramethers
            [e.target.name] : e.target.value //we assign the target input value to the target input name
            }
        })
        
    }
    componentDidCatch(){
        console.log('Este es mi error :c')
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="col-md-12 m-t-md">
                            {this.state.wallet.map(cartera => <p className="display-3 text-center" key={cartera.id}>$ {cartera.money}</p>)}
                        </div>                        
                        <TransferForm form={this.state.form} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
                        {this.state.transfers.map(transferencia => < TransferItem key={transferencia.id} transfer={transferencia} onClick={this.deleteTransfer.bind(this)}/>)}
                        {/*<TransferList transfer={this.state.transfer} transferCompleted={this.transferCompleted}/>*/}{/* This will pass the state data('transfer' is the prop name) to the 'TransferList' component */}
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
