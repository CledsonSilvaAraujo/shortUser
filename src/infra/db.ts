// import { Db, MongoClient } from 'mongodb';

// const state: {
// 	db: Db | null;
// 	dbReadonly: Db | null;
// 	client: MongoClient | null;
// 	clientReadonly: MongoClient | null;
// } = {
// 	db: null,
// 	dbReadonly: null,
// 	client: null,
// 	clientReadonly: null,
// };

// async function connect() {
// 	const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/parcelex_localdb';
// 	const mongoUrlReadonly = process.env.MONGO_URL_READONLY
//     || 'mongodb://mongo-v2:27017/parcelex_localdb-v2';

// 	try {
// 		const mongoClient = await MongoClient.connect(mongoUrl, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});

// 		state.client = mongoClient;
// 		state.db = mongoClient.db();
// 	} catch (error) {
// 		throw error;
// 	}

// 	try {
// 		const mongoReadonlyClient = await MongoClient.connect(mongoUrlReadonly, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});

// 		state.clientReadonly = mongoReadonlyClient;
// 		state.dbReadonly = mongoReadonlyClient.db();
// 	} catch (error) {
// 		throw error;
// 	}
// }

// function get() {
// 	if (!state.db) throw new Error('Connection lost');
// 	return state.db;
// }

// function getReadonly() {
// 	if (!state.dbReadonly) throw new Error('Connection lost');
// 	return state.dbReadonly;
// }

// function getClient() {
// 	if (!state.client) throw new Error('Connection lost');
// 	return state.client;
// }

// async function close(force = false) {
// 	if ((!state.db || !state.client) || (!state.dbReadonly || !state.clientReadonly)) {
// 		throw new Error('There is no connection');
// 	}

// 	await state.client.close(force);
// 	await state.clientReadonly.close(force);
// }

// function getCollection(collectionName: string, isReadonly = false) {
// 	if (isReadonly) return getReadonly().collection(collectionName);
// 	return get().collection(collectionName);
// }

// export default {
// 	connect,
// 	close,
// 	get,
// 	getCollection,
// 	getClient,
// };
