import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const targetDirectory = path.join(process.cwd(), 'content', 'projects');

export type Post = {
    metadata: PostMetadata;
    content: string;
};

export type PostMetadata = {
    title?: string;
    labels?: string;
    image?: string;
    alt?: string;
    slug: string;
};

export async function getProjectBySlug(slug: string): Promise<Post | null> {
    try {
        const filePath = path.join(targetDirectory, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        const { content, data } = matter(fileContent);

        return { metadata: { ...data, slug }, content };
    } catch (error) {
        return null;
    }
}
