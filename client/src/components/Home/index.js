import React, { Component } from "react";
import HomeSlider from "./home_slider";
import HomePromotion from "./home_promotion";

import { connect } from "react-redux";
import {
  getProductsByArrival,
  getProductsBySell
} from "../../actions/products_actions"; // action creator

import CardBlock from "../utils/card_block";

class Home extends Component {
  componentDidMount(props) {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          list={this.props.products.bySell}
          title="Best Selling guitars"
        />
        <HomePromotion />

        <CardBlock list={this.props.products.byArrival} title="New arrivals" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(Home);
