import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

   render() {
      return (
         <div className='header-container'>
            <div className='header-content'>
               hello
               <div className='header-content-up'></div>
               <div className='header-content-down'></div>
            </div>
         </div>
      )
   }

}

const mapStateToProps = state => {
   return {
      isLoggedIn: state.admin.isLoggedIn
   };
};

const mapDispatchToProps = dispatch => {
   return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
