import React, { Component } from "react";
import DropZone from "react-dropzone";
import axios from "axios";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

class Fileupload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false,
    };
  }
  // custom function - called when we upload file
  onDrop = (files) => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]); // this name is used in node server for accepting image - cloudinary.uploader (line 243)

    axios.post("/api/users/uploadimage", formData, config).then((response) => {
      console.log(response.data);

      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data],
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles); // calling parent method
        }
      );
    });
  };

  // Remove image to delete from cloudinary and state
  onRemove = (id) => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then((response) => {
      let images = this.state.uploadedFiles.filter((item) => {
        return item.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images,
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };
  showUploadedImages = () =>
    // Cloudinary response from server, we get public_id, url (i.e. image url) back. Check /api/users/uploadimage from server.js
    this.state.uploadedFiles.map((item) => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
      </div>
    ));

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadFiles: [],
      });
    }
    return null;
  }
  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <DropZone
              onDrop={(e) => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </DropZone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px",
                }}
              >
                <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default Fileupload;
