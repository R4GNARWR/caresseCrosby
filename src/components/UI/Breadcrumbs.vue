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
  // props: {
  //   title: {
  //     type: String,
  //     default: null,
  //   },
  // },
  
  // computed: {
  //   crumbs() {
  //     const fullPath = this.$router.fullPath
  //     const params = fullPath.substring(1).split('/')
  //     const crumbs = []
      
  //     let path = ''
      
  //     params.forEach((param, index) => {
  //       path = `${path}/${param}`
  //       const match = this.$router.match(path)
        
  //       if (match.name !== null) {
  //         crumbs.push(match)
  //       }
  //     })
      
  //     return crumbs
  //   },
  // },
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