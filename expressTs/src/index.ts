import express, { Request, Response } from 'express';
import mainRoute from './routes/index';

import { apikeygMid } from './middlewares/apiKeyMdw';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = 3000;


app.use(express.json());
// app.use(logMid);
app.use('/api', apikeygMid, mainRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is runing on http://localhost:${port}`);
})
