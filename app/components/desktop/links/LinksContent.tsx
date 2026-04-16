import Image from "next/image";

type SocialLink = {
  id: string;
  label: string;
  href: string;
  iconSrc: string;
  iconClassName: string;
};

const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/cess.yla.f/",
    iconSrc: "/icons/facebook-icon.svg",
    iconClassName: "h-[72px] w-[72px] sm:h-[98px] sm:w-[98px]",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/princess-b-ba2a20362/",
    iconSrc: "/icons/linked-in.svg",
    iconClassName: "h-[78px] w-[78px] sm:h-[108px] sm:w-[108px]",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/opencessmi/p/DDcZKV4Tn1y/",
    iconSrc: "/icons/instagram.svg",
    iconClassName: "h-[74px] w-[74px] sm:h-[102px] sm:w-[102px]",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/cessmi",
    iconSrc: "/icons/github.svg",
    iconClassName: "h-[82px] w-[82px] sm:h-[114px] sm:w-[114px]",
  },
] as const;

export default function LinksContent() {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white px-5 py-6 sm:px-8 sm:py-10">
      <p className="font-serif text-center text-[clamp(2.6rem,6vw,3.4rem)] leading-none text-[#e68cc3]">
        My socials!
      </p>

      <div className="mx-auto mt-10 grid w-full max-w-[860px] grid-cols-2 gap-5 sm:mt-14 sm:grid-cols-4 sm:gap-10">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-hand flex flex-col items-center gap-2 text-center text-[15px] leading-none text-black transition hover:-translate-y-1 sm:text-[18px]"
          >
            <span className="grid h-[92px] w-[92px] place-items-center sm:h-[124px] sm:w-[124px]">
              <Image
                src={link.iconSrc}
                alt=""
                aria-hidden="true"
                width={124}
                height={124}
                className={`${link.iconClassName} object-contain`}
              />
            </span>
            <span className="text-[18px] sm:text-[22px]">{link.label}</span>
          </a>
        ))}
      </div>

      <div className="mt-12 pb-6 sm:mt-16 sm:pb-8">
        <p className="font-hand pt-10 text-center text-[clamp(1.35rem,3.6vw,3.1rem)] leading-tight text-[#1576b7] sm:pt-16">
          I also have another{" "}
          <a
            href="https://princess-mikaela-borbajo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e68cc3] underline underline-offset-4"
          >
            website
          </a>{" "}
          if you&apos;re interested!
        </p>
      </div>
    </div>
  );
}
