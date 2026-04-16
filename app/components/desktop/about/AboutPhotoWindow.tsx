import Image from "next/image";

export default function AboutPhotoWindow() {
  return (
    <div className="relative h-full overflow-hidden bg-white">
      <Image
        src="/picture-of-me.jpg"
        alt="Portrait of Princess"
        fill
        sizes="(max-width: 1024px) 100vw, 35vw"
        className="object-cover"
        style={{ objectPosition: "center center" }}
      />
    </div>
  );
}
