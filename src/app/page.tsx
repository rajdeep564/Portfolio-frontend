/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TechLogos } from "@/components/tech-logos";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import Link from "next/link";
import ContactCubes from "@/components/contact-cubes";
import ClientWorkSection from "@/components/section/client-work-section";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, Download, MapPin } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <div className="gap-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                as="h1"
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl"
                yOffset={8}
                text={DATA.name}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-40 border rounded-2xl ring-2 ring-primary/40 ring-offset-2 ring-offset-background">
                <AvatarImage alt={`${DATA.name}, ${DATA.role}`} src={DATA.avatarUrl} />
                <AvatarFallback className="text-xl font-semibold">
                  {DATA.initials}
                </AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="gap-2">
                <a href={DATA.resumeUrl} download>
                  <Download className="size-4" aria-hidden />
                  Download resume
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact">Contact me</a>
              </Button>
              <a
                href={DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MapPin className="size-4 text-primary" aria-hidden />
                {DATA.location}
              </a>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold border-l-2 border-primary pl-3">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {DATA.summary}
            </p>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold border-l-2 border-primary pl-3">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="client-work">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <ClientWorkSection />
        </BlurFade>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold border-l-2 border-primary pl-3">Skills</h2>
          </BlurFade>
          <div className="grid gap-6">
            {DATA.skills.map((group, id) => (
              <BlurFade key={group.category} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold">{group.category}</h3>
                    <p className="text-xs italic text-muted-foreground text-pretty">
                      {group.joke}
                    </p>
                  </div>
                  <TechLogos names={group.items} />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="text-xl font-bold border-l-2 border-primary pl-3">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 12 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    <img
                      src={education.logoUrl}
                      alt={education.school}
                      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none bg-white"
                    />
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-snug flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 flex-none text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Certifications</h3>
                <div className="flex flex-wrap gap-1">
                  {DATA.certifications.map((certification) => (
                    <Badge
                      key={certification}
                      className="text-xs font-medium border border-border h-6 w-fit px-2"
                      variant="outline"
                    >
                      {certification}
                    </Badge>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="contact" className="relative isolate -mb-24 pt-20 pb-28">
        <ContactCubes />
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
