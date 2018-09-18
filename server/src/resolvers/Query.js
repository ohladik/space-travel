const { getUserId } = require('../utils');

function destinations(parent, args, context, info) {
  const { id, first, skip } = args;
  const where = id ? { id } : {};

  return context.db.query.destinations({ first, skip, where }, info);
}

function tickets(parent, args, context, info) {
  const {
    destinationId, date, time, ownerId, first, skip,
  } = args;

  const where = {
    AND: [{ destination: { id: destinationId } }, { date }, { time }, { owner: { id: ownerId } }],
  };

  return context.db.query.tickets({ first, skip, where }, info);
}

function usersTickets(parent, args, context, info) {
  const { first, skip } = args;

  const ownerId = getUserId(context);
  const where = {
    owner: { id: ownerId },
    paid: true,
  };

  return context.db.query.tickets({ first, skip, where }, info);
}

function ticketsNotAvailable(parent, args, context, info) {
  const {
    destinationId, date, time, first, skip,
  } = args;

  const ownerId = getUserId(context);

  const where = {
    AND: [
      {
        AND: [{ destination: { id: destinationId } }, { date }, { time }],
      },
      {
        OR: [
          { AND: [{ owner: { id_not: ownerId } }] },
          { AND: [{ owner: { id: ownerId } }, { paid: true }] },
        ],
      },
    ],
  };

  return context.db.query.tickets({ first, skip, where }, info);
}

function ticketsSelected(parent, args, context, info) {
  const {
    destinationId, date, time, first, skip,
  } = args;

  const ownerId = getUserId(context);

  const where = {
    AND: [
      { destination: { id: destinationId } },
      { date },
      { time },
      { owner: { id: ownerId } },
      { paid: false },
    ],
  };

  return context.db.query.tickets({ first, skip, where }, info);
}

module.exports = {
  destinations,
  tickets,
  ticketsNotAvailable,
  ticketsSelected,
  usersTickets,
};
