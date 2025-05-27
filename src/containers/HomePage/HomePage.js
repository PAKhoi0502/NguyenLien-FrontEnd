import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderHomePage from './Header/Header';

class HomePage extends Component {

   render() {
      return (
         <div>
            <HeaderHomePage />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
