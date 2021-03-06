import React, { Component } from "react";
import MyButton from "./button";

import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import { Link } from "react-router-dom";

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  }
  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <Link to={`product_detail/${props._id}`}>
          <div
            className="image"
            style={{
              background: `url(${this.renderCardImage(
                props.images
              )}) no-repeat`,
            }}
          ></div>
        </Link>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name" title={props.name ? props.name : ""}>
              {props.name
                ? props.name.length > 50
                  ? props.name.substr(0, 50) + "..."
                  : props.name
                : ""}
            </div>
            <div className="name">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="description">
              <Link to={`product_detail/${props._id}`}>
                <p>{props.description}</p>
              </Link>
            </div>
          ) : null}

          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`product_detail/${props._id}`}
                addStyles={{
                  margin: "10px 0 0 0",
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() => {
                  props.user.userData.isAuth
                    ? this.props.dispatch(addToCart(props._id))
                    : alert(
                        "You need to log in first for purchasing this product."
                      );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Card);
