import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from '../conf/conf.js';

export class Service {
    Client = new Client();
    Databases;
    bucket;

    constructor(){
        this.Client.setEndpoint(conf.appwriteUrl)
                   .setProject(conf.projectId);
        this.Databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({ Title, slug, content, image, status, userid }) {
        try {
            return await this.Databases.createDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug,
                {
                    Title, content, image, status, userid,
                }
            )
        } catch(error){
            throw error;
        }
    }

    async updaePost(slug, { Title, content, image, status }) {
        try {
            return await this.Databases.updateDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug, {
                Title,
                content,
                image,
                status,
            }
            )
        }catch(error){
            console.log(error);
        }
    }

    async deletePost(slug){
        try{
            await this.Databases.deleteDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug
            )
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.Databases.getDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug
            )
        }catch(error){
            console.log(error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try{
            return await this.Databases.listDocuments(
                conf.DatabaseId,
                conf.CollectionId,
                queries,
            )
        }catch(error){
            console.log(error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.BucketID,
                ID.unique(),
                file
            )
        }catch(error){
            console.log(error)
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.BucketID,
                ID.unique(),
                fileId
            )
        }catch(error){
            console.log(error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.BucketID,
            fileId
        )
    }
}


const service = new Service()
export default service