export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('R2_PUBLIC_URL'),
        s3Options: {
          endpoint: env('R2_ENDPOINT'),
          accessKeyId: env('R2_ACCESS_KEY_ID'),
          secretAccessKey: env('R2_ACCESS_SECRET'),
          params: {
            Bucket: env('R2_BUCKET'),
          },
          region: 'auto',
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'de',
      locales: ['de', 'en'],
    },
  },
});
