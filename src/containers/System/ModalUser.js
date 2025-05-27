import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginName: '',
         phoneNumber: '',
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
         gender: '',
         roleId: 'R2'
      };
      this.listenToEmitter();
   }

   listenToEmitter() {
      emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
         this.setState({
            loginName: '',
            phoneNumber: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            roleId: 'R2'
         });
      });
   }

   toggle = () => {
      this.props.toggleFromParent();
   }

   handleOnchangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({ ...copyState });
   }

   checkValideInput = () => {
      let isValid = true;
      let arrInput = ['loginName', 'phoneNumber', 'password', 'roleId'];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValid = false;
            alert('Missing required field: ' + arrInput[i]);
            break;
         }
      }
      if (this.state.email) {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(this.state.email)) {
            alert("Email format is invalid");
            return false;
         }
      }
      return isValid;
   }

   handleAddNewUser = () => {
      let isValid = this.checkValideInput();
      if (isValid === true) {
         this.props.createNewUser(this.state);
      }
   }

   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={'modal-user-container'} size="lg">
            <ModalHeader toggle={this.toggle}>Create A New User</ModalHeader>
            <ModalBody>
               <div className='modal-user-body'>
                  <div className='input-container'>
                     <label>Login Name <span style={{ color: 'red' }}>*</span></label>
                     <input
                        type='text'
                        onChange={(e) => this.handleOnchangeInput(e, 'loginName')}
                        value={this.state.loginName}
                     />
                  </div>

                  <div className='input-container'>
                     <label>Phone Number <span style={{ color: 'red' }}>*</span></label>
                     <input
                        type='text'
                        onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                        value={this.state.phoneNumber}
                     />
                  </div>

                  <div className='input-container'>
                     <label>Email</label>
                     <input
                        type='email'
                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                        value={this.state.email}
                     />
                  </div>

                  <div className='input-container'>
                     <label>Password <span style={{ color: 'red' }}>*</span></label>
                     <input
                        type='password'
                        onChange={(e) => this.handleOnchangeInput(e, 'password')}
                        value={this.state.password}
                     />
                  </div>

                  <div className='input-container'>
                     <label>First Name</label>
                     <input
                        type='text'
                        onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                        value={this.state.firstName}
                     />
                  </div>

                  <div className='input-container'>
                     <label>Last Name</label>
                     <input
                        type='text'
                        onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                        value={this.state.lastName}
                     />
                  </div>

                  <div className='input-container max-width-input'>
                     <label>Address</label>
                     <input
                        type='text'
                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                        value={this.state.address}
                     />
                  </div>

                  <div className='input-container'>
                     <label>Gender</label>
                     <select
                        value={this.state.gender}
                        onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                     >
                        <option value="">-- Select gender --</option>
                        <option value="M">Nam</option>
                        <option value="F">Nữ</option>
                     </select>
                  </div>

                  <div className='input-container'>
                     <label>Role <span style={{ color: 'red' }}>*</span></label>
                     <select
                        value={this.state.roleId}
                        onChange={(e) => this.handleOnchangeInput(e, 'roleId')}
                     >
                        <option value="R1">Admin</option>
                        <option value="R2">User</option>
                     </select>
                  </div>

               </div>
            </ModalBody>
            <ModalFooter>
               <Button color='primary' className='px-3' onClick={this.handleAddNewUser}>Add New</Button>
               <Button color='secondary' className='px-3' onClick={this.toggle}>Close</Button>
            </ModalFooter>
         </Modal>
      );
   }
}

const mapStateToProps = state => {
   return {};
};

const mapDispatchToProps = dispatch => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
