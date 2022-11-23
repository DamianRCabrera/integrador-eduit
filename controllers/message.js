import ApiMessage from "../api/message.js";

const api = new ApiMessage();

class ControllerMessage {
  async getMessages(req, res) {
    res.json(await api.getMessages());
  }

  async getMessage(req, res) {
    const id = req.params.id;
    res.json(await api.getMessage(id));
  }

  async postMessage(req, res) {
    const message = req.body;
    const newMessage = await api.createMessage(message);
    console.log("Mensaje enviado:", newMessage);
    res.json(newMessage);
  }

  async putMessage(req, res) {
    const id = req.params.id;
    const message = req.body;
    const updatedMessage = await api.updateMessage(id, message);
    res.json(updatedMessage);
  }

  async updateMessage(req, res) {
    const id = req.params.id;
    const message = req.body;
    const updatedMessage = await api.updateMessage(id, message);
    res.json(updatedMessage);
  }

  async deleteMessage(req, res) {
    const id = req.params.id;
    const removedMessage = await api.deleteMessage(id);
    res.json(removedMessage);
  }
}

export default ControllerMessage;