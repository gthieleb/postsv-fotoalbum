export default {
  routes: [
    {
      method: 'GET',
      path: '/fotos',
      handler: 'foto.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/fotos/:id',
      handler: 'foto.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/fotos/:id/like',
      handler: 'foto.like',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/fotos/:id/view',
      handler: 'foto.view',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/fotos/category/:slug',
      handler: 'foto.byCategory',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/fotos',
      handler: 'foto.create',
      config: {
        auth: true,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/fotos/:id',
      handler: 'foto.update',
      config: {
        auth: true,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/fotos/:id',
      handler: 'foto.delete',
      config: {
        auth: true,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
