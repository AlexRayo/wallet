import React, {Component} from 'react';

class TransferForm extends Component{
    render() {
        return (
    <form className="form-inline justify-content-center" onSubmit={this.props.onSubmit}>
        <div className="form-group mb-2">
            <input className="form-control" type="text" placeholder="Descricion" name="description" value={this.props.form.description} onChange={this.props.onChange}></input>
        </div>
        <div className="form-group mb-2">
            <input className="form-control" type="text" placeholder="Cantidad" name="amount" value={this.props.form.amount} onChange={this.props.onChange}></input>
        </div>
        <button className="btn btn-primary mb-2" type="submit">Agregar</button>
    </form>
        );
    }
}
export default TransferForm