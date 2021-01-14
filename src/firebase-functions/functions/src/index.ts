/* eslint-disable max-len */
import * as functions from "firebase-functions";

export const initializeUser = functions.auth.user().onCreate((user) => {
});


// if (user) {
//     const userData = firebase.auth().currentUser;
//     const creationTime = userData?.metadata?.creationTime;
//     if (creationTime) {
//         // https://firebase.google.com/docs/reference/js/firebase.auth.UserMetadata#optional-creationtime
//         console.log('account created', dayjs(creationTime).diff(new Date(), 'second'), 'seconds ago');
//         const diffSeconds = dayjs(creationTime).diff(new Date(), 'second');
//         if (diffSeconds <= 0 && diffSeconds > -30) {
//             console.log('sending welcome e-mail and initializing user data');
//             // sendWelcomeEmail(user);
//             initializeUserData(user);
//         }
//     }
// }
