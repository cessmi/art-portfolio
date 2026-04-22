import Image from "next/image";

const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=princessmikaela.borbajo@gmail.com";

export default function ContactContent() {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white px-6 py-7 sm:px-8 sm:py-8">
      <div className="mx-auto w-full max-w-[780px] text-center">
        <p className="font-serif text-[clamp(1.65rem,2.6vw,2.55rem)] leading-[1.22] text-[#171717]">
          &quot;among all the stars and infinite galaxies, how lucky I am to
          have met you&quot;
        </p>

        <p className="font-hand mx-auto mt-8 max-w-[680px] text-[clamp(1.05rem,1.75vw,1.55rem)] leading-[1.5] text-black">
          Admittedly, I am not that much of a social media person
          <br />
          so I really recommend contacting me through email!
        </p>

        <a
          href={gmailComposeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex min-h-[96px] items-center justify-center rounded-[22px] border-[3px] border-[#e678ba] px-6 text-center transition hover:bg-[#fff7fc] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e678ba] sm:min-h-[112px] sm:px-8"
        >
          <span className="font-serif text-[clamp(2.9rem,5vw,4.6rem)] leading-none text-[#e678ba]">
            Send an email
          </span>
        </a>
      </div>

      <div className="mt-auto flex justify-end pt-8">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/xoxo-icon.svg"
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            className="h-9 w-9 object-contain sm:h-11 sm:w-11"
          />
          <span className="font-hand text-[clamp(1.45rem,2.1vw,2rem)] leading-none text-black">
            xoxo, Cess
          </span>
        </div>
      </div>
    </div>
  );
}
