import React, {Component} from 'react';
import axios from 'axios';
import NewProduct from './NewProduct';
import DeleteCompany from './DeleteCompany';
import DeleteProduct from './DeleteProduct';
import auth0Client from '../Auth';
import {Link} from 'react-router-dom';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      isDeleted: false
    };

    this.newProduct = this.newProduct.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

  }

  async componentDidMount() {
    await this.refreshCompany();
  }

  async  refreshCompany() {
    const { match: { params } } = this.props;
    axios.get('http://localhost:8081/api/companies/' + params.companyId).then((res)=>{
        console.log(res);
        
        const company = res.data;
        this.setState({
          company,
        });
    });
  }

  async newProduct(product) {
    const company = this.state.company
    company.products.push(product);
    await axios.put('http://localhost:8081/api/companies/' + this.state.company._id, company,  {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    }).catch(err => console.error(err));
    await this.refreshCompany();
  }

  async deleteProduct(product) {
    if (window.confirm(`Are you sure you want to delete "${product.name}"`)) {
    const company = this.state.company
    const index = company.products.indexOf(product)
    company.products.splice(index, 1);
    await axios.put('http://localhost:8081/api/companies/' + this.state.company._id, company,  {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    }).catch(err => console.error(err));
    await this.refreshCompany();
  }
}


  async deleteCompany() {
    if (window.confirm(`Are you sure you want to delete "${this.state.company.name}"`)) {
    await axios.delete('http://localhost:8081/api/companies/' + this.state.company._id, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    }).catch(err => console.error(err));
    this.setState({company:null, isDeleted:true});
    await this.refreshCompany();
  }
  }



  render() {
    const {company} = this.state;
    if (company === null && this.state.isDeleted === true) return (
      <div className="container">
      <div className="row">
      <div class="alert alert-dismissible alert-success">
     <strong>Well done! You have successfully deleted the company! </strong> 
     <Link className="navbar-brand" to="/"> Go back </Link>
    </div>
        </div>
      </div>

    );
    if (company === null && this.state.isDeleted === false) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{company.name}</h1>
            {auth0Client.isAuthenticated() &&
            <Link to={`/api/update-company/${company._id}`}>
            <button type="button" class="btn btn-link">Update</button>
            </Link>
            }
            <DeleteCompany companyId={company._id} deleteCompany = {this.deleteCompany} />
            {(company.description === null || company.description === "")  ? (
         <p> <em> The company doesn't have a description. </em></p>
      ) : (
        <p className="lead">{company.description}</p>
      )}
            <hr className="my-4" />
            <p className="lead"><strong>Email:</strong> 
            {(company.email_address === null || company.email_address === "")  ? (
        <span><em> The company doesn't have an email address.</em></span> 
      ) : (
        <span className="lead"> {company.email_address}</span> 
      )}
            </p>
            <p className="lead"><strong>Twitter: </strong>
            {(company.twitter_username === null || company.twitter_username === "")  ? (
        <span><em> The company doesn't have a twitter account.</em></span> 
      ) : (
        <span className="lead"> {company.twitter_username}</span> 
      )}
            </p>
            <p className="lead"><strong>Homepage: </strong>
            {(company.homepage_url === null || company.homepage_url === "")  ? (
        <span><em> The company doesn't have a homepage.</em></span> 
      ) : (
        <a href={`${company.homepage_url}`}><span className="lead"> {company.homepage_url}</span> </a>
      )} 
            </p>
            <p className="lead"><strong>Crunchbase: </strong>
            {(company.crunchbase_url === null || company.crunchbase_url === "")  ? (
        <span><em> The company doesn't have a crunchbase.</em></span> 
      ) : (
        <a href={`${company.crunchbase_url}`}><span className="lead"> {company.crunchbase_url}</span> </a>
      )} 
            </p>
            <p className="lead"><strong>Number of employees: </strong> 
            {(company.number_of_employees === null || company.number_of_employees === "")  ? (
        <span> 0</span> 
      ) : (
        <span className="lead"> {company.number_of_employees}</span> 
      )} 
            </p>
            <hr className="my-4" />
 <h3>Products:</h3>
            {
              company.products.map((product, idx) => (
                <p className="lead" key={idx}>  - {product.name} ({product.permalink})  <DeleteProduct product = {product} deleteProduct={this.deleteProduct} /> </p>
              ))
            }

            <NewProduct companyId={company._id} newProduct={this.newProduct} />
           
            
      
          </div>
        </div>
      </div>
    )
  }
}

export default Company;