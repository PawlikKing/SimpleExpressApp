import {Router, Request, Response} from "express";

const router = Router();

router.get('/', (req: Request, res:Response) => {
    res.render('employee');
})

export default router;