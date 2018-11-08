import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import axios from 'axios';



class NewCompany extends Component {
  constructor(props) {
    super(props);
    const year = (new Date()).getFullYear();
    this.years = Array.from(new Array(20),(val, index) => index + year);

    this.state = {
      disabled: false,
      name: '',
      crunchbase_url: '',
      homepage_url: '',
      blog_url: '',
      twitter_username: '',
      number_of_employees: 0,
      founded_year: null,
      founded_mouth: null,
      founded_day: null,
      tag_list: [],
      email_address: '',
      description: '',
      products:[],



    };
  }

  updateName(value) {
    this.setState({
      name: value,
    });
  }

  updateCrunchbaseUrl(value) {
    this.setState({
        crunchbase_url: value,
    });
  }


  updateHomepageUrl(value) {
    this.setState({
        homepage_url: value,
    });
  }

  updateBlogUrl(value) {
    this.setState({
        blog_url: value,
    });
  }

  updateTwitterUsername(value) {
    this.setState({
        twitter_username: value,
    });
  }

  updateNumberOfEmployees(value) {
    this.setState({
        number_of_employees: value,
    });
  }

  updateFoundedYear(value) {
    this.setState({
      founded_year: value,
    });
  }

  updateFoundedMonth(value) {
    this.setState({
      founded_month: value,
    });
  }

  updateFoundedDay(value) {
    this.setState({
      founded_day: value,
    });
  }

  updateEmailAddress(value) {
    this.setState({
      email_address: value,
    });
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateTagList(value) {
    this.setState({
      tag_list: value,
    });
  }

  updateProducts(value) {
    this.setState({
      products: value,
    });
  }
  

  async submit() {
    this.setState({
      disabled: true,
    });



    await axios.post('http://localhost:8081/api/companies', {
      name: this.state.name,
      crunchbase_url: this.state.crunchbase_url,
      homepage_url : this.state.homepage_url,
      blog_url: this.state.blog_url,
      twitter_username: this.state.twitter_username,
      number_of_employees: this.state.number_of_employees,
      founded_year: this.state.founded_year,
      founded_month: this.state.founded_mouth,
      founded_day: this.state.founded_day,
      tag_list: this.state.tag_list,
      email_address: this.state.email_address,
      description: this.state.description,
      products: this.state.products
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    this.props.history.push('/');
  }

  

getDropList = () => {
    return (
        Array.from( new Array(100), (v,i) =>
          <option key={i} value={i+1}>{i+1}</option>
      )
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Company</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateName(e.target.value)}}
                    className="form-control"
                    placeholder="Give your company a name."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateDescription(e.target.value)}}
                    className="form-control"
                    placeholder="Give more context to your company."
                  />
                </div>

                 <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Homepage:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateHomepageUrl(e.target.value)}}
                    className="form-control"
                    placeholder="Write homepage URL of your company."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateEmailAddress(e.target.value)}}
                    className="form-control"
                    placeholder="Write down the email address of your company."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Twitter username:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateTwitterUsername(e.target.value)}}
                    className="form-control"
                    placeholder="Write down the Twitter username of your company."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Blog Webpage:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateBlogUrl(e.target.value)}}
                    className="form-control"
                    placeholder="Write down the blog URL of your company."
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Crunchbase:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateCrunchbaseUrl(e.target.value)}}
                    className="form-control"
                    placeholder="Write down the crunchbase URL of your company."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleSelect1">Number of employees:</label>
                  <select
                    disabled={this.state.disabled}
                    onClick={(e) => {this.updateNumberOfEmployees(e.target.value)}}
                    className="form-control"
                  >
                  <option selected value="0">0</option>
                    {this.getDropList()}
                  </select>
                </div>

                

                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewCompany);