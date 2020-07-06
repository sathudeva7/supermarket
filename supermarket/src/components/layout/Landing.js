import React, { Component } from "react";
import { Link } from "react-router-dom";
import Background from '../images/shop.png';

var sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: `url(${Background})`
};
class Landing extends Component {
  render() {
    return (
      
      <section style={ sectionStyle }>
      
      <div style={{ height: "75vh" }} className="container valign-wrapper" >
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Stay</b> at home. Order groceries {" "}
              <span style={{ fontFamily: "monospace" }}>Online</span> 
           
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Register Here
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
            <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  }
}
export default Landing;