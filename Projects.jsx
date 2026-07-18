import { useState } from 'react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import CaseStudy from './CaseStudy';
import projects from '../data/projects';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section
        id="projects"
        className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
        aria-label="Projects section"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Selected Work</SectionHeading>

          <p className="font-body text-lg text-pure-white/40 mt-8 max-w-2xl leading-relaxed">
            A curated selection of projects that showcase my expertise in building
            scalable, performant, and beautifully crafted digital experiences.
          </p>

          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudy
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
