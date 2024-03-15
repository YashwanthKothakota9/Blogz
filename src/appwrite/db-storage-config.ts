import config from '../config/config';

import { Client, Databases, Storage, Query, ID } from 'appwrite';

const bMap = new Map<string, boolean>();
bMap.set('true', true);
bMap.set('false', false);

export type PostDocument = {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
};

type UpdatePostDocument = {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
};

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

  async getPosts(queries = [Query.equal('status', true)]) {
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
    content,
    featuredImage,
    status,
    title,
    slug,
    userId,
  }: PostDocument) {
    try {
      const bStatus: boolean = bMap.get(status)!;
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { content, featuredImage, status: bStatus, title, userId }
      );
    } catch (error) {
      console.log('Appwrite Service :: createPost() :: ', error);
      return false;
    }
  }

  async updatePost(
    slug: string,
    { title, content, featuredImage, status }: UpdatePostDocument
  ) {
    try {
      const bStatus: boolean = bMap.get(status)!;
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status: bStatus }
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
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
