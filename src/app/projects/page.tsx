import { getAllProjects } from '@/lib/projects/projects';
import Link from 'next/link';

export default async function Projects() {
    const projects = await getAllProjects();

    return (
        <>
            <h1>Projects</h1>
            {projects.map((project) => (
                <div key={project.title} className="m-12 w-1/4 border-2 border-slate-500 p-12">
                    <h2>{project.title}</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {project.labels.map((label) => (
                            <li
                                key={label}
                                className="inline-flex items-center justify-center rounded-full bg-gray-500 px-4 py-1 text-sm font-medium uppercase text-white">
                                {label}
                            </li>
                        ))}
                    </ul>
                    <p className="my-4">{project.description}</p>
                    <Link href={`/projects/${project.slug}`} className="text-blue-500 underline">
                        View Project
                    </Link>
                </div>
            ))}
        </>
    );
}
