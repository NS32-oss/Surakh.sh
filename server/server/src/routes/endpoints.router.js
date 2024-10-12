import { Router } from "express";


const router = Router();
router.route('/login') //return register.html
    .get((req, res) => {
        res.sendFile('register.html', { root: '../htmls' });
    });

export default router;