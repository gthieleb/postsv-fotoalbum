import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::kategorie.kategorie', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    const entity = await strapi.service('api::kategorie.kategorie').find({
      ...query,
      populate: {
        fotos: {
          count: true,
        },
      },
      sort: { name: 'asc' },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
