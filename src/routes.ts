import { Router } from 'express';
import userRouter from './routes/User';
import shortLinkRouter from './routes/ShortLink';

class Routes {
  static define(router: Router): Router {
    router.use('/user', userRouter);
    router.use('/shortLink', shortLinkRouter);
    return router;
  }
}

export default Routes.define(Router());
