<template>
  <article class="container mx-auto">
    <h1>
      Hello 👋
      <span>My name is</span> <!-- switching translation, jeg hedder, je suis, ich bin others... -->
      Jens Morten Mikkelsen
    </h1>
<!--    <p>
      This is you.
      &lt;!&ndash; fun place to show available information about the visitor 😈&ndash;&gt;
    </p>-->
    <section>
      <h2>
        Music! 🎶
      </h2>
      <p>
        I love music, and it has always been a huge part of my life!
      </p>
    </section>
    <section>
      <h2>
        Code! 💾
      </h2>
      <p>
        GitHub!
      </p>
    </section>
  </article>
</template>

<script setup lang="ts">
  const lil = useFetch('/api/spotify/me')
</script>

<style scoped>

</style>