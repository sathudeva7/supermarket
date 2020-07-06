import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutShop } from "../../actions/authActions";
import Background from '../images/a.jpg';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import FileUpload from '../../utils/FileUpload'
import classnames from "classnames";

var sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: `url(${Background})`
};

class Dashboard extends Component {
    constructor(props){
        super(props);
 
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
 
        this.state = {
            name: '',
            description: '',
            price:'',
            shops: []
        }
    }
    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
 
    onChangeDescription(e){
     this.setState({
         description: e.target.value
     });
     }
     onChangePrice(e){
        this.setState({
            price: e.target.value
        });
        }
        onSubmit(e) {
            e.preventDefault();
    
            const product = {
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                shopname:document.getElementById('demo').innerHTML, 
                
            }
            console.log(product);
    
            axios.post('http://localhost:5000/products/add', product)
            .then(res => console.log(res.data));
            
            this.setState({
                name: '',
                description:'',
                price:''
            })
        }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutShop();
  };

  
render() {
    const { shop } = this.props.auth;
return (
    <section style={ sectionStyle }>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b><div id="demo"> {shop.name.split(" ")[0]}</div>
              
            </h4>
            <div className="container">
               
        <div className="row">
          <div className="col s8 offset-s2">
            
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChangeName}
                  value={this.state.name}
                  
                  id="name"
                  type="text"
                
                />
                <label htmlFor="name">Product Name</label>
               
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChangeDescription}
                  value={this.state.description}
                  
                  id="description"
                  type="text"
                  
                />
                <label htmlFor="description">Description</label>
              
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChangePrice}
                  value={this.state.price}
                  
                  id="price"
                  type="text"
                  
                />
                <label htmlFor="price">Price</label>
                
              </div>
              
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      </section>
    );
  }
}
Dashboard.propTypes = {
  logoutShop: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutShop }
)(Dashboard);