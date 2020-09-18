// // get the data from 'name@xxx.com'
// firestore.collection("users").doc("name@xxx.com").get().then(function (doc) {
//     if (doc && doc.exists) {
//         var data = doc.data();
//         // saves the data to 'name'
//         firestore.collection("users").doc("name").set(data).then({
//             // deletes the old document
//             firestore.collection("users").doc("name@xxx.com").delete();
//         });
//     }
// });
