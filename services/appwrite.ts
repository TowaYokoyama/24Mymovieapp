// track search made by a user
import {Client, Databases, Query, ID} from 'react-native-appwrite'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const client = new Client()
.setEndpoint(ENDPOINT) //ここが問題で間違っていることがわかる
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


const database = new Databases(client);


export const updateSearchCount = async(query: string, movie : Movie) => {

    try {

    
    const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ])

    if (result.documents.length > 0) {
        const existingMovie = result.documents[0];

        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
                count: existingMovie.count + 1
            }
        );
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        });
    }
    // check if a record of the search has arleady been stored
    //if a document is found increment the seacch count fieled
    //if no document is  found 
    // create a new document in Appwrite databease  => 1
}
 catch (error) {
    console.log(error);
    throw error;
}


function setEndpoint(arg0: string) {
    throw new Error('Function not implemented.');
}}
