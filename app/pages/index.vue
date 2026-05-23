<template>
  <article class="overflow-hidden">
    <section class="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div class="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[1.25fr_0.75fr] md:items-center lg:py-24">
        <div class="max-w-4xl space-y-7">
          <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-400">
            Jens Morten Mikkelsen
          </p>
          <div class="space-y-5">
            <h1 class="max-w-4xl text-4xl font-bold leading-tight text-zinc-950 dark:text-white md:text-6xl">
              Full-stack webudvikler med frontend som speciale
            </h1>
            <p class="max-w-3xl text-xl leading-8 text-zinc-700 dark:text-zinc-300">
              Jeg bygger moderne, vedligeholdelsesvenlige webløsninger med fokus på god brugeroplevelse, solid kode og praktiske løsninger, der fungerer i hverdagen.
            </p>
          </div>
          <p class="max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
            Jeg arbejder især med Nuxt, Vue, TypeScript, Tailwind, CMS-løsninger og full-stack udvikling — og jeg trives bedst, når teknik, brugervenlighed og forretning mødes i en løsning, der giver mening.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <NuxtLink
              to="#projekter"
              class="inline-flex items-center justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Se mit arbejde
            </NuxtLink>
            <NuxtLink
              to="#kontakt"
              class="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950 dark:border-zinc-700 dark:text-white dark:hover:border-white"
            >
              Kontakt mig
            </NuxtLink>
            <NuxtLink
              to="https://github.com/jemomi"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950 dark:border-zinc-700 dark:text-white dark:hover:border-white"
            >
              <Icon
                name="simple-icons:github"
                class="size-4"
              />
              Find mig på GitHub
            </NuxtLink>
          </div>
        </div>

        <aside class="rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 class="text-lg font-semibold text-zinc-950 dark:text-white">
            Fokusområder
          </h2>
          <dl class="mt-6 space-y-5">
            <div
              v-for="highlight in highlights"
              :key="highlight.title"
              class="border-l-2 border-emerald-500 pl-4"
            >
              <dt class="text-sm font-semibold text-zinc-950 dark:text-white">
                {{ highlight.title }}
              </dt>
              <dd class="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {{ highlight.text }}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="bg-zinc-50 py-16 dark:bg-zinc-900/70">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-5">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Hej, jeg hedder Jens Morten Mikkelsen
          </h2>
          <p class="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Jeg er full-stack webudvikler fra Silkeborg-området med mange års erfaring inden for moderne webudvikling.
          </p>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Min primære styrke ligger i frontendudvikling med teknologier som Nuxt, Vue, Vite, TypeScript, Tailwind, HTML, CSS og JavaScript. Samtidig har jeg en god forståelse for backend, C#, integrationer og hvordan hele løsningen hænger sammen.
          </p>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Jeg kan godt lide at blive udfordret, sparre om teknik, dele viden og finde løsninger, der både er enkle at bruge og fornuftige at vedligeholde.
          </p>
        </div>
      </div>
    </section>

    <section
      id="kompetencer"
      class="bg-white py-16 dark:bg-zinc-950"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Hvad jeg arbejder med
          </h2>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="skill in skills"
            :key="skill.title"
            class="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 class="text-lg font-semibold text-zinc-950 dark:text-white">
              {{ skill.title }}
            </h3>
            <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
              {{ skill.text }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section
      id="erfaring"
      class="bg-zinc-50 py-16 dark:bg-zinc-900/70"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-4">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Erfaring
          </h2>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Jeg har arbejdet med webudvikling på tværs af bureauer, konsulenthuse og interne udviklingsteams. Det har givet mig erfaring med både kundevendte løsninger, teknisk frontend, CMS-implementeringer, interne systemer og full-stack udvikling.
          </p>
        </div>
        <div class="mt-10 space-y-4">
          <article
            v-for="item in experience"
            :key="item.title"
            class="grid gap-3 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-[18rem_1fr]"
          >
            <h3 class="text-lg font-semibold text-zinc-950 dark:text-white">
              {{ item.title }}
            </h3>
            <p class="leading-7 text-zinc-600 dark:text-zinc-400">
              {{ item.text }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section
      id="freelance"
      class="bg-white py-16 dark:bg-zinc-950"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-4">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Tilgængelig for mindre freelanceopgaver
          </h2>
          <p class="leading-8 text-zinc-700 dark:text-zinc-300">
            Jeg tager udvalgte freelanceopgaver ind, hvor jeg kan hjælpe med konkrete udviklingsopgaver, tekniske forbedringer eller mindre webløsninger.
          </p>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Jeg foretrækker klart afgrænsede opgaver med et tydeligt mål, så samarbejdet bliver fokuseret, effektivt og realistisk ved siden af mit faste arbejde.
          </p>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="service in services"
            :key="service.title"
            class="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 class="text-lg font-semibold text-zinc-950 dark:text-white">
              {{ service.title }}
            </h3>
            <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
              {{ service.text }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section
      id="projekter"
      class="bg-zinc-50 py-16 dark:bg-zinc-900/70"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-4">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Projekter og eksperimenter
          </h2>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Jeg bruger også mine egne projekter som legeplads for nye idéer, teknologier og integrationer. Det giver mig mulighed for at teste ting af, lære nyt og bygge små løsninger, som kan udvikle sig over tid.
          </p>
        </div>
        <div class="mt-8 grid gap-4 lg:grid-cols-3">
          <article
            v-for="project in projects"
            :key="project.title"
            class="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <h3 class="text-lg font-semibold text-zinc-950 dark:text-white">
              {{ project.title }}
            </h3>
            <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
              {{ project.text }}
            </p>
            <p
              v-if="project.tech"
              class="mt-5 text-sm font-semibold text-emerald-700 dark:text-emerald-400"
            >
              {{ project.tech }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 dark:bg-zinc-950">
      <div class="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.75fr_1fr] lg:items-start">
        <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
          Lidt mere om mig
        </h2>
        <div class="space-y-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          <p>
            Udover kode interesserer jeg mig for musik, teknologi og gode samtaler om alt mellem himmel og jord. Jeg kan godt lide at fordybe mig, men jeg trives også med sparring, vidensdeling og samarbejde.
          </p>
          <p>
            Jeg er nysgerrig af natur og bliver hurtigt fanget af nye idéer, tekniske detaljer og muligheder for at gøre ting smartere eller mere enkle.
          </p>
        </div>
      </div>
    </section>

    <section
      id="kontakt"
      class="bg-zinc-950 py-16 text-white"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-5">
          <h2 class="text-3xl font-bold">
            Skal vi tage en snak?
          </h2>
          <p class="text-lg leading-8 text-zinc-300">
            Har du en mindre webopgave, en frontendudfordring eller en idé, der mangler en udvikler til at få den videre?
          </p>
          <p class="leading-8 text-zinc-400">
            Jeg hjælper gerne med konkrete, afgrænsede opgaver inden for frontend, Nuxt/Vue, CMS, integrationer, teknisk sparring og mindre full-stack løsninger.
          </p>
          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <NuxtLink
              to="https://www.linkedin.com/in/jens-morten-mikkelsen-27893761/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              <Icon
                name="simple-icons:linkedin"
                class="size-4"
              />
              Kontakt mig
            </NuxtLink>
            <NuxtLink
              to="https://github.com/jemomi"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              <Icon
                name="simple-icons:github"
                class="size-4"
              />
              GitHub
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
useHead({
  title: 'Jens Morten Mikkelsen — Full-stack webudvikler',
  meta: [
    {
      name: 'description',
      content: 'Full-stack webudvikler med speciale i Nuxt, Vue, TypeScript, Tailwind, CMS-løsninger og moderne frontendudvikling.',
    },
  ],
})

const highlights = [
  {
    title: 'Frontend først',
    text: 'Nuxt, Vue, TypeScript, Tailwind og komponentbaserede brugerflader.',
  },
  {
    title: 'Hele løsningen',
    text: 'God forståelse for backend, integrationer, data og teknisk arkitektur.',
  },
  {
    title: 'Praktisk samarbejde',
    text: 'Klare opgaver, teknisk sparring og løsninger, der kan vedligeholdes.',
  },
]

const skills = [
  {
    title: 'Moderne frontendudvikling',
    text: 'Jeg bygger moderne frontend-løsninger med Nuxt, Vue, TypeScript, Vite, Tailwind, PostCSS, HTML, CSS og JavaScript. Jeg har fokus på struktur, genbrugelige komponenter, performance og løsninger, der er rare at arbejde videre på.',
  },
  {
    title: 'CMS-baserede websites',
    text: 'Jeg har erfaring med CMS-løsninger og frontend-implementeringer, hvor indholdet skal være nemt at styre for redaktører og samtidig give en god oplevelse for brugeren.',
  },
  {
    title: 'Full-stack udvikling',
    text: 'Selvom frontend er mit primære speciale, arbejder jeg også komfortabelt med backend, C# og integrationer. Det giver mig en god forståelse for hele løsningen — fra brugerflade til data, API’er og teknisk arkitektur.',
  },
  {
    title: 'Tekniske forbedringer',
    text: 'Jeg hjælper gerne med at rydde op i eksisterende kode, forbedre struktur, optimere frontend, løse tekniske problemer og gøre løsninger lettere at vedligeholde.',
  },
  {
    title: 'Sparring og vidensdeling',
    text: 'Jeg holder af at snakke teknik, diskutere muligheder og dele erfaringer. Gode løsninger bliver ofte bedre, når man tør stille spørgsmål, udfordre antagelser og lære af hinanden.',
  },
]

const experience = [
  {
    title: 'AURA — Full-stack Developer',
    text: 'I min nuværende rolle arbejder jeg med full-stack udvikling og moderne webløsninger, hvor både frontend, backend og den samlede brugeroplevelse spiller sammen.',
  },
  {
    title: 'twoday — Frontendudvikler',
    text: 'Hos twoday arbejdede jeg med frontendudvikling og vedligeholdelsesvenlige webløsninger med fokus på moderne teknologier og god struktur.',
  },
  {
    title: 'Vertica — Frontend Engineer / Teknisk Frontender',
    text: 'Hos Vertica arbejdede jeg som teknisk frontendudvikler med moderne JavaScript, frontendarkitektur og tekniske løsninger, hvor kvalitet og struktur var centrale dele af arbejdet.',
  },
  {
    title: 'Kraftvaerk — Konsulent / Frontend developer og UI designer',
    text: 'Hos Kraftvaerk arbejdede jeg med frontendudvikling, UI og konsulentopgaver. Her fik jeg erfaring med kundedialog, tekniske løsninger og arbejdet i krydsfeltet mellem design og udvikling.',
  },
  {
    title: 'Holdt Repro A/S — Webudvikler',
    text: 'Hos Holdt Repro var jeg eneste udvikler i virksomheden og arbejdede med interne projekter samt et ERP-lignende system. Det gav mig stærk erfaring med ansvar, selvstændighed og praktiske løsninger tæt på forretningens behov.',
  },
]

const services = [
  {
    title: 'Frontendudvikling',
    text: 'Udvikling eller forbedring af Vue-, Nuxt- og TypeScript-baserede brugerflader.',
  },
  {
    title: 'Website-forbedringer',
    text: 'Optimering af performance, struktur, responsivt design, komponenter og generel vedligeholdelse.',
  },
  {
    title: 'CMS-implementering',
    text: 'Frontend til CMS-drevne websites, fleksible komponenter og redaktørvenlige løsninger.',
  },
  {
    title: 'Integrationer og automatisering',
    text: 'Forbindelse mellem API’er, systemer og data, så manuelle processer kan gøres lettere.',
  },
  {
    title: 'Teknisk sparring',
    text: 'Gennemgang af kode, frontendstruktur, arkitektur og forslag til forbedringer.',
  },
  {
    title: 'Mindre interne værktøjer',
    text: 'Udvikling af små systemer, dashboards eller værktøjer, der løser konkrete behov i hverdagen.',
  },
]

const projects = [
  {
    title: 'Personlig hjemmeside',
    text: 'Min egen hjemmeside fungerer både som portfolio, teknisk legeplads og sted til at samle mine projekter, interesser og erfaringer.',
    tech: 'Nuxt, Vue, TypeScript, Vercel',
  },
  {
    title: 'GitHub-projekter',
    text: 'På GitHub deler jeg kode, eksperimenter og projekter, hvor jeg undersøger nye teknologier, bygger små værktøjer eller tester idéer af.',
  },
  {
    title: 'Tekniske eksperimenter',
    text: 'Jeg kan godt lide at afprøve nye måder at arbejde med frontend, performance, integrationer, API’er og udvikleroplevelse. Nogle eksperimenter bliver til projekter — andre bliver bare til læring.',
  },
]
</script>
