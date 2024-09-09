import { getProjectBySlug } from '@/lib/projects';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Project({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { metadata, content } = project;
    const { title, labels, image, alt } = metadata;

    return (
        <>
            <div className="mb-8">
                <h1 className="text-5xl">{title}</h1>
                <p>{labels}</p>
            </div>
            {image && <Image src={image} alt={alt || ''} />}
            <main className="prose prose-lg dark:prose-invert">
                <MDXRemote source={content} />
            </main>
        </>
    );
}
