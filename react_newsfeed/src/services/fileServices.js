import axios from "axios";
import * as helpers from "./serviceHelpers";

const prefix = `http://localhost:8080/files`;

const storeFile = file => {
  const config = {
    method: "POST",
    data: file,
    url: `${prefix}/upload-image`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const uploadFiles = evt => {
  evt.preventDefaul();
  const blob = this.state.blob;
  const url = `${prefix}/upload-image`;
  const formData = new FormData();

  formData.append("file", blob, blob.name);

  axios
    .post(url, formData)
    .then(res => {
      console.log(`SUCCESSFUL FILE UPLOAD!`, res);
      this.returnImg(res.data.items[0]);
      this.toggle();
    })
    .catch(err => {
      console.log(`File upload failed REACT.`, err);
    });
};

const getFiles = () => {
  const config = {
    method: "GET",
    url: `${prefix}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { storeFile, getFiles };
