import express, { Request, Response } from 'express';
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@zwt-tickets/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publisher/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/tickets', 
requireAuth,
[
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('价格必须大于0'),
  body(['type', 'site', 'seat', 'cover', 'intro', 'title'])
    .notEmpty()
    .withMessage('不能留空！请再次检查'),
],
validateRequest,
async (req: Request, res: Response) => {
  const { title, price, type, site, seat, cover, intro } = req.body

  const ticket = Ticket.build({
    title, price, type, site, seat, cover, intro,
    userId: req.currentUser!.id
  })
  await ticket.save()
  await new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    site: ticket.site,
    seat: ticket.seat,
    cover: ticket.cover,
    userId: ticket.userId,
    version: ticket.version
  })

  res.status(201).send(ticket)
});

export { router as createTicketRouter };
