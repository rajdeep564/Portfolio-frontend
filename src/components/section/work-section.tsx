import { DATA } from "@/data/resume";

export default function WorkSection() {
  return (
    <div className="grid gap-8">
      {DATA.work.map((work) => (
        <div key={work.company} className="grid gap-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-x-3">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="font-semibold leading-none">{work.company}</div>
              <div className="font-sans text-sm text-muted-foreground">
                {work.title} · {work.location}
              </div>
            </div>
            <div className="text-xs tabular-nums text-muted-foreground flex-none">
              {work.start} - {work.end}
            </div>
          </div>
          <ul className="list-disc marker:text-primary pl-4 space-y-1 text-sm text-muted-foreground text-pretty">
            {work.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
