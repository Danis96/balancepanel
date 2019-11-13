import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';


class ClientDetails extends Component {

    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    }

    onChange = e => {
        this.setState({ 
            [e.target.name]:e.target.value
          });
    }

    balanceSubmit = e => {
        e.preventDefault();

        const {client, firestore} = this.props;
        const {balanceUpdateAmount} = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }

        // update in firestore

        firestore.update({ collection: 'clients', doc: client.id}, clientUpdate);
    }

    onDelete = () => {
        const {client, firestore, history} = this.props;

        firestore.delete({collection: 'clients', doc: client.id})
                 .then((history.push('/')));
    }
    
    render() { 
        const {client} = this.props;
        const {showBalanceUpdate, balanceUpdateAmount} = this.state;
        let balanceForm = '';
        if(showBalanceUpdate)
        {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                     <div className='input-group'>
                        <input  
                              className='form-control'
                              type='text'
                              name='balanceUpdateAmount'
                              placeholder='Add new balance'
                              value={balanceUpdateAmount}
                              onChange={this.onChange}
                        />
                        <div className='input-group-append'>
                           <input type='submit' value='Update' className='btn btn-outline-dark' />
                        </div>
                     </div>
                </form>
            )
        }
        if(client)
        {
            return ( 
                 <div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Link to='/' className='btn btn-link'>
                                <i className='fas fa-arrow-circle-left' /> Back To Dashboard
                            </Link>
                        </div>
                        <div className='col-md-6'>
                            <div className='btn-group float-right'>
                            <Link to={`/client/edit/${client.id}`} className='btn btn-dark'> Edit </Link>
                            <button className='btn btn-danger' onClick={this.onDelete} > Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='card'>
                        <h3 className='card-header'>
                            {client.firstName} {client.lastName}
                        </h3>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-8 col-sm-6'>
                                    <h4>Client ID: {' '} <span className='text-secondary'> {client.id} </span></h4>
                                </div>
                                <div className='col-md-4 col-sm-6'>
                                    <h3 className='pull-righ'>Balance: <span className={classnames({
                                        'text-danger': client.balance > 0,
                                        'text-secondary': client.balance === 0
                                    })}>${parseFloat(client.balance).toFixed(2)}
                                    </span> 
                                    <small>
                                        <a href='#!' onClick={() => this.setState({ 
                                            showBalanceUpdate: !showBalanceUpdate
                                              })}>
                                                   <i className='fas fa-pencil-alt'></i>
                                        </a>  
                                    </small>
                                </h3>
                                    {balanceForm}
                                </div>
                            </div>
                            <hr/>
                            <ul className='list-group'>
                               <li className='list-group-item'>Contact Email: {client.email}</li>
                               <li className='list-group-item'>Contact Phone: {client.phone}</li>
                            </ul>
                        </div>
                    </div>
                 </div>

                );
        } else {
            return <Spinner  />
        }
        
    }
}
 
export default compose(
    firestoreConnect(props => [{collection: 'clients', storeAs: 'client', doc: props.match.params.id}]),
    connect(({firestore: {ordered}}, props ) => ({
        client: ordered.client && ordered.client[0]
    }))
)( ClientDetails);