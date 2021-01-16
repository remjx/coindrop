import firebase from 'firebase/app';
import 'firebase/firestore';

const projectId = "my-test-project"

beforeAll(() => {
    firebase.initializeTestApp({
        projectId,
        auth: { uid: "alice", email: "alice@example.com" }
    });
    firebase.loadFirestoreRules({
        projectId,
        rules: fs.readFileSync("../firestore.rules", "utf8")
    });
});

beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId });
  });

describe('Firestore rules', () => {
    it('allows users to update their own settings', () => {
        firebase.assertSucceeds(app.firestore().collection("users").doc("alice").get());
    })
    it('does not allow users to update other users\' settings', () => {
        firebase.assertFails(app.firestore().collection("users").doc("bob").get());
    })
})

afterAll(async () => {
    await firebase.clearFirestoreData({ projectId });
})