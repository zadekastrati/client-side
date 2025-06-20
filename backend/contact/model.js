import clientPromise from '../src/lib/mongodb.js';


export async function saveContact(data) {
  try {
    const client = await clientPromise;
    const db = client.db('event-ticketing');
    const collection = db.collection('contacts');

    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    throw new Error('Error saving contact: ' + error.message);
  }
}
