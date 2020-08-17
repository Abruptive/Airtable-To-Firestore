# Airtable to Firestore

Organizing data in Firestore is a challenging task. So we created a simple library that helps you push data from Airtable to Google Firestore.

## Guide
1. Run `npm install` in the project root.
2. Create and enter your Airtable API key and Firestore credentials in the .env file. See the example .env file below.
3. Run `npm run push <AIRTABLE_BASE_ID> <AIRTABLE_TABLE> <FIREBASE_COLLECTION>` in your console, but replace them with the Airtable table name and the Firestore collection name. For example: npm run push Cars cars
4. That's it! Your data will now be pushed to Firestore.

Note: The table you reference in the npm run push command needs to be inside the base you reference through your AIRTABLE_BASE variable in your .env.

## Example .env File
```
FIRESTORE_PROJECT_ID=
FIRESTORE_CLIENT_EMAIL=
FIRESTORE_PRIVATE_KEY=
AIRTABLE_API_KEY=
AIRTABLE_BASE=
```