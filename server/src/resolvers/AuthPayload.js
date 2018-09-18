const AuthPayload = {
  user: async ({ user: { id } }, args, context, info) =>
    context.db.query.user({ where: { id } }, info),
};

module.exports = AuthPayload;
