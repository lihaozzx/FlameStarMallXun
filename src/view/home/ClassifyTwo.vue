<template>
    <div>
      <TopNav name="商品"/>
      <Conditions
        :categoryId="parseInt($route.params.id)"
      >
      </Conditions>
    </div>
</template>

<script>
import Conditions from './com/Conditions'
import TopNav from '@/components/TopNav'
export default {
  name: 'ClassifyTwo',
  components: {
    Conditions,
    TopNav
  }
}
</script>
