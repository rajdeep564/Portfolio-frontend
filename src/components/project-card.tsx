import { TechLogos } from "@/components/tech-logos";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  context: string;
  description: string;
  tags?: readonly string[];
  logos?: readonly string[];
  links: readonly { label: string; href: string }[];
}

export function ProjectCard({ title, context, description, tags, logos, links }: Props) {
  return (
    <div className="flex flex-col h-full gap-3 border border-border rounded-xl p-6 transition-colors hover:border-primary/50">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold leading-snug">{title}</h3>
        <p className="text-xs font-medium text-primary">{context}</p>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">
        {description}
      </p>
      {logos && <TechLogos names={logos} size="sm" />}
      {tags && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="text-[11px] font-medium border border-border h-6 w-fit px-2"
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {links.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {link.label}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
