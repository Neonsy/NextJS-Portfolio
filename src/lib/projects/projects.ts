import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import { targetDirectory } from './project';

import type { PostMetadata } from './project';

export async function getAllProjects(): Promise<PostMetadata[]> {
    const files = fs.readdirSync(targetDirectory);

    const posts = files.map((file) => getPostMetadata(file)).sort((a, b) => b.id - a.id);

    return posts;
}

function getPostMetadata(file: string): PostMetadata {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(targetDirectory, file);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const { data } = matter(fileContent);

    const metadata: PostMetadata = {
        id: data.id,
        title: data.title,
        labels: data.labels,
        description: data.description,
        image: data.image,
        alt: data.alt,
        slug,
    };

    return metadata;
}
