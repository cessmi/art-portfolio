import type { ProjectItem } from "./projectData";

type ProjectCardProps = {
  project: ProjectItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export default function ProjectCard({
  project,
  isSelected,
  onSelect,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className={`group w-full rounded-[22px] border bg-white p-4 text-left transition duration-150 ${
        isSelected
          ? "border-[#e68cc3] shadow-[0_12px_30px_rgba(230,140,195,0.18)]"
          : "border-[#cdddf0] shadow-[0_8px_22px_rgba(113,156,207,0.12)] hover:-translate-y-1 hover:border-[#84b2df]"
      }`}
    >
      <div
        className={`h-[148px] rounded-[16px] bg-gradient-to-br ${project.accent} p-4`}
      >
        <div className="flex items-start justify-between">
          <span className="font-hand rounded-full border border-[#1c5ca7]/20 bg-white/80 px-3 py-1 text-[12px] text-[#1c5ca7]">
            {project.category}
          </span>
          <span className="font-hand text-[12px] text-[#1c5ca7]">
            {project.year}
          </span>
        </div>

        <div className="mt-6">
          <p className="font-serif text-[28px] leading-none text-[#18365f]">
            {project.title}
          </p>
          <p className="font-ui mt-2 max-w-[34ch] text-sm leading-5 text-[#31547f]">
            {project.highlight}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-ui line-clamp-3 text-sm leading-6 text-[#425977]">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <span
              key={item}
              className="font-hand rounded-full border border-[#f2b8db] px-3 py-1 text-[11px] text-[#dd7fb9]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-hand text-[12px] text-[#1c5ca7]">
          {isSelected ? "Opened in preview" : "Click to preview"}
        </span>
        <span className="font-hand text-[18px] leading-none text-[#e68cc3] transition group-hover:translate-x-1">
          {isSelected ? "•" : ">"}
        </span>
      </div>
    </button>
  );
}
