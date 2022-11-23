import mongoose from "mongoose";
import DBMongoDB from "./DB/MongoDB.js";

const messageSchema = mongoose.Schema({
  name: {
    type: String,
    default: "ANONYMOUS",
    required: true,
  },
  lastName: {
    type: String,
    default: "ANONYMOUS",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
});

const messageModel = mongoose.model("message", messageSchema);

class messageModelMongoDB {
  async createMessage(message) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const newMessage = new messageModel(message);
      await newMessage.save();
      return DBMongoDB.getObjectWithId(newMessage.toObject());
    } catch (error) {
      console.log("Error al intentar cargar el mensaje:", error.message);
      return {};
    }
  }

  async readMessages() {
    if (!(await DBMongoDB.connectDB())) {
      return [];
    }
    try {
      const messages = await messageModel.find({}).lean();
      return DBMongoDB.getObjectWithId(messages);
    } catch (error) {
      console.error("Error al intentar leer los mensajes:", error.message);
      return [];
    }
  }

  async readMessage(id) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const message = (await messageModel.findById(id).lean()) || {};
      return DBMongoDB.getObjectWithId(message);
    } catch (error) {
      console.error(`Error al intentar leer el mensaje #:${id}`, error.message);
    }
    return {};
  }

  async updateMessage(id, message) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const updatedMessage =
        (await messageModel.findByIdAndUpdate(
          id,
          { $set: message },
          {
            returnDocument: "after",
          }
        ).lean()) || {};
      return DBMongoDB.getObjectWithId(updatedMessage);
    } catch (error) {
      console.error(
        `Error al intentar actualizar el mensaje #:${id}`,
        error.message
      );
      return {};
    }
  }

  async deleteMessage(id) {
    if (!(await DBMongoDB.connectDB())) {
      return {};
    }
    try {
      const deletedMessage = (await messageModel.findByIdAndDelete(id).lean()) || {};
      return DBMongoDB.getObjectWithId(deletedMessage);
    } catch (error) {
      console.error(
        `Error al intentar eliminar el mensaje #:${id}`,
        error.message
      );
      return {};
    }
  }
}

export default messageModelMongoDB;