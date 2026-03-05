export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      large?: { url: string; width: number; height: number };
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
    fotos?: {
      data: Foto[];
    };
  };
}

export interface Foto {
  id: number;
  attributes: {
    titel: string;
    beschreibung: string | null;
    bild: {
      data: StrapiMedia;
    };
    thumbnail?: {
      data: StrapiMedia;
    };
    saison: string | null;
    likes: number;
    views: number;
    erscheinungsdatum: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    kategorie?: {
      data: Kategorie;
    };
    uploadedBy?: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      };
    };
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

export interface StrapiListResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
