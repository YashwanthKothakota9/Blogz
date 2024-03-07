import config from '../config/config';

import { Client, Databases, Storage, Query, ID } from 'appwrite';

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite Service :: getPost() :: ', error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log('Appwrite Service :: getPost() :: ', error);
      return false;
    }
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: boolean;
    userId: string;
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log('Appwrite Service :: createPost() :: ', error);
      return false;
    }
  }

  async updatePost(
    slug: string,
    {
      title,
      content,
      featuredImage,
      status,
    }: {
      title: string;
      content: string;
      featuredImage: string;
      status: boolean;
    }
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log('Appwrite Service :: updatePost() :: ', error);
      return false;
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log('Appwrite Service :: deletePost() :: ', error);
      return false;
    }
  }

  //storage service

  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite Service :: uploadFile() :: ', error);
      return false;
    }
  }

  async deleteFile(fileId: string) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log('Appwrite Service :: deleteFile() :: ', error);
      return false;
    }
  }

  getFilePreview(fileId: string) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId).href;
  }
}

const service = new Service();
export default service;
