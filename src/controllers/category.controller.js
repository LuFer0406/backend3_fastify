import { response } from "../helpers/Response.js";
import { categoryModel } from "../models/category.model.js";
import { postModel } from "../models/post.model.js";

const categoryCtrl = {};

categoryCtrl.listar = async (req, reply) => {
  try {
    const categorias = await categoryModel.find();
    response(reply, 200, true, categorias, "Lista de categorías");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

categoryCtrl.crear = async (req, reply) => {
  try {
    const nuevaCategoria = await categoryModel.create(req.body);
    response(reply, 201, true, nuevaCategoria, "La categoría ha sido creada con éxito.");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

categoryCtrl.listarPorId = async (req, reply) => {
  try {
    const { id } = req.params;
    const categoria = await categoryModel.findById(id);
    const postRelacionado = await postModel.find({category: id})

    if (!categoria) {
      return response(reply, 404, false, "", "La categoría no ha sido encontrada");
    }
    response(reply, 200, true, {categoria, postsRelacionados: postRelacionado}, "La categoría ha sido encontrada con éxito");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

categoryCtrl.eliminar = async (req, reply) => {
  try {
    const { id } = req.params;
    const categoria = await categoryModel.findById(id);
    if (!categoria) {
      return response(reply, 404, false, "", "La categoría no ha sido encontrada");
    }

    await categoria.deleteOne();
    response(reply, 200, true, "", "La categoría ha sido eliminada con éxito");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

categoryCtrl.actualizar = async (req, reply) => {
  try {
    const { id } = req.params;
    const categoria = await categoryModel.findById(id);
    if (!categoria) {
      return response(reply, 404, false, "", "La categoría no ha sido encontrada");
    }
    await categoria.updateOne(req.body);
    response(reply, 200, true, "", "La categoría ha sido actualizada con éxito");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default categoryCtrl;
