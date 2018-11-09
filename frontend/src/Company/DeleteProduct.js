import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

class DeleteProduct extends Component {
 


  delete() {
    const product = this.props.product;
    this.props.deleteProduct(product);

    
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      // eslint-disable-next-line
     <a href="#"><span onClick={() => {this.delete()}} class="badge badge-danger">Delete</span></a>
    )
  }
}

export default withRouter(DeleteProduct);