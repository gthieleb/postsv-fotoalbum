# Strapi + Cloudflare R2 Integration Plan

## Ziel
Foto-Upload-System mit Strapi CMS und Cloudflare R2 Storage für den Post SV Magdeburg Fotoalbum.

## Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                     Lokale Entwicklung                       │
│                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌─────────────┐ │
│  │   Next.js    │────▶│   Strapi     │────▶│ PostgreSQL  │ │
│  │   :3000      │     │   :1337      │     │   :5432     │ │
│  └──────────────┘     └──────────────┘     └─────────────┘ │
│         │                    │                              │
│         │                    ▼                              │
│         │           ┌──────────────┐                        │
│         └──────────▶│ Cloudflare   │                        │
│                      │ R2 (Remote)  │                        │
│                      └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Projektstruktur erstellen

### 1.1 Verzeichnisstruktur
```
postsv-fotoalbum/
├── docker-compose.yml
├── .env.example
├── backend/                    # Strapi CMS
│   ├── config/
│   │   ├── admin.ts
│   │   ├── api.ts
│   │   ├── database.ts
│   │   ├── middlewares.ts
│   │   ├── plugins.ts
│   │   └── server.ts
│   ├── src/
│   │   ├── api/
│   │   │   ├── foto/
│   │   │   │   ├── content-types/
│   │   │   │   │   └── foto/
│   │   │   │   │       └── schema.json
│   │   │   │   ├── controllers/
│   │   │   │   │   └── foto.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── foto.ts
│   │   │   │   └── services/
│   │   │   │       └── foto.ts
│   │   │   └── kategorie/
│   │   │       ├── content-types/
│   │   │       │   └── kategorie/
│   │   │       │       └── schema.json
│   │   │       └── ...
│   │   ├── extensions/
│   │   │   └── users-permissions/
│   │   │       └── content-types/
│   │   └── middlewares/
│   ├── public/
│   │   └── uploads/
│   ├── types/
│   │   └── generated/
│   │       └── contentTypes.d.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/                   # Bestehendes Next.js
│   ├── src/
│   │   ├── lib/
│   │   │   └── strapi.ts       # API Client
│   │   └── types/
│   │       └── strapi.ts       # TypeScript Types
│   └── .env.local
└── prompts/
```

### 1.2 Docker Compose (docker-compose.yml)
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: postsv-postgres
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - postsv-network

  strapi:
    image: node:20-alpine
    container_name: postsv-strapi
    working_dir: /app
    volumes:
      - ./backend:/app
      - strapi_node_modules:/app/node_modules
    ports:
      - "1337:1337"
    environment:
      NODE_ENV: development
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
    depends_on:
      - postgres
    networks:
      - postsv-network
    command: sh -c "npm install && npm run develop"

networks:
  postsv-network:
    driver: bridge

volumes:
  postgres_data:
  strapi_node_modules:
```

## Phase 2: Strapi Setup

### 2.1 Strapi installieren
```bash
# Im backend/ Verzeichnis
npx create-strapi-app@latest . --quickstart --no-run

# Oder manuell:
npm init -y
npm install @strapi/strapi@5 @strapi/plugin-graphql @strapi/plugin-i18n @strapi/plugin-users-permissions
npm install pg @strapi/database
npm install @strapi/provider-upload-aws-s3
npm install typescript @types/node
```

### 2.2 Strapi Konfiguration

#### backend/config/database.ts
```typescript
import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
```

#### backend/config/plugins.ts
```typescript
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
});
```

#### backend/config/server.ts
```typescript
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
});
```

#### backend/config/middlewares.ts
```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'https://picsum.photos',
            'https://*.r2.cloudflarestorage.com',
            'https://*.r2.dev',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://*.r2.cloudflarestorage.com',
            'https://*.r2.dev',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 2.3 Datenmodell

#### backend/src/api/foto/content-types/foto/schema.json
```json
{
  "kind": "collectionType",
  "collectionName": "fotos",
  "info": {
    "singularName": "foto",
    "pluralName": "fotos",
    "displayName": "Foto",
    "description": "Fotos für das Vereinsalbum"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "titel": {
      "type": "string",
      "required": true
    },
    "beschreibung": {
      "type": "text"
    },
    "bild": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "thumbnail": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "saison": {
      "type": "string"
    },
    "kategorie": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::kategorie.kategorie",
      "inversedBy": "fotos"
    },
    "likes": {
      "type": "integer",
      "default": 0,
      "min": 0
    },
    "views": {
      "type": "integer",
      "default": 0,
      "min": 0
    },
    "erscheinungsdatum": {
      "type": "datetime"
    },
    "uploadedBy": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.user",
      "inversedBy": "fotos"
    }
  }
}
```

#### backend/src/api/kategorie/content-types/kategorie/schema.json
```json
{
  "kind": "collectionType",
  "collectionName": "kategorien",
  "info": {
    "singularName": "kategorie",
    "pluralName": "kategorien",
    "displayName": "Kategorie",
    "description": "Foto-Kategorien"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "beschreibung": {
      "type": "text"
    },
    "fotos": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::foto.foto",
      "mappedBy": "kategorie"
    },
    "icon": {
      "type": "string"
    }
  }
}
```

### 2.4 Controller & Services

#### backend/src/api/foto/controllers/foto.ts
```typescript
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

  async like(ctx) {
    const { id } = ctx.params;
    const foto = await strapi.entityService.findOne('api::foto.foto', id);
    const updated = await strapi.entityService.update('api::foto.foto', id, {
      data: { likes: (foto.likes || 0) + 1 },
    });
    return { data: { likes: updated.likes } };
  },

  async view(ctx) {
    const { id } = ctx.params;
    const foto = await strapi.entityService.findOne('api::foto.foto', id);
    const updated = await strapi.entityService.update('api::foto.foto', id, {
      data: { views: (foto.views || 0) + 1 },
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
      populate: { bild: true, thumbnail: true, kategorie: true },
      sort: { createdAt: 'desc' },
    });

    return { data: fotos };
  },
}));
```

#### backend/src/api/foto/routes/foto.ts
```typescript
export default {
  routes: [
    {
      method: 'GET',
      path: '/fotos',
      handler: 'foto.find',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/fotos/:id',
      handler: 'foto.findOne',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/fotos/:id/like',
      handler: 'foto.like',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/fotos/:id/view',
      handler: 'foto.view',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/fotos/category/:slug',
      handler: 'foto.byCategory',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/fotos',
      handler: 'foto.create',
      config: { auth: true },
    },
    {
      method: 'PUT',
      path: '/fotos/:id',
      handler: 'foto.update',
      config: { auth: true },
    },
    {
      method: 'DELETE',
      path: '/fotos/:id',
      handler: 'foto.delete',
      config: { auth: true },
    },
  ],
};
```

### 2.5 Umgebungsvariablen

#### backend/.env
```env
# Server
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi

# App Keys (generate with: openssl rand -base64 32)
APP_KEYS=["key1","key2","key3","key4"]
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret

# Cloudflare R2
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<your-access-key-id>
R2_ACCESS_SECRET=<your-access-secret>
R2_BUCKET=postsv-fotos
R2_PUBLIC_URL=https://pub-<your-bucket-id>.r2.dev
```

## Phase 3: Cloudflare R2 Setup

### 3.1 R2 Bucket erstellen
1. Cloudflare Dashboard öffnen: https://dash.cloudflare.com
2. R2 Object Storage auswählen
3. "Create bucket" klicken
4. Name: `postsv-fotos`
5. Location: Automatisch (oder nächster Standort)

### 3.2 API Token erstellen
1. R2 > Manage R2 API Tokens
2. "Create API token"
3. Permissions:
   - Object Read & Write
   - Bucket Read
4. Bucket scope: `postsv-fotos`
5. Token erstellen und speichern:
   - Access Key ID
   - Secret Access Key

### 3.3 Public Access aktivieren
1. Bucket `postsv-fotos` öffnen
2. Settings > Public Access
3. "Allow Access" aktivieren
4. Public Bucket URL kopieren

### 3.4 CORS konfigurieren
```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://gthieleb.github.io"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

## Phase 4: Next.js Integration

### 4.1 API Client

#### frontend/src/lib/strapi.ts
```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiRequestOptions {
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: { page?: number; pageSize?: number };
}

async function fetchAPI(
  path: string,
  options: StrapiRequestOptions = {},
  init: RequestInit = {}
) {
  const url = new URL(`${STRAPI_URL}/api${path}`);
  const query: Record<string, string> = {};
  
  if (options.populate) {
    query.populate = Array.isArray(options.populate) 
      ? options.populate.join(',') 
      : options.populate;
  }
  if (options.sort) {
    query.sort = Array.isArray(options.sort) 
      ? options.sort.join(',') 
      : options.sort;
  }
  if (options.pagination) {
    query['pagination[page]'] = options.pagination.page?.toString() || '1';
    query['pagination[pageSize]'] = options.pagination.pageSize?.toString() || '100';
  }
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      query[`filters[${key}]`] = String(value);
    });
  }
  
  url.search = new URLSearchParams(query).toString();

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url.toString(), { ...init, headers: { ...headers, ...init.headers } });
  if (!response.ok) throw new Error(`Strapi API error: ${response.status}`);
  return response.json();
}

export async function getFotos(categorySlug?: string) {
  const filters = categorySlug ? { 'kategorie.slug': categorySlug } : {};
  return fetchAPI('/fotos', {
    populate: ['bild', 'thumbnail', 'kategorie'],
    sort: ['createdAt:desc'],
    filters,
  });
}

export async function getFoto(id: number) {
  return fetchAPI(`/fotos/${id}`, {
    populate: ['bild', 'thumbnail', 'kategorie', 'uploadedBy'],
  });
}

export async function likeFoto(id: number) {
  return fetchAPI(`/fotos/${id}/like`, {}, { method: 'POST' });
}

export async function viewFoto(id: number) {
  return fetchAPI(`/fotos/${id}/view`, {}, { method: 'POST' });
}

export async function getKategorien() {
  return fetchAPI('/kategorien', { populate: ['fotos'], sort: ['name:asc'] });
}

export function getStrapiMediaUrl(data: any): string | null {
  if (!data?.data?.attributes?.url) return null;
  const url = data.data.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}
```

### 4.2 TypeScript Types

#### frontend/src/types/strapi.ts
```typescript
export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    url: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Kategorie {
  id: number;
  attributes: {
    name: string;
    slug: string;
    beschreibung: string | null;
    icon: string | null;
    createdAt: string;
    updatedAt: string;
    fotos?: { data: Foto[] };
  };
}

export interface Foto {
  id: number;
  attributes: {
    titel: string;
    beschreibung: string | null;
    bild: { data: StrapiMedia };
    thumbnail?: { data: StrapiMedia };
    saison: string | null;
    likes: number;
    views: number;
    erscheinungsdatum: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    kategorie?: { data: Kategorie };
    uploadedBy?: { data: { id: number; attributes: { username: string } } };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
```

### 4.3 Umgebungsvariablen

#### frontend/.env.local
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token
```

## Phase 5: Deployment

### 5.1 Render.com Deployment

#### render.yaml
```yaml
services:
  - type: web
    name: postsv-strapi
    env: node
    region: frankfurt
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /_health
    envVars:
      - key: NODE_VERSION
        value: 20
      - key: NODE_ENV
        value: production
      - key: DATABASE_CLIENT
        value: postgres
      - key: DATABASE_HOST
        fromDatabase:
          name: postsv-db
          property: host
      - key: DATABASE_PORT
        value: 5432
      - key: DATABASE_NAME
        value: strapi
      - key: DATABASE_USERNAME
        fromDatabase:
          name: postsv-db
          property: user
      - key: DATABASE_PASSWORD
        fromDatabase:
          name: postsv-db
          property: password
      - key: APP_KEYS
        generateValue: true
      - key: API_TOKEN_SALT
        generateValue: true
      - key: ADMIN_JWT_SECRET
        generateValue: true
      - key: JWT_SECRET
        generateValue: true

databases:
  - name: postsv-db
    region: frankfurt
    plan: free
    databaseName: strapi
    user: strapi
```

### 5.2 Update Next.js für Production

#### frontend/.env.production
```env
NEXT_PUBLIC_STRAPI_URL=https://postsv-strapi.onrender.com
```

## Pre-Commit Checks

```bash
npm run lint
npm run build
docker-compose up -d
docker-compose logs -f strapi
```

## Playwright MCP Tests

1. Strapi Admin öffnen: http://localhost:1337/admin
2. Ersten Admin-User erstellen
3. Kategorien anlegen
4. Fotos hochladen (testen ob R2 funktioniert)
5. API testen: http://localhost:1337/api/fotos
6. Next.js Frontend testen

## Wichtige Hinweise

1. **R2 kostenlos**: 10GB Storage, keine Egress-Gebühren
2. **Strapi Admin**: OAuth nicht möglich, E-Mail/Passwort verwenden
3. **API Token**: In Strapi Admin erstellen unter Settings > API Tokens
4. **Backup**: PostgreSQL Datenbank regelmäßig sichern
5. **Rate Limiting**: Bei hoher Last Rate Limiting implementieren

## Zeitplan

| Phase | Dauer |
|-------|-------|
| 1. Projektstruktur | 30 Min |
| 2. Strapi Setup | 1 Std |
| 3. R2 Konfiguration | 30 Min |
| 4. Next.js Integration | 1 Std |
| 5. Testing | 30 Min |
| **Gesamt** | **3,5 Std** |
