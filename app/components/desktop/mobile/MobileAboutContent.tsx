import Image from "next/image";

export default function MobileAboutContent() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[28px] border border-[#cfe0f3] bg-white shadow-[0_12px_30px_rgba(92,130,181,0.12)]">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/picture-of-me.jpg"
            alt="Portrait of Princess"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center center" }}
          />
        </div>
      </div>

      <section className="rounded-[28px] border border-[#d7e5f5] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
        <h2 className="font-mono-ui text-[24px] leading-none tracking-[0.04em] text-[#2f2f35]">
          HI! I&apos;m <span className="font-hand text-[#e08ac0]">Princess</span>
        </h2>
        <p className="font-hand mt-2 text-[14px] text-[#4b4b4b]">
          artist, designer, and developer
        </p>
        <p className="font-hand mt-4 text-[15px] leading-[1.5] text-[#46678c]">
          I&apos;m a Computer Science student at iACADEMY Cebu who loves
          creating cute, thoughtful, and user-friendly designs. My work mostly
          focuses on UI/UX, but I also enjoy graphic design, branding, and
          visual storytelling through creative projects.
        </p>
      </section>

      <section className="rounded-[28px] border border-[#d7e5f5] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
        <h3 className="font-mono-ui text-[22px] leading-none tracking-[0.04em] text-[#2f2f35]">
          right now i&apos;m...
        </h3>
        <div className="font-hand mt-3 space-y-1 text-[14px] leading-[1.45] text-[#46678c]">
          <p>building my portfolio</p>
          <p>• applying for internships</p>
          <p>• designing UI/UX and pubmats</p>
          <p>• working on creative side projects</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#efe3ea] bg-[#fffdf9] px-5 py-5 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
        <div className="font-ui text-[12px] leading-[1.4] text-[#2f2f35]">
          <p className="font-semibold">favorite tools</p>
          <p>Figma, Canva, VS Code, React</p>
        </div>
        <div className="font-ui mt-4 text-[12px] leading-[1.4] text-[#2f2f35]">
          <p className="font-semibold">things i make</p>
          <p>UI/UX design</p>
          <p>graphic design</p>
          <p>branding</p>
          <p>front-end projects</p>
        </div>
        <p className="mt-6 text-[16px] italic leading-tight text-[#222]">
          Whatever floats my boat, really.
        </p>
      </section>
    </div>
  );
}
