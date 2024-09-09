import fs from 'fs';

import { getProject, targetDirectory } from './project';

import type { ProjectMetadata, FileName } from './types';

export async function getAllProjects(): Promise<ProjectMetadata[]> {
    const files = fs.readdirSync(targetDirectory);

    const Projects = await Promise.all(
        files.map(async (file) => {
            const target: FileName = {
                type: 'file',
                fileName: file,
            };

            const Project = await getProject(target);

            if (Project) {
                return Project.metadata;
            } else {
                throw new Error('Project not found');
            }
        })
    ).then((projects) => projects.filter(Boolean).sort((a, b) => b.id - a.id));

    return Projects;
}
