import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';
import Alert from '../layout/Alert';
import {notifyUser} from '../../actions/notifyActions';

class Login extends Component {
    state = { 
        email: '',
        password: ''
     }

     onChange = e => {
         this.setState({ 
               [e.target.name]:e.target.value
              });
     }

     onSubmit = e => {
         e.preventDefault();
         const {firebase, notifyUser} = this.props;
         const {email, password} = this.state;

         firebase.createUser({email, password}).catch(err => notifyUser('User already exists', 'error'));
     }

     componentWillMount(){
         const {allowRegistration} = this.props.settings;
         if(!allowRegistration){
             this.props.history.push('/');
         }
     }

    render() { 
        const {email, password} = this.state;
        const {message, messageType} = this.props.notify;
        return ( 
            <div className='row'>
                <div className='col-md-6 mx-auto'>
                     <div className='card'>
                         <div className='card-body'>
                             {
                                 message ? (
                                     <Alert 
                                           message={message}
                                           messageType={messageType}
                                     />
                                 ) : null
                             }
                            <h1 className='text-center pb-4 pt-3'>
                                <span className='text-primary'>
                                     <i className='fas fa-lock'></i>
                                     {' '} Register
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                 <label htmlFor='email'>Email</label>
                                 <input  className='form-control'
                                         type='email'
                                         name='email'
                                         value={email}
                                         required
                                         onChange={this.onChange}
                                 />
                                </div>
                                <div className='form-group'>
                                 <label htmlFor='password'>Password</label>
                                 <input  className='form-control'
                                         type='password'
                                         name='password'
                                         value={password}
                                         required
                                         onChange={this.onChange}
                                 />
                                </div>
                                <input type='submit' value='Sign Up' className='btn btn-primary btn-block' />
                            </form>
                         </div>
                     </div>
                </div>
            </div>

         );
    }
}
 
export default compose(
    firebaseConnect(),
    connect((state,props) => ({
        notify: state.notify,
        settings: state.settings
    }), {notifyUser})
)(Login);