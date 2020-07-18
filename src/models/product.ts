import { dbQuery } from "../services/db"

export type Product = {
    id: number;
    name: string;
    price: number;
}

const getProduct = async (id: number) => {
    const query = `SELECT * FROM product WHERE Id = ?`;
    const rows = await dbQuery(query, [id]);

    return rows[0] as Product | undefined;
}

const listProducts = async () => {
    const rows = await dbQuery(`SELECT * FROM product`);
    return rows as Product[];
}

const insertProduct = async (product: Product) => {
    await dbQuery(`INSERT INTO Product(name, price) VALUES(?, ?)`, [product.name, product.price]);
    const result = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE UPPER(name) = 'PRODUCT'`);
    const id = result[0].Id as number;
    return getProduct(id);
}

const updateProduct = async (id: number, product: Product) => {
    await dbQuery(`UPDATE Product SET Name = ?, Price = ? WHERE Id = ?`, [product.name, product.price, id]);
    return getProduct(id);
}

const deleteProduct = async(id: number) => {
    await dbQuery('DELETE FROM Product WHERE id = ?', [id]);
}

export const productModel = {
    getProduct,
    listProducts,
    insertProduct,
    updateProduct,
    deleteProduct
}