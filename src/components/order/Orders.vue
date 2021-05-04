<template>
  <div class="orders">
    <button
      class="tab_nav"
      v-for="tab in tabs"
      :key="tab.id"
      @click="handleClick(tab.id)"
      :class="{active_tab: currentId === tab.id}"
    >
      {{ tab.title }}
    </button>
    <div v-for="order in orders" :key="order.id">
      <order-item :order="order" v-if="order.tab_sort_id === currentId"/>
    </div>
  </div>
</template>

<script>
import OrderItem from "@/components/order/orderItem";
export default {
  name: "Orders",
  components: {OrderItem},
  props: ['tabs'],
  data() {
    return {
      currentId: this.tabs[0].id,
      orders: [
        {
          id: '891283201932013',
          status_order: 'Собирается на складе',
          data_delivery: '14-02-2012',
          way_delivery: 'Курьерская доставка до двери',
          address_delivery: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          price: '13 000',
          tab_sort_id: this.tabs[0].id
        },
        {
          id: '891283201932014',
          status_order: 'Доставлен',
          data_delivery: '14-02-2012',
          way_delivery: 'Курьерская доставка до двери',
          address_delivery: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          price: '13 000',
          tab_sort_id: this.tabs[1].id
        },
        {
          id: '891283201932015',
          status_order: 'Отменен',
          data_delivery: '14-02-2012',
          way_delivery: 'Курьерская доставка до двери',
          address_delivery: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          price: '13 000',
          tab_sort_id: this.tabs[1].id
        }
      ],
    }
  },
  methods: {
    handleClick(id) {
      this.currentId = id
    }
  },
  computed: {
    countOrder() {
      return this.orders.filter((order) => {
        return order.tab_sort_id === this.currentId
      })
    },
    count() {
      return this.countOrder.length
    }
  }
}
</script>

<style lang="scss" scoped>

</style>