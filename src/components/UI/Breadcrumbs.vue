<template>
    <div class="breadcrumbs">
      <a class="breadcrumbs-item" href="">Главная</a>
      <div class="breadcrumbs-divider">/</div>
      <a class="breadcrumbs-item" href="">Категории</a>
      <div class="breadcrumbs-divider">/</div>
      <a class="breadcrumbs-item" href="">Нижнее белье</a>
      <div class="breadcrumbs-divider">/</div>
      <a class="breadcrumbs-item" href="">Бюстгалтеры</a>
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
    }

  }
</style>