import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest, NotAuthorizedError, NotFoundError } from '@zwt-tickets/common';
import { Ticket } from '../models/ticket'
import { TicketUpdatedPublisher } from '../events/publisher/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id',
requireAuth,
[
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('价格不能为0')
],
validateRequest,
async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) throw new NotFoundError()
  if(ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError()

  const { title, price, type, site, seat, cover, intro } = req.body
  
  ticket.set({
    title, price, type, site, seat, cover, intro
  })

  await ticket.save()
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    site: ticket.site,
    seat: ticket.seat,
    cover: ticket.cover,
    version: ticket.version
  })

  res.send(ticket)
})

export { router as updateTicketRouter }