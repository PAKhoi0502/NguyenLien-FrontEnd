import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './Login.scss';
import * as actions from "../../../store/actions";
import { handleLoginApi } from '../../../services/userService';
import RegisterForm from '../CreateAcc/RegisterForm';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         isShowPassword: false,
         errMessage: '',
         successMessage: '',
         isLoading: false,
         isRegistering: false,
      }
   }

   handleOnChangeUsername = (event) => {
      this.setState({
         username: event.target.value
      });
   }

   handleOnChangePassword = (event) => {
      this.setState({
         password: event.target.value
      });
   }

   handleLogin = async () => {
      this.setState({
         errMessage: '',
         successMessage: ''
      });

      const { username, password } = this.state;

      if (!username || !password) {
         this.setState({ errMessage: "Vui lòng nhập tài khoản và mật khẩu!" });
         return;
      }

      this.setState({ isLoading: true });

      try {
         let data = await handleLoginApi(username, password);

         if (data && data.errCode !== 0) {
            this.setState({
               errMessage: data.message,
               successMessage: '',
               isLoading: false
            });
         } else if (data && data.errCode === 0) {
            this.props.adminLoginSuccess(data.user);
            this.setState({
               isLoading: false,
               errMessage: '',
               successMessage: "Đăng nhập thành công!"
            });
            console.log('Login Success');
         }
      } catch (error) {
         let message = 'Đã xảy ra lỗi không mong muốn.';
         if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message;
         }

         this.setState({
            errMessage: message,
            successMessage: '',
            isLoading: false
         });
      }
   }


   handleShowHidePassword = () => {
      this.setState((prevState) => ({
         isShowPassword: !prevState.isShowPassword
      }));
   }

   toggleRegister = () => {
      this.setState((prevState) => ({
         isRegistering: !prevState.isRegistering,
         errMessage: '',
         successMessage: ''
      }));
   }

   render() {
      const { errMessage, successMessage, isLoading } = this.state;


      if (this.state.isRegistering) {
         return (
            <div className='login-background'>
               <div className='login-container'>
                  <RegisterForm onBackToLogin={this.toggleRegister} />
               </div>
            </div>
         );
      }


      return (
         <div className='login-background'>
            <div className='login-container'>
               <div className='login-content'>
                  <div className='col-12 text-login'>Đăng nhập</div>

                  {/* Input username */}
                  <div className='col-12 form-group login-input'>
                     <label>Tên đăng nhập</label>
                     <input
                        value={this.state.username}
                        onChange={this.handleOnChangeUsername}
                        type='text'
                        className='form-control'
                        placeholder='Nhập vào đây tên đăng nhập của bạn'
                     />
                  </div>

                  {/* Input password */}
                  <div className='col-12 form-group login-input'>
                     <label>Mật khẩu</label>
                     <div className='custom-input-password'>
                        <input
                           value={this.state.password}
                           onChange={this.handleOnChangePassword}
                           type={this.state.isShowPassword ? 'text' : 'password'}
                           className='form-control'
                           placeholder='Nhập vào đây mật khẩu của bạn'
                        />
                        <span onClick={this.handleShowHidePassword} style={{ cursor: 'pointer' }}>
                           <i className={this.state.isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                        </span>
                     </div>
                  </div>

                  {/* Thông báo lỗi hoặc thành công */}
                  <div className='col-12'>
                     {errMessage && (
                        <div className="alert alert-error">
                           <FaExclamationCircle style={{ marginRight: 6 }} />
                           {errMessage}
                        </div>
                     )}
                     {successMessage && (
                        <div className="alert alert-success">
                           <FaCheckCircle style={{ marginRight: 6 }} />
                           {successMessage}
                        </div>
                     )}
                  </div>

                  {/* Nút đăng nhập */}
                  <div className='col-12'>
                     <button
                        className='btn-login'
                        onClick={this.handleLogin}
                        disabled={isLoading}
                        style={{ position: 'relative' }}
                     >
                        {isLoading && <FaSpinner className="spinner-icon" />}
                        {isLoading ? " Đang đăng nhập..." : "Đăng nhập"}
                     </button>
                  </div>

                  {/* Các link khác */}
                  <div className='col-12 d-flex justify-content-between mt-2'>
                     <span className='forgot-password'>Quên mật khẩu?</span>
                     <span
                        className='create-account'
                        onClick={this.toggleRegister}
                        style={{ cursor: "pointer", textDecoration: "underline" }}
                     >
                        Đăng ký tài khoản!
                     </span>
                  </div>

                  {/* Login bằng Google/Facebook */}
                  <div className='col-12 text-center mt-3'>
                     <span className='text-other-login'>Hoặc đăng nhập với: </span>
                  </div>

                  <div className='col-12 social-login'>
                     <i className="fab fa-google google"></i>
                     <i className="fab fa-facebook facebook"></i>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      lang: state.app.language
   };
};

const mapDispatchToProps = dispatch => {
   return {
      navigate: (path) => dispatch(push(path)),
      adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
      adminLoginFail: () => dispatch(actions.adminLoginFail()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
