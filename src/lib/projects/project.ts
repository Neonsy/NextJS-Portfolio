import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import type { Project, ProjectMetadata, Target } from './types';

export const targetDirectory = path.join(process.cwd(), 'content', 'projects');

export async function getProject(target: Target): Promise<Project | null> {
    try {
        const slug = target.type === 'file' ? target.fileName.replace('.mdx', '') : target.slug;

        const filePath = path.join(targetDirectory, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const { content, data } = matter(fileContent);

        if (!data.id || !data.title || !data.labels || !data.description) {
            const error = new Error('Missing required metadata');

            console.error(`Missing required metadata for ${filePath}`);

            error.name = 'MissingMetadataError';
            throw error;
        }

        const metadata: ProjectMetadata = {
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
