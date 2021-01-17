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
            firebase_functions_auth_token_encrypted: FIREBASE_FUNCTIONS_AUTH_TOKEN_ENCRYPTED,
          },
        },
    );
  } catch (error) {
    functions.logger.error(error);
    if (error.response) {
      functions.logger.error(error.response.data);
      functions.logger.error(error.response.status);
      functions.logger.error(error.response.headers);
    } else if (error.request) {
      functions.logger.error(error.request);
    } else {
      functions.logger.error("Error", error.message);
    }
    functions.logger.error(error.config);
  }
});
