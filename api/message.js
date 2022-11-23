import Model from "../models/message.js";

const model = new Model();

class ApiMessage {
  async getMessages() {
    const messages = await model.readMessages();
    return messages;
  }

  async getMessage(id) {
    const message = await model.readMessage(id);
    return message;
  }

  async createMessage(message) {
    const createdMessage = await model.createMessage(message);
    return createdMessage;
  }

  async updateMessage(id, message) {
    const updateMessage = await model.updateMessage(id, message);
    return updateMessage;
  }

  async deleteMessage(id) {
    const removedMessage = await model.deleteMessage(id);
    return removedMessage;
  }
}

export default ApiMessage;
