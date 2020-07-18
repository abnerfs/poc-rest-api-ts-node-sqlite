import { Request, Response } from 'express';
import { badRequest, internalServerError, notFound, ok } from '../services/util';
import { productModel, Product } from '../models/product';

const getProduct = (req: Request, res: Response): any => {
    const id = parseInt(req.params.id);

    {
        if (!id)
            return badRequest(res, 'Id inválido');
    }

    productModel.getProduct(id)
        .then(product => {
            if (product)
                res.json(product);
            else
                notFound(res);
        })
        .catch((err: Error) => internalServerError(res, err));
};

const listProducts = ({ }: Request, res: Response) => {

    productModel.listProducts()
        .then(products => res.json(products || []))
        .catch((err: Error) => internalServerError(res, err));
}

const insertProduct = (req: Request, res: Response) => {

    {
        const product = req.body;
        if (!product)
            return badRequest(res, 'Produto inválido');

        if (!product.name)
            return badRequest(res, 'Informe o nome do produto');

        if (!parseInt(product.price))
            return badRequest(res, 'Informe o preço do produto');
    }

    const product = req.body as Product;

    return productModel.insertProduct(product)
        .then(product => res.json(product))
        .catch((err: Error) => internalServerError(res, err));

}

const updateProduct = async (req: Request, res: Response) => {

    {
        const product = req.body;
        if (!product)
            return badRequest(res, 'Produto inválido');

        if (!product.name)
            return badRequest(res, 'Informe o nome do produto');

        if (!parseInt(product.price))
            return badRequest(res, 'Informe o preço do produto');

        const id = parseInt(req.params.id);
        if (!id)
            return notFound(res);

        const productSaved = await productModel.getProduct(id);
        if (!productSaved)
            return notFound(res);
    }

    const id = parseInt(req.params.id);
    const product = req.body as Product;

    return productModel.updateProduct(id, product)
        .then(product => res.json(product))
        .catch((err: Error) => internalServerError(res, err));
}

const deleteProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!id)
            return badRequest(res, 'Id inválido');

        const productSaved = await productModel.getProduct(id);
        if (!productSaved)
            return notFound(res);
    }

    return productModel.deleteProduct(id)
        .then(_ => ok(res))
        .catch((err: Error) => internalServerError(res, err));
}

export const productController = {
    getProduct,
    listProducts,
    insertProduct,
    updateProduct,
    deleteProduct
}

