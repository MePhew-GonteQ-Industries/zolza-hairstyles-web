<template>
  <section class="app-page error-page insufficient-permissions">
    <h3>Niewystarczające uprawnienia</h3>
    <i class="ph-file-lock-light"></i>
    <h5>Nie posiadasz dostępu do tej strony</h5>
    <LinkButton to="/">Powrót na stronę główną</LinkButton>
  </section>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue';

export default {
  name: 'InsufficientPermissionPage',
  components: {
    LinkButton,
  },
};
</script>

<style lang="scss" scoped>
.insufficient-permissions {
  h3 {
    font-size: 4rem;
  }

  h5 {
    font-size: 2rem;
  }

  i {
    font-size: 25rem;
  }
}
</style>
