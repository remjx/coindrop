// example: https://github.com/firebase/quickstart-testing/blob/master/unit-test-security-rules/test/firestore.spec.js

import * as firebase from '@firebase/rules-unit-testing';
import 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const projectId = "my-test-project"

function getAuthedFirestore(auth) {
    return firebase
    .initializeTestApp({ projectId, auth })
    .firestore();
}

function getAdminFirestore() {
    return firebase
    .initializeAdminApp({ projectId })
    .firestore();
}

beforeAll(() => {
    firebase.loadFirestoreRules({
        projectId,
        rules: fs.readFileSync(path.resolve(__dirname,"../firestore.rules"), "utf8")
    });
});

beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId });
});

describe('Firestore rules', () => {
    // User Settings
    it('allows users to read & write their own settings', async () => {
        const db = getAuthedFirestore({ uid: "alice", email: "alice@example.com" });
        await firebase.assertSucceeds(db.collection("users").doc("alice").get());
        await firebase.assertSucceeds(db.collection("users").doc("alice").set({}));
    })
    it('does not allow users to read or write other users\' settings', async () => {
        const db = getAuthedFirestore({ uid: "alice", email: "alice@example.com" });
        await firebase.assertFails(db.collection("users").doc("bob").get());
        await firebase.assertFails(db.collection("users").doc("bob").set({}));
    })
    // Coindrops
    it('does not allow users to create their own Coindrops via client (see /pages/api/createPiggybank.ts)', async () => {
        const db = getAuthedFirestore({ uid: "alice", email: "alice@example.com" });
        await firebase.assertFails(db.collection("piggybanks").doc("alice").set({}));
    })
    it('allows users to update & delete Coindrops owned by them', async () => {
        const db = getAuthedFirestore({ uid: "alice", email: "alice@example.com" });
        const adminDb = getAdminFirestore();
        await adminDb.collection('piggybanks').doc('alice').set({ owner_uid: 'alice' });
        await firebase.assertSucceeds(db.collection("piggybanks").doc("alice").set({ some_property: true }, { merge: true }));
        await firebase.assertSucceeds(db.collection("piggybanks").doc("alice").delete());
    })
    it('does not allow users to update or delete Coindrops not owned by them', async () => {
        const db = getAuthedFirestore({ uid: "alice", email: "alice@example.com" });
        const adminDb = getAdminFirestore();
        await adminDb.collection('piggybanks').doc('bob').set({ owner_uid: 'bob' });
        await firebase.assertFails(db.collection("piggybanks").doc("bob").set({ some_property: true }, { merge: true }));
        await firebase.assertFails(db.collection("piggybanks").doc("bob").delete());
    })
    it('does not allow user to set owner_id to value other than auth.uid', async () => {
        const db = getAuthedFirestore({ uid: "alice", email: "alice@example.com" });
        const adminDb = getAdminFirestore();
        await adminDb.collection('piggybanks').doc('alice').set({ owner_uid: 'alice' });
        await firebase.assertSucceeds(db.collection("piggybanks").doc("alice").set({ owner_uid: "alice" }));
        await firebase.assertFails(db.collection("piggybanks").doc("alice").set({ owner_uid: "bob" }));
    })
})

afterAll(async () => {
    await firebase.clearFirestoreData({ projectId });
    await Promise.all(firebase.apps().map((app) => app.delete()));
})