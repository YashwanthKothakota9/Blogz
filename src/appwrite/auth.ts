import config from '../config/config';

import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      return this.login({ email, password });
    } else {
      return userAccount;
    }
  }
  async login({ email, password }: { email: string; password: string }) {
    return await this.account.createEmailSession(email, password);
  }
  async getCurrentUser() {
    return await this.account.get();
  }
  async logout() {
    return await this.account.deleteSessions();
  }
}

const authService = new AuthService();

export default authService;
