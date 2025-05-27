import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import ModalEditUser from './ModalEditUser';
import ModalUser from './ModalUser';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    state = {
        arrUsers: [],
        isOpenModalUser: false,
        isOpenModalEditUser: false,
        userEdit: null,
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            if (!data.loginName || !data.phoneNumber || !data.password || !data.roleId) {
                alert("Please fill in all required fields!");
                return;
            }

            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({ isOpenModalUser: false });
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { id: 'reset' });
            }
        } catch (e) {
            console.error("Create user error:", e);
            alert("Something went wrong. Please try again.");
        }
    }

    handleDeleteUser = async (user) => {
        const isConfirmed = window.confirm(`Do you want to DELETE this USER: ${user.loginName} ?`);
        if (!isConfirmed) return;

        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({ isOpenModalEditUser: false })
                await this.getAllUserFromReact()
            } else {
                alert(res.errMessage || res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage Users</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={this.handleAddNewUser}>
                        <i className='fas fa-plus'></i> ADD new a User
                    </button>
                </div>
                <div className='users-table'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Account</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsers && arrUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.loginName?.trim() ? item.loginName : 'null'}</td>
                                        <td>{item.email?.trim() ? item.email : 'null'}</td>
                                        <td>{item.phoneNumber?.trim() ? item.phoneNumber : 'null'}</td>
                                        <td>{item.firstName?.trim() ? item.firstName : 'null'}</td>
                                        <td>{item.lastName?.trim() ? item.lastName : 'null'}</td>
                                        <td>{item.address?.trim() ? item.address : 'null'}</td>
                                        <td>
                                            {item.gender === 'M' ? 'Nam' : item.gender === 'F' ? 'Nữ' : 'null'}
                                        </td>
                                        <td>
                                            {item.roleId === 'R1' ? 'Admin' : item.roleId === 'R2' ? 'User' : 'null'}
                                        </td>
                                        <td>
                                            <button className='btn-edit fas fa-pencil-alt' onClick={() => this.handleEditUser(item)} title="Edit"></button>
                                            <button className='btn-delete fas fa-trash-alt' onClick={() => this.handleDeleteUser(item)} title="Delete"></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
