import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::foto.foto', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    const entity = await strapi.service('api::foto.foto').find({
      ...query,
      populate: {
        bild: true,
        thumbnail: true,
        kategorie: true,
        uploadedBy: {
          fields: ['id', 'username']
        }
      },
      sort: { createdAt: 'desc' },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::foto.foto').findOne(id, {
      ...query,
      populate: {
        bild: true,
        thumbnail: true,
        kategorie: true,
        uploadedBy: {
          fields: ['id', 'username']
        }
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async like(ctx) {
    const { id } = ctx.params;
    
    const foto = await strapi.entityService.findOne('api::foto.foto', id);
    
    if (!foto) {
      return ctx.notFound('Foto nicht gefunden');
    }
    
    const updated = await strapi.entityService.update('api::foto.foto', id, {
      data: {
        likes: (foto.likes || 0) + 1,
      },
    });

    return { data: { likes: updated.likes } };
  },

  async view(ctx) {
    const { id } = ctx.params;
    
    const foto = await strapi.entityService.findOne('api::foto.foto', id);
    
    if (!foto) {
      return ctx.notFound('Foto nicht gefunden');
    }
    
    const updated = await strapi.entityService.update('api::foto.foto', id, {
      data: {
        views: (foto.views || 0) + 1,
      },
    });

    return { data: { views: updated.views } };
  },

  async byCategory(ctx) {
    const { slug } = ctx.params;
    
    const category = await strapi.db.query('api::kategorie.kategorie').findOne({
      where: { slug },
    });

    if (!category) {
      return ctx.notFound('Kategorie nicht gefunden');
    }

    const fotos = await strapi.entityService.findMany('api::foto.foto', {
      filters: {
        kategorie: category.id,
        publishedAt: { $ne: null }
      },
      populate: {
        bild: true,
        thumbnail: true,
        kategorie: true,
      },
      sort: { createdAt: 'desc' },
    });

    return { data: fotos };
  },
}));
