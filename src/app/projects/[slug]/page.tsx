import { getProjectBySlug } from '@/lib/projects/project';
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
        <main className="p-16">
            <div className="mb-8">
                <h1 className="text-5xl">{title}</h1>
                <ul className="mt-4 flex flex-wrap gap-2">
                    {labels.map((label) => (
                        <li
                            key={label}
                            className="inline-flex items-center justify-center rounded-full bg-gray-500 px-4 py-1 text-sm font-medium uppercase text-white">
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
            {image && <Image src={image} alt={alt || ''} />}
            <main className="prose-md prose dark:prose-invert">
                <MDXRemote source={content} />
            </main>
        </main>
    );
}
