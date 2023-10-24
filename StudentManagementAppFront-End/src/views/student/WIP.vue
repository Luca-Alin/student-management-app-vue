<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'WIPView'
})
</script>

<script setup>
import { computed } from "vue";

import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute()

const currentText = computed(() => {
  return route.params.data
})

</script>

<template>
  <h1><marquee direction="left">This page will be working soon!</marquee></h1>
  <h1><marquee direction="right">{{currentText}}</marquee></h1>
</template>