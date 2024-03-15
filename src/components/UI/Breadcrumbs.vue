<template>
    <div class="breadcrumbs">
      <a class="breadcrumbs-item" href="">Главная</a>
      <div class="breadcrumbs-divider">/</div>
      <a class="breadcrumbs-item" href="">Категории</a>
      <div class="breadcrumbs-divider">/</div>
      <a class="breadcrumbs-item" href="">Нижнее белье</a>
      <div class="breadcrumbs-divider">/</div>
      <a class="breadcrumbs-item" href="">Бюстгальтеры</a>
    </div>
</template>
<script>
export default {
  props: {
  },

  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.split('/').filter(segment => segment !== '');
      const crumbs = []

      return params
    },
  },
}
</script>
<style lang="scss">
  .breadcrumbs
  {
    margin-bottom: 2.4rem;
    display: flex;
    column-gap: .8rem;
    color:#827F7D;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.128px;
    &-item
    {
      text-decoration: none;
      color: inherit;
      &.active
      {
        font-weight: bold;
      }
    }
  }
  @media (max-width: 960px) {
    .breadcrumbs
    {
      margin-bottom: 24px;
      column-gap: 8px;
      font-size: 16px;
      letter-spacing: -0.128px;
    }
  }
</style>
