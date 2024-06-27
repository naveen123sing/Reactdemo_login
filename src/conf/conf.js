const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    CollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    BucketID:  String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default conf;