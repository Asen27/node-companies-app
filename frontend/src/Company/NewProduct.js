import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      permalink: ''
    };
  }

  updateName(value) {
    this.setState({
      name: value,
    });
  }

  updatePermalink(value) {
    this.setState({
      permalink: value,
    });
  }

  submit() {
    this.props.newProduct({name: this.state.name, permalink: this.state.permalink});

    this.setState({
        name: '',
        permalink: ''
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
      <hr className="my-4" />
      <h4>Add new product:</h4>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Product name:</label>
          <input
            type="text"
            onChange={(e) => {this.updateName(e.target.value)}}
            className="form-control"
            placeholder="Write the product name."
            value={this.state.name}
          />
        </div>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Permalink:</label>
          <input
            type="text"
            onChange={(e) => {this.updatePermalink(e.target.value)}}
            className="form-control"
            placeholder="Write the permalink of the product."
            value={this.state.permalink}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {this.submit()}}>
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(NewProduct);