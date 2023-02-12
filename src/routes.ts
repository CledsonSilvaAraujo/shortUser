import { Router } from 'express';
import userRouter from './routes/User';

class Routes {
  static define(router: Router): Router {
    router.use('/user', userRouter);

    return router;
  }
}

export default Routes.define(Router());
