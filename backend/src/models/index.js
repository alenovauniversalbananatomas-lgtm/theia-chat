import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Placeholder for User model
// In production, implement with database queries

export class User {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.email = data.email;
    this.username = data.username;
    this.passwordHash = data.passwordHash;
    this.avatar = data.avatar || null;
    this.theme = data.theme || 'dark';
    this.settings = data.settings || {};
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static async hashPassword(password) {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  async validatePassword(password) {
    return bcryptjs.compare(password, this.passwordHash);
  }

  toJSON() {
    const { passwordHash, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

export class Chat {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.userId = data.userId;
    this.projectId = data.projectId || null;
    this.title = data.title || 'New Chat';
    this.messages = data.messages || [];
    this.model = data.model || 'mixtral-8x7b-32768';
    this.temperature = data.temperature || 0.7;
    this.maxTokens = data.maxTokens || 2048;
    this.systemPrompt = data.systemPrompt || 'You are a helpful AI assistant.';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  addMessage(message) {
    this.messages.push(message);
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      projectId: this.projectId,
      title: this.title,
      model: this.model,
      temperature: this.temperature,
      maxTokens: this.maxTokens,
      messageCount: this.messages.length,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class Message {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.chatId = data.chatId;
    this.role = data.role; // 'user' or 'assistant'
    this.content = data.content;
    this.tokens = data.tokens || 0;
    this.createdAt = data.createdAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      chatId: this.chatId,
      role: this.role,
      content: this.content,
      tokens: this.tokens,
      createdAt: this.createdAt,
    };
  }
}

export class Project {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.userId = data.userId;
    this.name = data.name || 'New Project';
    this.description = data.description || '';
    this.color = data.color || '#3B82F6';
    this.chats = data.chats || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      description: this.description,
      color: this.color,
      chatCount: this.chats.length,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
