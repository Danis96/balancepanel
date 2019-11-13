import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect}  from 'react-redux-firebase';

class AddClients extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onChange = e => {
        this.setState({ 
           [e.target.name] : e.target.value
          });
    }

    onSubmit = e => {
        e.preventDefault();
        const newClient = this.state;

        const {firestore, history} = this.props;

        if(newClient.balance === '')
        {
            newClient.balance = 0;
        }

        firestore.add({collection: 'clients'}, newClient)
                 .then(() => history.push('/'));

     }

    render() {
        const {disableBalanceOnAdd} = this.props.settings;
        return (
            <div>
                <div className='row'>
                    <div className='col-md-6'>
                        <Link to='/' className='btn btn-link'>
                            <i className='fas fa-arrow-circle-left'></i>Back to Dashboard
                     </Link>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-header'>
                              Add Clients
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='firstName'>First Name</label>
                                <input  className='form-control'
                                        type='text'
                                        name='firstName'
                                        minLength='2'
                                        required
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input  className='form-control'
                                        type='text'
                                        name='lastName'
                                        minLength='2'
                                        required
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input  className='form-control'
                                        type='email'
                                        name='email'
                                        onChange={this.onChange}
                                        value={this.state.email}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='phone'>Phone</label>
                                <input  className='form-control'
                                        type='text'
                                        name='phone'
                                        minLength='10'
                                        required
                                        onChange={this.onChange}
                                        value={this.state.phone}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='balance'>Balance</label>
                                <input  className='form-control'
                                        type='text'
                                        name='balance'
                                        onChange={this.onChange}
                                        value={this.state.balance}
                                        disabled={disableBalanceOnAdd}
                                />
                            </div>

                            <input  type='submit' value='Submit' className='btn btn-block btn-primary' />
                        </form>

                    </div>

                </div>
            </div>

        );
    }
}

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
         settings: state.settings
    }))
)(AddClients);