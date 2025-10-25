import { ProductModel } from "@models";
import { Request, Response } from "express";

export const getProduct = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const product = await ProductModel.findByPk(id).catch(err => {
        console.error(err);
        res.status(500).json({message: "Internal server error."});
    });

    if(!product) return res.send(404).json({message: 'Product not found'});

    res.status(200).json(product?.name);
}