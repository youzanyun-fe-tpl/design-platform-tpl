<template>
  
</template>

<script>
export default {
  name: 'demo-buy-btn',

  props: ['goods'],

  data() {
  },

  components: {
    /* [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn, */
  },

  methods: {
    onClickMiniBtn() {
      this.goods
      Toast('点击图标');
    },
    onClickBigBtn() {
      Toast('点击按钮');
    }
  }
};
</script>

<style>
</style>
