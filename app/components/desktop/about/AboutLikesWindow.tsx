export default function AboutLikesWindow() {
  return (
    <div className="h-full px-5 py-4 text-[#2f2f35]">
      <div className="font-ui text-[12px] leading-[1.35]">
        <p className="font-semibold">favorite tools</p>
        <p>Figma, Canva, VS Code, React, Clip Studio Paint</p>
      </div>
      <div className="font-ui mt-4 text-[12px] leading-[1.35]">
        <p className="font-semibold">things i make</p>
        <p>UI/UX design</p>
        <p>graphic design</p>
        <p>branding</p>
        <p>front-end projects</p>
      </div>
      <p className="mt-10 text-[16px] italic leading-tight text-[#222]">
        Whatever floats my boat, really.
      </p>
    </div>
  );
}
