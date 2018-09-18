const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthError, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  const { email, password } = args;
  // check if an account with provided email exists
  const users = await context.db.query.users({
    where: { email },
  });
  // account is an empty array when not found
  if (users.length > 0) {
    throw new Error('Account with this email already exists.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await context.db.mutation.createUser({
    data: { email, password: hashedPassword },
  });

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } });
  const valid = await bcrypt.compare(args.password, user ? user.password : '');

  if (!valid || !user) {
    throw new AuthError();
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  };
}

function createTicket(parent, args, context, info) {
  const {
    destinationId, date, time, seatId,
  } = args; // destructure input arguments

  const ownerId = getUserId(context);
  // creating only a reservation for a seat
  const paid = false;

  return context.db.mutation.createTicket(
    {
      data: {
        destination: { connect: { id: destinationId } },
        date,
        time,
        seatId,
        owner: { connect: { id: ownerId } },
        paid,
      },
    },
    info,
  );
}

function deleteTicket(parent, args, context, info) {
  const { id, first, skip } = args;
  // TODO: check if user is owner of this ticket

  return context.db.mutation.deleteTicket({ first, skip, where: { id } }, info);
}

function ticketsPaid(parent, args, context, info) {
  const { tickets, first, skip } = args;
  const ticketIds = tickets.map(ticket => ticket.id);

  return context.db.mutation.updateManyTickets(
    {
      first,
      skip,
      where: { id_in: ticketIds },
      data: { paid: true },
    },
    info,
  );
}

module.exports = {
  signup,
  login,
  createTicket,
  deleteTicket,
  ticketsPaid,
};
