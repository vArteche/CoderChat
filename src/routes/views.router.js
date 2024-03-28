import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    res.render(
        'index',
        {
            title: "CoderChat",
            style: "index.css"
        }
    );
});

export default router;