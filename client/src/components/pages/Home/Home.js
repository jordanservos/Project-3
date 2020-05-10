import React, { Component } from "react";
import "./home.css";
import API from "../../../utils/API";
import MapWithMark from "./MapWithMark";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import NewSearch from "../../New Search/newSearch";

class Home extends Component {
  state = {
    business: [],
  };

  componentDidMount() {
    this.loadPage();
    console.log("STATE", this.state.business);
  }

  // Load Page data

  loadPage = () => {
    API.getBizAll()
      .then((res) => {
        console.log("RESPONSE", res.data);
        this.setState({ business: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-12" id="header-text">
              <h2>Healthy Shopping Together</h2>
              <h5>
                Our community provides real-time insight into store traffic and
                cleanliness
              </h5>
            </div>
          </div>

          <NewSearch />

          {/* Jumbotron */}
          <div className="jumbotron" id="jumbohome">
            <div className="row">
            <div className="col-lg-1"></div>
              <div className="col-lg-3 text-left" id="jumbo-box">
                <h3>Own a business? Take control today </h3>
                <h6>Flag inaccuraces and make sure your business data is accurate and up-to-date</h6>
                <button className="btn" id="biz-btn">Claim Business</button>
              </div>
              <div className="col-lg-8"></div>
            </div>
          </div>

          {/* Rated Card Section */}

          <div id="pop-title">
            <h3>Highest Safestance Rated Locations</h3>
            <hr></hr>
          </div>

          <div className="row" id="pop-row">
            <div className="card-deck flex-nowrap hoverable " id="pop-cards">
              {this.state.business.map((business) => (
                <div
                  className="card view overlay zoom "
                  id="card"
                  key={business._id}
                >
                  <img
                    className="card-img-top img-fluid"
                    src={
                      business.image && business.image.length
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${business.image[0].photo_reference}&key=AIzaSyD-ZEsqd3Rb5IAswQGexgebUa81e6iuDJQ`
                        : "https://i.ibb.co/LJT0XW5/placeholder-001.jpg"
                    }
                    alt="safestance-cards"
                    id="card-image"
                  ></img>
                  <div className="card-body">
                    <a href={`/business/${business._id}`}>
                      <h5 className="card-title">{business.bizname}</h5>
                    </a>

                    <p className="card-text">{business.address}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Currently in-store: {business.instore}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Map API Holder */}

          <div id="list-title">
            <h3>Explore stores in your area</h3>
            <hr></hr>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-12 hoverable " id="maps-holder">
                <Router>
                  <App>
                    <Route exact path="/" component={MapWithMark} />
                  </App>
                </Router>
              </div>
            </div>
          </div>

          {/* Map List Holder */}

          <div id="list-box" className="hoverable">
            {this.state.business.map((business) => (
              <div className="card" id="list" key={business._id}>
                <h5 className="card-header">{business.bizname}</h5>

                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-3">
                      <img
                        className="card-img-top img-fluid"
                        src={
                          business.image && business.image.length
                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${business.image[0].photo_reference}&key=AIzaSyD-ZEsqd3Rb5IAswQGexgebUa81e6iuDJQ`
                            : "https://i.ibb.co/LJT0XW5/placeholder-001.jpg"
                        }
                        alt="safestance-cards"
                        id="list-image"
                      ></img>
                    </div>

                    <div className="col-lg-9">
                      <h5 className="card-title">
                        Current Customers In-Store: {business.instore}
                      </h5>
                      <p className="card-text">{business.address}</p>
                      <a href={`/business/${business._id}`} className="btn ">
                        Check it out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
