<script lang="ts">
export default {
    props: {
        title: String,
        items: Array,
        total: Number
    }
}
</script>

<template>
<table class="table-auto divide-y divide-gray-300">
  <tbody class="bg-white divide-y divide-gray-300">
    <tr class="bg-blue-50">
      <th colspan="2" class="px-6 py-4">{{ title }}</th>
    </tr>
    <tr v-for="item in items" :key="item.name">
      <th class="px-10 py-4">{{ item.name }}</th><td class="px-6 py-4 text-right">{{ item.value }}€</td>
    </tr>
    <tr class="bg-yellow-50">
      <th class="px-10 py-4">Total</th><td class="px-6 py-4">{{ total }}€</td>
    </tr>
  </tbody>
</table>
</template>
