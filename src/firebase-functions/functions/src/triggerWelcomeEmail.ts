// TODO: log errors if email send fails
import * as functions from "firebase-functions";
import Cryptr from "cryptr";
import axios from "axios";

const {
  firebase_functions_auth_token,
  firebase_functions_cryptr_secret,
  app_base_url,
} = functions.config().default;
const cryptr = new Cryptr(firebase_functions_cryptr_secret);
const FIREBASE_FUNCTIONS_AUTH_TOKEN_ENCRYPTED = cryptr.encrypt(firebase_functions_auth_token);

export const triggerWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  try {
    await axios.post(
        `${app_base_url}/api/admin/user/send-welcome-email`,
        {
          email: user.email,
        },
        {
          headers: {
            FIREBASE_FUNCTIONS_AUTH_TOKEN_ENCRYPTED
          },
        },
    );
  } catch (error) {
    functions.logger.error(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      functions.logger.error(error.response.data);
      functions.logger.error(error.response.status);
      functions.logger.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      functions.logger.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      functions.logger.error("Error", error.message);
    }
    functions.logger.error(error.config);
  }
});
