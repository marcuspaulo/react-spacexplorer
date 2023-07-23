export interface Base {
    collection: Collection;
}

export interface Collection {
    version: string;
    href: string;
    items: Item[];
    metadata: Metadata;
    links: Link2[];
}

export interface Item {
    item: Item;
    href: string;
    data: Data[];
    links: Link[];
}

export interface Data {
    data: Data;
    center: string;
    title: string;
    photographer?: string;
    location?: string;
    nasa_id: string;
    media_type: string;
    keywords?: string[];
    date_created: string;
    description_508?: string;
    secondary_creator?: string;
    description: string;
    album?: string[];
}

export interface Link {
    href: string;
    rel: string;
    render?: string;
}

export interface Metadata {
    total_hits: number;
}

export interface Link2 {
    rel: string;
    prompt: string;
    href: string;
}
