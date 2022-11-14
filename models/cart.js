import mongoose from 'mongoose';
import DBMongoDB from './DB/MongoDB.js';

const cartSchema = mongoose.Schema({
    client:{
        type: String,
        default: "ANONYMOUS",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    products: {
        type: Object,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

const CartModel = mongoose.model('cart', cartSchema);

class CartModelMongoDB {
  async createCart(cart){
    if(! await DBMongoDB.connectDB()){
      return {};
    }
    try{
      const newCart = new CartModel(cart);
      await newCart.save();
      return DBMongoDB.getObjectWithId(newCart.toObject());
    } catch (error) {
      console.log("Error al intentar dar de alta el carrito:", error.message);
      return {};
    }
  }

  async readCarts () {
    if (! await DBMongoDB.connectDB()) {
        return [];
    }
    try {
        const carts = await CartModel.find({}).lean();
        return DBMongoDB.getObjectWithId(carts);
    } catch (error) {
        console.error('Error al intentar leer los carritos:', error.message);
        return [];
    }
  }

  async readCart (id) {
    if (! await DBMongoDB.connectDB()) {
        return {};
    }
    try {
        const cart = await CartModel.findById(id).lean() || {};
        return DBMongoDB.getObjectWithId(cart);
    } catch (error) {
        console.error(`Error al intentar leer el carrito #:${id}`, error.message);
    }
    return {};
  }

  async updateCart (id, cart) {
    if (! await DBMongoDB.connectDB()) {
        return {};
    }
    try {
        const updatedCart = await CartModel.findByIdAndUpdate(id, {$set: cart}, {
            returnDocument: 'after'
        }).lean() || {};
        return DBMongoDB.getObjectWithId(updatedCart);
    } catch (error) {
        console.error(`Error al intentar actualizar el carrito #:${id}`, error.message);
        return {};
    }
  }

  async deleteCart (id) {
    if (! await DBMongoDB.connectDB()) {
        return {};
    }
    try {
        const deletedCart = await CartModel.findByIdAndDelete(id).lean() || {};
        return DBMongoDB.getObjectWithId(deletedCart);
    } catch (error) {
        console.error(`Error al intentar eliminar el carrito #:${id}`, error.message);
        return {};
    }
  }

}

export default CartModelMongoDB;
