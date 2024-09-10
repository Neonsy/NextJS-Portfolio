export type Project = {
    metadata: ProjectMetadata;
    content: string;
};

export type ProjectMetadata = {
    id: number;
    title: string;
    labels: string[];
    description: string;
    image?: string;
    alt?: string;
    slug: string;
};

export type Target = FileName | Slug;

export type FileName = {
    type: 'file';
    fileName: string;
};

export type Slug = {
    type: 'slug';
    slug: string;
};
