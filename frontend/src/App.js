import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Company from './Company/Company';
import Companies from './Companies/Companies';
import Callback from './Callback';
import auth0Client from './Auth';
import NewCompany from './NewCompany/NewCompany';
import UpdateCompany from './UpdateCompany/UpdateCompany';
import SecuredRoute from './SecuredRoute/SecuredRoute';


class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }


  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={Companies}/>
        <Route exact path='/api/companies/:companyId' component={Company}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute path='/api/new-company' component={NewCompany} />
        <SecuredRoute path='/api/update-company/:companyId' component={UpdateCompany} />
      </div>
    );
  }
}

export default withRouter(App);