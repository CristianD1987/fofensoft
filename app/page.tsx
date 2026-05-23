import {
  Code2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Modern, performant web apps built with Next.js, React, and TypeScript. From landing pages to complex SaaS platforms.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Native iOS and Android applications, as well as cross-platform solutions. We publish and maintain apps on the App Store and Google Play.",
  },
  {
    icon: Code2,
    title: "Product Engineering",
    description:
      "End-to-end product development: architecture, design, implementation, and ongoing support for digital products at any stage.",
  },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-lg font-bold tracking-tight text-transparent"
          >
            FOFENSOFT
          </a>
          <nav className="hidden gap-8 text-sm text-slate-400 sm:flex">
            <a href="#about" className="transition-colors hover:text-white">
              About
            </a>
            <a href="#services" className="transition-colors hover:text-white">
              Services
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-slate-950 to-slate-950"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/5 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="animate-fade-in-up mb-4 text-sm font-medium tracking-widest text-slate-400 uppercase">
              Romanian software studio
            </p>
            <h1 className="animate-fade-in-up animation-delay-150 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl">
              FOFENSOFT
            </h1>
            <p className="animate-fade-in-up animation-delay-300 mt-6 text-xl text-slate-100 sm:text-2xl">
              Building modern web and mobile applications
            </p>
            <p className="animate-fade-in-up animation-delay-450 mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
              Romanian software studio crafting digital products
            </p>
            <a
              href="#contact"
              className="animate-fade-in-up animation-delay-450 mt-10 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/30"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-slate-800 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              About us
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-400">
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
          className="border-t border-slate-800 bg-black/40 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
              End-to-end capabilities for web, mobile, and product engineering.
            </p>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group rounded-2xl border border-slate-800 bg-slate-950/50 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 p-3 text-blue-400 transition-colors group-hover:from-blue-500/30 group-hover:to-violet-500/30">
                    <service.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-slate-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get in touch
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Have a project in mind? We&apos;d love to hear about it.
            </p>

            <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/30 p-8 text-left sm:p-10">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <a
                      href="mailto:contact@fofensoft.com"
                      className="mt-1 block text-slate-100 transition-colors hover:text-blue-400"
                    >
                      contact@fofensoft.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Phone</p>
                    <a
                      href="tel:+40756431273"
                      className="mt-1 block text-slate-100 transition-colors hover:text-blue-400"
                    >
                      +40 756 431 273
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Address
                    </p>
                    <p className="mt-1 leading-relaxed text-slate-100">
                      Sos. Bucuresti Nord Nr. 10B, Tronson Corp A2, Sc. B, Et.
                      7, Ap. 204, Voluntari, Ilfov, Romania
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm text-slate-400">
            © 2026 FOFENSOFT S.R.L. All rights reserved.
          </p>
          <div className="text-right text-sm text-slate-500">
            <p className="font-medium text-slate-400">FOFENSOFT S.R.L.</p>
            <p className="mt-1">CUI: [PLACEHOLDER_CUI]</p>
            <p>Reg. Com.: [PLACEHOLDER_J]</p>
            <p className="mt-1 max-w-xs sm:ml-auto">
              Sos. Bucuresti Nord Nr. 10B, Voluntari, Ilfov, Romania
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
