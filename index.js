require("dotenv").config();

const Airtable = require("airtable");
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE);
const firebaseAdmin = require("firebase-admin");
const args = process.argv.slice(2);

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIRESTORE_PROJECT_ID,
      clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
      privateKey: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: `https://${process.env.FIRESTORE_PROJECT_ID}.firebaseio.com`,
  });
}

if (args.length === 2) {
  base(args[0])
    .select()
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          firebaseAdmin
            .firestore()
            .collection(args[1])
            .doc(record.id)
            .set(record.fields, { merge: true });
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("Entries pushed from Airtable to Firestore.");
      }
    );
} else {
  console.error(
    "You must pass two arguments, first for the Airtable base and second for the Firestore collection name."
  );
}
