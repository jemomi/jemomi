<template>
  <article class="bg-white dark:bg-zinc-950">
    <section class="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/70">
      <div class="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div class="max-w-4xl space-y-6">
          <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-400">
            Tjenester
          </p>
          <h1 class="text-4xl font-bold leading-tight text-zinc-950 dark:text-white md:text-5xl">
            Praktisk hjælp til annoncering, tracking og tekniske webløsninger
          </h1>
          <p class="max-w-3xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Jeg hjælper med konkrete digitale opgaver, hvor marketing, data og webudvikling mødes. Fokus er på tydelige forbedringer, brugbar sporing og løsninger, der kan bruges i praksis.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <NuxtLink
              to="mailto:dkjemomi@gmail.com?subject=Foresp%C3%B8rgsel%20om%20digital%20hj%C3%A6lp"
              class="inline-flex items-center justify-center rounded-md bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Skriv til dkjemomi@gmail.com
            </NuxtLink>
            <NuxtLink
              to="#tjenester"
              class="inline-flex items-center justify-center rounded-md border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950 dark:border-zinc-700 dark:text-white dark:hover:border-white"
            >
              Se tjenester
            </NuxtLink>
          </div>
        </div>

        <aside class="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 class="text-lg font-semibold text-zinc-950 dark:text-white">
            Nem kontakt
          </h2>
          <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
            Send en kort besked med hvad du har brug for hjælp til, hvilken løsning det handler om, og om der er noget, der haster.
          </p>
          <NuxtLink
            to="mailto:dkjemomi@gmail.com?subject=Foresp%C3%B8rgsel%20om%20digital%20hj%C3%A6lp"
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
            Det kan jeg hjælpe med
          </h2>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Her er typiske opgaver, jeg kan tage fat på. Hvis din opgave ligger mellem flere af områderne, er det helt normalt.
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="service in services"
            :key="service.title"
            class="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 class="text-lg font-semibold text-zinc-950 dark:text-white">
              {{ service.title }}
            </h3>
            <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
              {{ service.text }}
            </p>
            <NuxtLink
              :to="`mailto:dkjemomi@gmail.com?subject=${service.mailSubject}`"
              class="mt-5 inline-flex text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
            >
              Kontakt om denne opgave
            </NuxtLink>
          </article>
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
              to="mailto:dkjemomi@gmail.com?subject=Foresp%C3%B8rgsel%20om%20digital%20hj%C3%A6lp"
              class="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Skriv til dkjemomi@gmail.com
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
useHead({
  title: 'Tjenester - Jens Morten Mikkelsen',
  meta: [
    {
      name: 'description',
      content: 'Tjenester inden for Google Ads, Google Analytics, sporing, konverteringsgennemgang, teknisk webhjælp, automatisering og digital sparring.',
    },
  ],
})

const services = [
  {
    title: 'Google Ads - gennemgang og optimering',
    text: 'Gennemgang af eksisterende kampagner, søgetermer, budget, målretning, annoncer og landingssider. Fokus er at få mere ud af det annoncebudget, der allerede bliver brugt.',
    mailSubject: 'Google%20Ads%20-%20gennemgang%20og%20optimering',
  },
  {
    title: 'Google Ads - opsætning fra bunden',
    text: 'Opsætning af nye kampagner, konverteringsmål, søgeord, annoncer og grundlæggende struktur for virksomheder, der ikke allerede annoncerer.',
    mailSubject: 'Google%20Ads%20-%20ops%C3%A6tning%20fra%20bunden',
  },
  {
    title: 'Google Analytics og sporing',
    text: 'Opsætning eller gennemgang af GA4, Google Tag Manager og konverteringssporing, så du kan se, hvad hjemmeside og annoncer skaber af værdi.',
    mailSubject: 'Google%20Analytics%20og%20sporing',
  },
  {
    title: 'Tracking-fejlfinding',
    text: 'Gennemgang af opsætningen, når køb, formularer, klik eller andre vigtige handlinger ikke bliver registreret korrekt.',
    mailSubject: 'Tracking-fejlfinding',
  },
  {
    title: 'Hjemmeside- og konverteringsgennemgang',
    text: 'En praktisk gennemgang af hvor annoncerne sender folk hen, om næste handling er tydelig, og om tekniske eller indholdsmæssige ting gør det sværere at få henvendelser eller salg.',
    mailSubject: 'Hjemmeside-%20og%20konverteringsgennemgang',
  },
  {
    title: 'Teknisk webhjælp og mindre ændringer',
    text: 'Små rettelser, nye landingssider, formularer, integrationer, sporingsscripts, DNS, domæneopsætning og andre opgaver mellem marketing og webudvikling.',
    mailSubject: 'Teknisk%20webhj%C3%A6lp%20og%20mindre%20%C3%A6ndringer',
  },
  {
    title: 'Automatisering og simple interne værktøjer',
    text: 'Små specialløsninger, der sparer manuelt arbejde. Det kan være uploadportaler, formularflows, automatiske mails, dataopsamling eller simple webværktøjer.',
    mailSubject: 'Automatisering%20og%20simple%20interne%20v%C3%A6rkt%C3%B8jer',
  },
  {
    title: 'Digital gennemgang og ekstra vurdering',
    text: 'En samlet gennemgang af Google Ads, Analytics og hjemmeside med en kort prioriteret liste over hvad der fungerer, hvad der bør ændres, og hvad der ikke er værd at bruge tid på.',
    mailSubject: 'Digital%20gennemgang%20og%20ekstra%20vurdering',
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
    title: 'Afklaring',
    text: 'Vi finder ud af hvad der skal undersøges, ændres eller sættes op først.',
  },
  {
    label: '03',
    title: 'Næste skridt',
    text: 'Du får en konkret vurdering af den mest relevante vej videre.',
  },
]
</script>
