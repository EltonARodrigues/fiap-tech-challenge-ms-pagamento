import ProdutoService from "core/applications/services/produtoService";
import { Request, Response } from "express";

export default class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    async criaProduto(req: Request, res: Response) {
        try {
            const produto = req.body;

            const produtoCriado = await this.produtoService.criaProduto(produto);
            return res.status(201).json({
                status: "success",
                message: produtoCriado,
            });
        } catch (err: any) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async deletaProduto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const produtoDeletado = await this.produtoService.deletaProduto(id);

            if (produtoDeletado > 0) {
                return res.status(200).json({
                    status: "success",
                });
            }
            return res.status(404).json({
                status: "error",
                message: 'product not found!',
            });
        } catch (err: any) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async editaProduto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const produto = req.body;

            const produtorAtualizado = await this.produtoService.editaProduto(id, produto);

            if (produtorAtualizado) {
                return res.status(200).json({
                    status: "success",
                    message: produtorAtualizado,
                });
            }
            return res.status(404).json({
                status: "error",
                message: 'product not found!',
            });
        } catch (err: any) {
            if (err.message === 'categoria_inexistente') {
                return res.status(400).json({
                    status: "error",
                    message: 'Categoria inexistente!',
                });
            }
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async listaProdutos(req: Request, res: Response) {
        try {
            const categoriaId = req.query.categoriaId;
            const filtro: {
                categoriaId?: string
            } = {};

            if (categoriaId) {
                filtro.categoriaId = categoriaId as string;
            }

            const produtos = await this.produtoService.listaProdutos(filtro);

            return res.status(200).json({
                status: "success",
                produtos,
            });
        } catch (err: any) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }

    async retornaProduto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const produto = await this.produtoService.retornaProduto(id);

            if (produto) {
                return res.status(200).json({
                    status: "success",
                    produto,
                });
            }
            return res.status(404).json({
                status: "error",
                message: "Product not found!",
            });

        } catch (err: any) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
    }
}