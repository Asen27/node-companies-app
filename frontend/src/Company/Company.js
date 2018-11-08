import React, {Component} from 'react';
import axios from 'axios';
import NewProduct from './NewProduct';
import auth0Client from '../Auth';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
    };

    this.newProduct = this.newProduct.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async  refreshQuestion() {
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
    await axios.put('http://localhost:8081/companies/' + this.state.company._id, company, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshQuestion();
  }


  render() {
    const {company} = this.state;
    if (company === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{company.name}</h1>
            <p className="lead">{company.description}</p>
            <hr className="my-4" />
            <p className="lead"><strong>Email:</strong> {company.email_address}</p>
            <p className="lead"><strong>Twitter: </strong>{company.twitter_username}  </p>
            <p className="lead"><strong>Homepage: </strong>{company.homepage_url}  </p>
            <p className="lead"><strong>Crunchbase: </strong>{company.crunchbase_url}  </p>
            <p className="lead"><strong>Number of employees: </strong> {company.number_of_employees} </p>
            <hr className="my-4" />
            <NewProduct companyId={company._id} newProduct={this.newProduct} />
            <p>Products:</p>
            {
              company.products.map((product, idx) => (
                <p className="lead" key={idx}>  - {product.name} ({product.permalink}) </p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Company;