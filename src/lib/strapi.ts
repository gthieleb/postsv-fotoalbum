const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiRequestOptions {
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
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

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      ...headers,
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status}`);
  }

  return response.json();
}

export async function getFotos(categorySlug?: string) {
  const filters = categorySlug 
    ? { 'kategorie.slug': categorySlug }
    : {};
    
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
  return fetchAPI('/kategorien', {
    populate: ['fotos'],
    sort: ['name:asc'],
  });
}

export async function getFotosByCategory(slug: string) {
  return fetchAPI(`/fotos/category/${slug`);
}

export function getStrapiMediaUrl(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  
  const media = data as { data?: { attributes?: { url?: string } } };
  
  if (!media.data?.attributes?.url) return null;
  
  const url = media.data.attributes.url;
  
  if (url.startsWith('http')) {
    return url;
  }
  
  return `${STRAPI_URL}${url}`;
}

export function getThumbnailUrl(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  
  const media = data as { 
    data?: { 
      attributes?: { 
        formats?: { 
          thumbnail?: { url: string };
          small?: { url: string };
        };
        url?: string;
      } 
    } 
  };
  
  if (!media.data?.attributes) return null;
  
  const attrs = media.data.attributes;
  
  if (attrs.formats?.thumbnail?.url) {
    const url = attrs.formats.thumbnail.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  if (attrs.formats?.small?.url) {
    const url = attrs.formats.small.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  if (attrs.url) {
    const url = attrs.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  return null;
}

export { STRAPI_URL };
