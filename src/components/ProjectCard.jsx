function ProjectCard({ project }) {
  return (
    <div className="p-4 border border-border-dim bg-bg-surface">
      <p className="font-mono text-text-secondary">[ProjectCard: {project?.name}]</p>
    </div>
  )
}

export default ProjectCard
