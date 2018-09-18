const tickets = {
  subscribe: async (parent, args, context, info) => {
    const {
      destinationId, date, time, first, skip,
    } = args;
    const where = {
      AND: [
        {
          mutation_in: ['CREATED', 'DELETED'],
        },
        {
          node: {
            destination: { id: destinationId },
            date,
            time,
          },
        },
      ],
    };
    return context.db.subscription.ticket({ first, skip, where }, info);
  },
};

module.exports = {
  tickets,
};
