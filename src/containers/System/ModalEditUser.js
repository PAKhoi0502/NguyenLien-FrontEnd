import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         loginName: '',
         email: '',
         password: '',
         phoneNumber: '',
         firstName: '',
         lastName: '',
         address: '',
         gender: '',
      };
   }

   componentDidMount() {
      let user = this.props.currentUser;
      if (user && !_.isEmpty(user)) {
         this.setState({
            id: user.id,
            loginName: user.loginName,
            email: user.email || '',
            password: 'hash-code',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            address: user.address || '',
            phoneNumber: user.phoneNumber || '',
            gender: user.gender || '',
         });
      }
   }

   toggle = () => {
      this.props.toggleFromParent();
   }

   handleOnchangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({ ...copyState });
   }

   handleSaveUser = () => {
      const email = this.state.email.trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         alert('Email format is invalid!');
         return;
      }

      // Chỉ gửi các trường được phép update
      const userToUpdate = {
         id: this.state.id,
         email: email || '',
         firstName: this.state.firstName || '',
         lastName: this.state.lastName || '',
         address: this.state.address || '',
         gender: this.state.gender
      };
      this.props.editUser(userToUpdate);
   }

   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={'modal-user-container'} size="lg">
            <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
            <ModalBody>
               <div className='modal-user-body'>
                  <div className='input-container'>
                     <label>Login Name</label>
                     <input
                        type='text'
                        value={this.state.loginName}
                        disabled
                     />
                  </div>

                  <div className='input-container'>
                     <label>Phone Number</label>
                     <input
                        type='text'
                        value={this.state.phoneNumber}
                        disabled
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

                  <div className='input-container'>
                     <label>Email</label>
                     <input
                        type='email'
                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                        value={this.state.email}
                     />
                  </div>

                  <div className='input-container'>
                     <label>Gender</label>
                     <select
                        onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                        value={this.state.gender}
                     >
                        <option value="M">Nam</option>
                        <option value="F">Nữ</option>
                     </select>
                  </div>

                  <div className='input-container max-width-input'>
                     <label>Address</label>
                     <input
                        type='text'
                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                        value={this.state.address}
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color='primary' className='px-3' onClick={this.handleSaveUser}>Save Changes</Button>
               <Button color='secondary' className='px-3' onClick={this.toggle}>Close</Button>
            </ModalFooter>
         </Modal>
      );
   }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
