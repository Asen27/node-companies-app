import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: null,
    };
  }

  async componentDidMount() {
    axios.get('http://localhost:8081/api/companies').then((res)=>{
        console.log(res);
        
        const companies = res.data;
        this.setState({
          companies,
        });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <Link to="/api/new-company">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Company</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.companies === null && <p>Loading companies...</p>}
          {
            this.state.companies && this.state.companies.map(company => (
              <div key={company.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/api/companies/${company._id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header"><strong>Number of products:</strong> {company.products.length}</div>
                    <div className="card-body">
                      <h2 className="card-title">{company.name}</h2>
                      <p className="card-text"><strong>Email:</strong> {company.email_address}</p>
                      <p className="card-text"><strong>Twitter: </strong>{company.twitter_username}  </p>
                      <p className="card-text"><strong>Description:</strong> {company.description}  </p>
                      <p className="card-text"><strong>Number of employees: </strong> {company.number_of_employees} </p>
                      
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Companies;