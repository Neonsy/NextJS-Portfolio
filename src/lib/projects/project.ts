import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export const targetDirectory = path.join(process.cwd(), 'content', 'projects');

export type Post = {
    metadata: PostMetadata;
    content: string;
};

export type PostMetadata = {
    id: number;
    title: string;
    labels: string[];
    description: string;
    image?: string;
    alt?: string;
    slug: string;
};

export async function getProjectBySlug(slug: string): Promise<Post | null> {
    try {
        const filePath = path.join(targetDirectory, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        const { content, data } = matter(fileContent);

        if (!data.id || !data.title || !data.labels || !data.description) {
            const error = new Error('Missing required metadata');

            console.error(`Missing required metadata for ${filePath}`);

            error.name = 'MissingMetadataError';
            throw error;
        }

        const metadata: PostMetadata = {
            id: data.id,
            title: data.title,
            labels: data.labels,
            description: data.description,
            image: data.image,
            alt: data.alt,
            slug,
        };

        return { metadata, content };
    } catch (error) {
        if (error instanceof Error && error.name === 'MissingMetadataError') {
            throw error;
        }
        return null;
    }
}
