<template>
  <div class="components flex">
    <div class="flex-none">
      <Menu theme="light" :active-name="active" @on-select="onselect">
        <MenuItem name="pageBgImg">
          背景图 ici-bg-img
        </MenuItem>
        <MenuItem name="pageField">
          数据选择 ici-Field
        </MenuItem>
        <MenuItem name="pageImagePreview">
          图片查看器 ici-image-preview
        </MenuItem>
        <MenuItem name="pageButton">
          按钮 ici-button
        </MenuItem>
        <MenuItem name="pageLoading">
          加载 ici-loading
        </MenuItem>
        <MenuItem name="pageIcon">
          图标 ici-icon
        </MenuItem>
        <MenuItem name="pageInput">
          输入 ici-input
        </MenuItem>
        <MenuItem name="pagePopup">
          弹窗 ici-popup
        </MenuItem>
        <MenuItem name="pageMessage">
          消息 ici-msg
        </MenuItem>
        <MenuItem name="pageSearch">
          搜索 ici-search
        </MenuItem>
        <MenuItem name="pageHeader">
          导航头部 ici-header
        </MenuItem>
      </Menu>
    </div>
    <div class="flex-auto" style="overflow-y: scroll;overflow-x: visible">
      <component v-bind:is="currentView"/>
    </div>
  </div>
</template>

<script>
  import pageButton from '../examples/page-button.vue';
  import pageLoading from '../examples/page-loading.vue';
  import pageIcon from '../examples/page-icon.vue';
  import pageInput from '../examples/page-input.vue';
  import pagePopup from '../examples/page-popup.vue';
  import pageMessage from '../examples/page-message.vue';
  import pageSearch from '../examples/page-search.vue';
  import pageHeader from '../examples/page-header.vue';
  import pageImagePreview from '../examples/page-image-preview.vue'
  import pageField from '../examples/page-field'
  import pageBgImg from '../examples/page-bg-image'

  var components = {
    pageButton,
    pageLoading,
    pageIcon,
    pageInput,
    pagePopup,
    pageMessage,
    pageSearch,
    pageHeader,
    pageImagePreview,
    pageField,
    pageBgImg
  };
  export default {
    name: 'app',
    data() {
      return {
        active: 'pageImagePreview'
      };
    },
    computed: {
      currentView() {
        return components[this.active];
      }
    },
    props: {
      open: Boolean,
    },
    mounted() {
    },
    beforeDestroy() {

    },
    methods: {
      onselect(e) {
        this.active = e;
      }
    },
    components: components
  };
</script>

<style scoped lang="less">
  .components {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99998;
    background: #fff;
    > div:first-child {
      width: 240px;
    }
    > div:last-child {
      padding: 20px;
    }
  }

  .close {
    position: absolute;
    top: 10px;
    right: 30px;
  }
</style>
