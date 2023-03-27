import shortLinkService from "../service/shortlink.service"
import { NextFunction, Request, Response } from "express";


// const deleteShortLink = (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.params.userId;
//   const user = shortLinkService.deleteShortLink(userId);

//   user
//   .then((user: unknown) => (user? res.status(201).json({
//     message: 'deleted' }) : res.status(404).json({
//     message: 'Not found'
//   })))
//   .catch((error: unknown) => res.status(500).json({ error}));
// };

const getShortLink = (req: Request, res: Response, next: NextFunction) => {
  const { shortLinkId } = req.params;
  const link = shortLinkService.findUrlOfShortLink(shortLinkId);
  if(link) {
    return link.then((link: string)=> {
        res.writeHead(301, {
          Location: `${link}`
      }).end();
      })
      .catch((error: unknown)=> res.status(500).json({ error}));
  }
  else
  {
    return res.status(404).json({ message: 'Not found' });
  }

};
export default {
  deleteShortLink,
  getShortLink,
}