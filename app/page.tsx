const services = [
  {
    number: "01",
    title: "Web Applications",
    description:
      "Modern, performant web apps built with Next.js, React, and TypeScript. From landing pages to complex SaaS platforms.",
  },
  {
    number: "02",
    title: "Mobile Applications",
    description:
      "Native iOS and Android applications, as well as cross-platform solutions. We publish and maintain apps on the App Store and Google Play.",
  },
  {
    number: "03",
    title: "Product Engineering",
    description:
      "End-to-end product development: architecture, design, implementation, and ongoing support for digital products at any stage.",
  },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-cream-border bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <a
            href="#hero"
            className="font-serif text-lg tracking-tight text-ink transition-colors hover:text-accent-warm"
          >
            FOFENSOFT
          </a>
          <nav className="hidden gap-10 text-sm text-ink-secondary sm:flex">
            <a
              href="#about"
              className="transition-colors hover:text-ink"
            >
              About
            </a>
            <a
              href="#services"
              className="transition-colors hover:text-ink"
            >
              Services
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-ink"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="flex min-h-[90vh] flex-col items-center justify-center px-6 pt-28 pb-32 lg:px-8 lg:py-40"
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="animate-fade-in-up eyebrow">
              Est. 2022 — Bucharest, Romania
            </p>
            <h1 className="animate-fade-in-up animation-delay-150 font-serif mt-8 text-[clamp(3.5rem,12vw,8rem)] leading-[0.95] tracking-tight text-ink">
              FOFENSOFT
            </h1>
            <p className="animate-fade-in-up animation-delay-300 font-serif mt-8 text-2xl italic text-ink sm:text-3xl lg:text-4xl">
              Building modern web and mobile applications
            </p>
            <p className="animate-fade-in-up animation-delay-450 mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-secondary sm:text-lg">
              A Romanian software studio crafting digital products with care.
            </p>
            <a
              href="#contact"
              className="animate-fade-in-up animation-delay-450 mt-12 inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-accent-warm"
            >
              Get in touch
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-cream-border px-6 py-32 lg:px-8 lg:py-40"
        >
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">About</p>
            <h2 className="font-serif mt-4 max-w-2xl text-4xl leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Software, thoughtfully made.
            </h2>
            <div className="mt-16 grid gap-12 text-lg leading-relaxed text-ink-secondary md:grid-cols-2 md:gap-16 lg:gap-24">
              <p>
                FOFENSOFT S.R.L. is a Romanian software development company
                specializing in the design and development of modern web and
                mobile applications. We help startups and established businesses
                bring their digital products to life with clean code, thoughtful
                design, and a focus on great user experience.
              </p>
              <p>
                From early-stage prototypes to production-ready apps published
                on the App Store and Google Play, we work end-to-end across the
                full product lifecycle — strategy, design, engineering, and
                deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="border-t border-cream-border px-6 py-32 lg:px-8 lg:py-40"
        >
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">What we do</p>
            <h2 className="font-serif mt-4 text-4xl tracking-tight text-ink sm:text-5xl">
              Services
            </h2>

            <div className="mt-20 grid gap-6 lg:grid-cols-3 lg:gap-8">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="group flex flex-col border border-cream-border bg-cream p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:border-accent-warm/40 lg:p-10"
                >
                  <span className="font-serif text-5xl leading-none text-ink-muted transition-colors group-hover:text-accent-warm">
                    {service.number}
                  </span>
                  <h3 className="mt-8 font-serif text-2xl text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-secondary">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-cream-border px-6 py-32 lg:px-8 lg:py-40"
        >
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">Get in touch</p>
            <h2 className="font-serif mt-4 text-4xl tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Let&apos;s build something.
            </h2>
            <p className="mt-6 text-lg text-ink-secondary">
              Have a project in mind? We&apos;d love to hear about it.
            </p>

            <div className="mt-16 border border-cream-border bg-cream-dark">
              <div className="border-b border-cream-border px-8 py-7 lg:px-10 lg:py-8">
                <p className="eyebrow text-[0.625rem]">Email</p>
                <a
                  href="mailto:contact@fofensoft.com"
                  className="mt-2 inline-block text-lg text-ink transition-colors hover:text-accent-warm hover:underline hover:underline-offset-4"
                >
                  contact@fofensoft.com
                </a>
              </div>
              <div className="border-b border-cream-border px-8 py-7 lg:px-10 lg:py-8">
                <p className="eyebrow text-[0.625rem]">Phone</p>
                <a
                  href="tel:+40756431273"
                  className="mt-2 inline-block text-lg text-ink transition-colors hover:text-accent-warm hover:underline hover:underline-offset-4"
                >
                  +40 756 431 273
                </a>
              </div>
              <div className="px-8 py-7 lg:px-10 lg:py-8">
                <p className="eyebrow text-[0.625rem]">Address</p>
                <p className="mt-2 text-lg leading-relaxed text-ink-secondary">
                  Sos. Bucuresti Nord Nr. 10B, Tronson Corp A2, Sc. B, Et. 7,
                  Ap. 204, Voluntari, Ilfov, Romania
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cream-border bg-cream-dark px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FOFENSOFT S.R.L.</p>
          <p className="sm:text-right">
            CUI RO47274231 · J23/8314/2022 · Sos. Bucuresti Nord Nr. 10B,
            Voluntari, Ilfov, Romania
          </p>
        </div>
      </footer>
    </>
  );
}
