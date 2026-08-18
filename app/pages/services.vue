<template>
  <article class="bg-white dark:bg-zinc-950">
    <section class="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/70">
      <div class="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div class="max-w-4xl space-y-6">
          <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-400">
            Tjenester
          </p>
          <h1 class="text-4xl font-bold leading-tight text-zinc-950 dark:text-white md:text-5xl">
            Få mere ud af dine annoncer, din tracking og din hjemmeside
          </h1>
          <p class="max-w-3xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Jeg hjælper med konkrete digitale opgaver, hvor marketing, data og webudvikling hænger sammen. Fokus er på at finde det, der faktisk bremser henvendelser, salg eller overblik.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <NuxtLink
              :to="contactHref('Gratis forundersøgelse')"
              class="inline-flex items-center justify-center rounded-md bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Spørg om gratis forundersøgelse
            </NuxtLink>
            <NuxtLink
              to="#tjenester"
              class="inline-flex items-center justify-center rounded-md border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950 dark:border-zinc-700 dark:text-white dark:hover:border-white"
            >
              Se områder
            </NuxtLink>
          </div>
        </div>

        <aside class="rounded-lg border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-900/70 dark:bg-zinc-950">
          <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-400">
            Gratis forundersøgelse
          </p>
          <h2 class="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">
            Start med et hurtigt tjek
          </h2>
          <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
            Særligt relevant hvis du allerede bruger penge på Google Ads, men er i tvivl om kampagner, tracking eller landingssider arbejder godt nok sammen.
          </p>
          <NuxtLink
            :to="contactHref('Gratis forundersøgelse')"
            class="mt-5 inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Kontakt mig
          </NuxtLink>
        </aside>
      </div>
    </section>

    <section
      id="tjenester"
      class="py-16"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-4">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Områder jeg kan hjælpe med
          </h2>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Opgaverne er delt op efter område, så det er nemt at finde det relevante. Mange opgaver ligger naturligt på tværs, for eksempel når annoncer, tracking og landingssider skal fungere bedre sammen.
          </p>
        </div>

        <div class="mt-10 space-y-12">
          <section
            v-for="section in serviceSections"
            :id="section.id"
            :key="section.title"
            class="scroll-mt-28"
          >
            <div class="grid gap-6 lg:grid-cols-[18rem_1fr] lg:items-start">
              <div class="space-y-3">
                <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-400">
                  {{ section.label }}
                </p>
                <h3 class="text-2xl font-bold text-zinc-950 dark:text-white">
                  {{ section.title }}
                </h3>
                <p class="leading-7 text-zinc-600 dark:text-zinc-400">
                  {{ section.text }}
                </p>
              </div>

              <div class="grid auto-rows-auto gap-4 md:grid-cols-2">
                <ServicesServiceCard
                  v-for="service in section.services"
                  :key="service.title"
                  :contact-email="contactEmail"
                  :service
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <section class="bg-zinc-50 py-16 dark:bg-zinc-900/70">
      <div class="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.75fr_1fr] lg:items-start">
        <div class="max-w-2xl space-y-4">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Sådan starter vi
          </h2>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            En god start er en kort afklaring af problemet, målet og de systemer, der allerede er i spil.
          </p>
        </div>
        <ol class="grid gap-4 sm:grid-cols-3">
          <li
            v-for="step in steps"
            :key="step.title"
            class="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <p class="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {{ step.label }}
            </p>
            <h3 class="mt-2 text-base font-semibold text-zinc-950 dark:text-white">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {{ step.text }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-zinc-950 py-16 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-5">
          <h2 class="text-3xl font-bold">
            Skal vi se på din opgave?
          </h2>
          <p class="text-lg leading-8 text-zinc-300">
            Skriv kort hvad du gerne vil have hjælp til. Så kan vi hurtigt finde ud af, om jeg er den rette til opgaven.
          </p>
          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <NuxtLink
              :to="contactHref()"
              class="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Skriv til {{ contactEmail }}
            </NuxtLink>
            <NuxtLink
              to="https://www.linkedin.com/in/jens-morten-mikkelsen-27893761/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white hover:text-white"
            >
              <Icon
                name="simple-icons:linkedin"
                class="size-4"
              />
              LinkedIn
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { ServiceSection } from '~/types/services'

useHead({
  title: 'Tjenester - Jens Morten Mikkelsen',
  meta: [
    {
      name: 'description',
      content: 'Tjenester inden for Google Ads, Google Analytics, tracking, hjemmeside, webshop, CMS, Umbraco, SEO, automatisering og digital sparring.',
    },
  ],
})

const contactEmail = 'dkjemomi@gmail.com'

const contactHref = (subject = 'Forespørgsel om digital hjælp') => `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`

const serviceSections: ServiceSection[] = [
  {
    id: 'google',
    label: 'Google',
    title: 'Google Ads, Analytics og tracking',
    text: 'Hjælp til at få bedre overblik over annoncebudget, konverteringer og den værdi, din hjemmeside skaber.',
    services: [
      {
        title: 'Google Ads - gratis forundersøgelse',
        text: 'En kort indledende gennemgang af konto, kampagnestruktur, tracking og landingssider, så du får en konkret vurdering af de mest oplagte forbedringer. (kræver adgang til google-ads konto)',
        badge: 'Gratis forundersøgelse',
        contactSubject: 'Google Ads - gratis forundersøgelse',
        contactText: 'Spørg om gratis forundersøgelse',
      },
      {
        title: 'Google Ads - gennemgang og optimering',
        text: 'Gennemgang af eksisterende kampagner, søgetermer, budget, målretning, annoncer og landingssider med fokus på at få mere ud af det annoncebudget, der allerede bliver brugt.',
      },
      {
        title: 'Google Ads - opsætning fra bunden',
        text: 'Opsætning af nye kampagner, konverteringsmål, søgeord, annoncer og grundlæggende struktur for virksomheder, der ikke allerede annoncerer.',
      },
      {
        title: 'Google Analytics og konverteringstracking',
        text: 'Opsætning eller gennemgang af GA4, Google Tag Manager og konverteringstracking, så du kan se, hvilke henvendelser, køb eller handlinger hjemmesiden skaber.',
      },
      {
        title: 'Tracking-fejlfinding',
        text: 'Gennemgang af opsætningen, når køb, formularer, klik, opkald eller andre vigtige handlinger ikke bliver registreret korrekt.',
      },
      {
        title: 'Samtykke og annoncetracking',
        text: 'Teknisk gennemgang af om cookie-banner, samtykke, tags og konverteringer spiller rigtigt sammen, så målingen bliver så brugbar som muligt.',
      },
    ],
  },
  {
    id: 'website',
    label: 'Hjemmeside',
    title: 'Hjemmeside, webshop og landingssider',
    text: 'Praktiske forbedringer af sider, flows og tekniske detaljer, der påvirker henvendelser, salg og daglig drift.',
    services: [
      {
        title: 'Hjemmeside - gratis forundersøgelse',
        text: 'En kort indledende gennemgang af hjemmeside, hastigheds-tjek, accessibility, næste handling, tekniske problemer og de mest oplagte forbedringer for flere henvendelser eller salg.',
        badge: 'Gratis forundersøgelse',
        contactSubject: 'Hjemmeside - gratis forundersøgelse',
        contactText: 'Spørg om gratis hjemmeside-tjek',
      },
      {
        title: 'Hjemmeside- og konverteringsgennemgang',
        text: 'En praktisk gennemgang af hvor trafikken lander, om næste handling er tydelig, og om tekniske eller indholdsmæssige ting gør det sværere at få henvendelser eller salg.',
      },
      {
        title: 'Landingssider til kampagner',
        text: 'Opsætning eller forbedring af landingssider, der passer til annoncer, målgrupper og den handling, brugeren helst skal tage.',
      },
      {
        title: 'Webshop – gratis checkout-tjek',
        text: 'Jeg gennemfører kort købsflowet som kunde og peger på de mest oplagte steder, hvor friktion eller tekniske problemer kan stå i vejen for et køb.',
        badge: 'Gratis forundersøgelse',
        contactSubject: 'Webshop – gratis checkout-tjek',
        contactText: 'Spørg om gratis checkout-tjek',
      },
      {
        title: 'Webshop- og checkoutgennemgang',
        text: 'Gennemgang af produktsider, kurv, checkout, formularer og vigtige målepunkter, så det bliver lettere at finde friktion og tabte salg.',
      },
      {
        title: 'Teknisk webhjælp og mindre ændringer',
        text: 'Små rettelser, formularer, integrationer, tracking-scripts, DNS, domæneopsætning og andre opgaver mellem marketing og webudvikling.',
      },
    ],
  },
  {
    id: 'cms',
    label: 'CMS',
    title: 'CMS, Umbraco og indholdsstruktur',
    text: 'Hjælp til at gøre indhold nemmere at oprette, vedligeholde og bruge aktivt på tværs af hjemmesider og landingssider.',
    services: [
      {
        title: 'Umbraco-hjælp',
        text: 'Jeg har særlig erfaring med Umbraco og kan hjælpe med struktur, komponenter, skabeloner, redaktøroplevelse og mindre tekniske forbedringer.',
      },
      {
        title: 'CMS og redaktørvenlige sider',
        text: 'Hjælp til CMS-løsninger generelt, hvor indholdstyper, felter og sider skal give mening for dem, der arbejder med indholdet til daglig.',
      },
      {
        title: 'Indholdsstruktur og komponenter',
        text: 'Gennemgang eller opsætning af fleksible sidetyper, moduler og komponenter, så nye sider kan bygges uden unødigt manuelt arbejde.',
      },
      {
        title: 'CMS-fejlfinding og oprydning',
        text: 'Hjælp til små fejl, uhensigtsmæssige arbejdsgange, teknisk gæld eller sider, der er blevet svære at vedligeholde over tid.',
      },
    ],
  },
  {
    id: 'seo',
    label: 'SEO',
    title: 'Struktur, indhold og teknisk synlighed',
    text: 'Hjælp til de tekniske og strukturelle dele af SEO, hvor udvikling, indhold og brugeroplevelse mødes.',
    services: [
      {
        title: 'SEO - gratis gennemgang',
        text: 'En kort indledende gennemgang af teknisk SEO, sidearkitektur, metadata, indeksering og de mest oplagte forbedringer, så du får et konkret sted at starte.',
        badge: 'Gratis gennemgang',
        contactSubject: 'SEO - gratis gennemgang',
        contactText: 'Spørg om gratis SEO-gennemgang',
      },
      {
        title: 'Strukturerede data',
        text: 'Opsætning eller gennemgang af relevante strukturerede data, så søgemaskiner bedre kan forstå indhold, produkter, brødkrummer, artikler eller ofte stillede spørgsmål.',
      },
      {
        title: 'Sidearkitektur og interne links',
        text: 'Gennemgang af navigation, landingssider, URL-struktur og interne links, så vigtige sider bliver nemmere at finde og forstå.',
      },
      {
        title: 'Teknisk SEO-gennemgang',
        text: 'Praktisk gennemgang af indeksering, metadata, redirects, hastighed, mobilvisning og tekniske forhold, der kan påvirke synligheden.',
      },
      {
        title: 'Indholds- og landingssideprioritering',
        text: 'En prioriteret vurdering af hvilke sider der bør forbedres, samles, udvides eller oprettes først.',
      },
    ],
  },
  {
    id: 'automation',
    label: 'Mere',
    title: 'Automatisering, integrationer og sparring',
    text: 'Små løsninger og konkrete vurderinger, der kan spare tid eller give bedre beslutningsgrundlag.',
    services: [
      {
        title: 'Automatisering og simple interne værktøjer',
        text: 'Små specialløsninger, der sparer manuelt arbejde. Det kan være uploadportaler, formularforløb, automatiske mails, dataopsamling eller simple webværktøjer.',
      },
      {
        title: 'Integrationer og dataopsamling',
        text: 'Hjælp til at forbinde formularer, regneark, APIer, mailsystemer og andre værktøjer, så data lander det rigtige sted.',
      },
      {
        title: 'Digital gennemgang og ekstra vurdering',
        text: 'En samlet gennemgang af Google Ads, Analytics, tracking og hjemmeside med en kort prioriteret liste over hvad der fungerer, hvad der bør ændres, og hvad der ikke er værd at bruge tid på.',
      },
    ],
  },
]

const steps = [
  {
    label: '01',
    title: 'Kort besked',
    text: 'Du beskriver opgaven, målet og de vigtigste systemer eller links.',
  },
  {
    label: '02',
    title: 'Forundersøgelse',
    text: 'Når det giver mening, starter vi med et hurtigt tjek af problem, konto, tracking eller hjemmeside.',
  },
  {
    label: '03',
    title: 'Næste skridt',
    text: 'Du får en konkret vurdering af den mest relevante vej videre.',
  },
]
</script>
