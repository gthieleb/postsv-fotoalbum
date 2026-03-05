export default {
  routes: [
    {
      method: 'GET',
      path: '/kategorien',
      handler: 'kategorie.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/kategorien/:id',
      handler: 'kategorie.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/kategorien',
      handler: 'kategorie.create',
      config: {
        auth: true,
      },
    },
    {
      method: 'PUT',
      path: '/kategorien/:id',
      handler: 'kategorie.update',
      config: {
        auth: true,
      },
    },
    {
      method: 'DELETE',
      path: '/kategorien/:id',
      handler: 'kategorie.delete',
      config: {
        auth: true,
      },
    },
  ],
};
