import clientPromise from '../lib/mongodb.js';

export async function saveContact(data) {
  try {
    const client = await clientPromise;
    const db = client.db('your_db_name'); // vendos emrin e DB tënd këtu
    const collection = db.collection('contacts');

    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    throw new Error('Error saving contact: ' + error.message);
  }
}
