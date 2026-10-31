import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

const { featured, sites, partner } = DATA.clientWork;
const LINK_CARD_CLASS =
  "flex flex-col gap-1 rounded-xl border border-border p-6 transition-colors hover:border-primary/50";

export default function ClientWorkSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-bold border-l-2 border-primary pl-3">
          Client Websites &amp; Growth
        </h2>
        <p className="text-muted-foreground text-pretty">
          Beyond product engineering, I design and build websites for businesses
          and help them get found.
        </p>
      </div>
      <div className="grid gap-3">
        <ProjectCard
          title={featured.name}
          context={featured.domain}
          description={featured.description}
          tags={featured.services}
          links={[{ label: "Visit site", href: featured.href }]}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {sites.map((site) => (
            <a
              key={site.href}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CARD_CLASS}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-snug">{site.name}</h3>
                <ArrowUpRight className="size-3.5 flex-none text-primary" aria-hidden />
              </div>
              <p className="text-xs font-medium text-primary">{site.domain}</p>
              <p className="pt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                {site.description}
              </p>
            </a>
          ))}
        </div>
        <a
          href={partner.href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CARD_CLASS}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-snug">{partner.name}</h3>
            <ArrowUpRight className="size-3.5 flex-none text-primary" aria-hidden />
          </div>
          <p className="text-xs font-medium text-primary">Partner</p>
          <p className="pt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
            {partner.description}
          </p>
        </a>
      </div>
    </div>
  );
}
