import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

class DeleteCompany extends Component {
  

  delete() {
    this.props.deleteCompany();
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <hr className="my-4" />
        <button
          className="btn btn-danger"
          onClick={() => {this.delete()}}>
          Delete
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(DeleteCompany);