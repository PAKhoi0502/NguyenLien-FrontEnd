import React, { useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import './RegisterFormScss.scss';

const RegisterForm = ({ onBackToLogin }) => {
   const [form, setForm] = useState({
      loginName: "",
      password: "",
      confirmPassword: ""
   });

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setError("");
      setSuccess("");
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Các validate giữ nguyên như bạn đã viết

      if (!form.loginName) {
         setError("Vui lòng nhập tên đăng nhập!");
         return;
      }
      if (!/^[a-zA-Z0-9]{8,20}$/.test(form.loginName)) {
         setError("Tên đăng nhập phải từ 8 đến 20 ký tự, chỉ gồm chữ và số, không có khoảng trắng.");
         return;
      }
      if (!form.password || !form.confirmPassword) {
         setError("Vui lòng nhập mật khẩu và xác nhận mật khẩu!");
         return;
      }
      if (form.password.length < 8) {
         setError("Mật khẩu phải có ít nhất 8 ký tự.");
         return;
      }
      if (/\s/.test(form.password)) {
         setError("Mật khẩu không được chứa khoảng trắng.");
         return;
      }
      if (!/\d/.test(form.password)) {
         setError("Mật khẩu phải chứa ít nhất một số.");
         return;
      }
      if (form.password !== form.confirmPassword) {
         setError("Mật khẩu xác nhận không khớp!");
         return;
      }

      setIsLoading(true);
      setError("");
      setSuccess("");

      try {
         const res = await axios.post("/api/register", {
            loginName: form.loginName,
            password: form.password
         });

         setSuccess(res.data.message || "Đăng ký thành công!");
         setForm({
            loginName: "",
            password: "",
            confirmPassword: ""
         });

         setTimeout(() => {
            if (onBackToLogin) onBackToLogin();
         }, 2000);
      } catch (err) {
         setError(err.response?.data?.message || "Đăng ký thất bại, thử lại!");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form
         className="login-content"
         onSubmit={handleSubmit}
         style={{ maxWidth: 400, margin: "0 auto" }}
      >
         <div className="col-12 text-login">Register</div>

         <div className="col-12 form-group login-input">
            <label>Login Name</label>
            <input
               type="text"
               className="form-control"
               name="loginName"
               value={form.loginName || ""}
               onChange={handleChange}
               placeholder="Enter login name"
            />
         </div>

         <div className="col-12 form-group login-input">
            <label>Password</label>
            <input
               type="password"
               className="form-control"
               name="password"
               value={form.password || ""}
               onChange={handleChange}
               placeholder="Enter password"
            />
         </div>

         <div className="col-12 form-group login-input">
            <label>Confirm Password</label>
            <input
               type="password"
               className="form-control"
               name="confirmPassword"
               value={form.confirmPassword || ""}
               onChange={handleChange}
               placeholder="Re-enter password"
            />
         </div>

         <div className="col-12">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
         </div>

         <div className="col-12">
            <button className="btn-login" type="submit" disabled={isLoading}>
               {isLoading ? (
                  <>
                     <span className="spinner" /> Registering...
                  </>
               ) : (
                  "Register"
               )}
            </button>
         </div>

         <div
            className="col-12"
            style={{ marginTop: "15px", textAlign: "center" }}
         >
            <span
               style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
               onClick={onBackToLogin}
            >
               Back to Login
            </span>
         </div>
      </form>
   );
};

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


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

