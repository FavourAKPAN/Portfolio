import Image from "next/image";

const paragraphs = [
  "I’m a Computer Engineering graduate with a growing focus on creating digital products that are both intuitive to use and reliable in practice.",
  "My work sits at the intersection of UX design and software quality assurance. On the design side, I enjoy turning ideas into clear, thoughtful experiences that put users first. On the QA side, I explore how products behave, test different scenarios, validate API responses, and identify issues that could affect functionality or the user experience.",
  "I’m particularly interested in how technology can solve everyday problems. From exploring community-focused fintech through Padijar to designing travel experiences for Nigerian travellers through Trexpal, I enjoy thinking about how digital products can make people’s lives simpler.",
  "My engineering background shapes how I approach problems: I like to understand how things work, question assumptions, pay attention to details, and keep refining until the experience makes sense.",
  "I’m always learning, experimenting with new tools, and looking for opportunities to contribute to meaningful products alongside people who care about building them well.",
];

export default function About() {
  return (
    <section id="about" className="page-x bg-soft py-24">
      <div className="about-wrap">
        <div className="about-photo">
          <figure className="polaroid m-0">
            <span className="tape" aria-hidden="true" />
            <Image
              src="/images/about_photo.jpg"
              alt="Portrait of Favour Akpan smiling, wearing glasses, a white shirt and a pink waistcoat"
              width={1100}
              height={1467}
              sizes="(max-width: 480px) 80vw, 320px"
              className="block aspect-[4/5] w-full bg-soft object-cover"
              style={{ objectPosition: "center 25%" }}
            />
            <figcaption className="mt-4 text-center font-display text-lg font-semibold">Favour Akpan</figcaption>
          </figure>
        </div>
        <div className="notebook">
          <div className="rings" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className="ring" />
            ))}
          </div>
          <h2 className="h-display m-0 mb-10 text-[clamp(2rem,6vw,4.5rem)] uppercase leading-none">A little about me</h2>
          <div className="lined">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
