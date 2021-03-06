<template>
  <transition name="ici-popup">
    <div v-show="value" class="fms-popup-layer" :class="{mask:mask}" :style="popupLayer"
         v-focus="value" tabindex="0"
         @mousedown.self="clickMark" @keydown.esc.stop="esc && $emit('input',false)">
      <div class="fms-popup" :style="popupStyle">
        <div ref="header" class="fms-popup-title" :class="titleClass">
          <slot name="header">{{title}}</slot>
        </div>

        <div class="fms-popup-body" :style="popupBody">
          <!--slot-->
          <div class="fms-popup-body-inner" :class="{noscroll:noScroll}">
            <slot></slot>
          </div>
          <ici-loading v-show="loading" block></ici-loading>
        </div>
        <div ref="footer" class="fms-popup-footer" v-if="!footerHide">
          <div v-if="$slots['footer-left']" class="fms-popup-footer-left">
            <!--slot-->
            <slot name="footer-left"></slot>
          </div>
          <div class="fms-popup-handle">
            <!--slot-->
            <slot name="footer-right">
              <ici-button v-if="hasConfirm" :loading="loading" @click="$emit('confirm')">confirm</ici-button>
              <ici-button @click="$emit('input',false)">close</ici-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: "ici-popup",
    data() {
      return {
        hasConfirm: false,
      }
    },
    props: {
      value: [Boolean, String],
      loading: Boolean,//弹是否属于加载状态

      title: {
        type: String,
        default: ''
      },
      bgColor: {
        type: String,
        default: '#fff'
      },
      titleClass: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'fixed'
      },
      esc: Boolean,
      mask: Boolean,
      noScroll: Boolean, //不出现滚动条
      markClose: Boolean, //点击遮罩层关闭
      maskClose: Boolean,
      maxHeight: { //最大高度
        type: String,
        default: '95%'
      },
      width: {
        type: Number,
        default: 700
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
      footerHide: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (this._events.confirm) {
        this.hasConfirm = true;
      }
    },
    computed: {
      popupStyle() {
        let css = {maxWidth: this.width + 'px', maxHeight: this.maxHeight}
        if (this.fullscreen) {
          css = {width: '100%', height: '100vh'}
        }
        return css;
      },
      popupLayer() {
        let css = {position: this.position}
        if (this.fullscreen) {
          css.padding = 0;
        }
        return css;
      },
      popupBody() {
        let css = {'background-color': this.bgColor}
        if (this.value) {
          let hHeight = this.$refs.header ? this.$refs.header.clientHeight : 0,
            fHeight = this.$refs.footer ? this.$refs.footer.clientHeight : 0
          if (this.fullscreen) {
            css.height = 'calc(100vh - ' + (hHeight + fHeight) + 'px)';
          }
        }
        return css;
      }
    },
    methods: {
      clickMark() {
        if (this.markClose || this.maskClose) {
          this.close()
        }
      },
      close() {
        this.$emit('input', false)
      }
    }
  }
</script>

<style scoped lang="less">

  .ici-popup-enter-active {
    transition: all .3s cubic-bezier(.8, 0.0, 0.2, 1) !important;
  }

  .ici-popup-leave-active {
    transition: all .3s cubic-bezier(.8, 0.0, 0.2, 1) .05s !important;
  }

  .ici-popup-enter, .ici-popup-leave-to {
    opacity: 0 !important;
  }

  .ici-popup-enter-to {
    opacity: 1 !important;

  }

  .fms-popup-layer {
    &.mask {
      background-color: rgba(0, 0, 0, .4);
      pointer-events: auto;
    }
    perspective: 1000px;
    outline: none;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backface-visibility: hidden;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    padding: 0 5%;
    &.ici-popup-enter-active {
      .fms-popup {
        .ici-popup-leave-active;
      }
    }
    &.ici-popup-leave-active {
      .fms-popup {
        .ici-popup-enter-active;
      }
    }
    &.ici-popup-enter, &.ici-popup-leave-to {
      .fms-popup {
        transform: translate3d(0, 0, -200px) !important;
      }
    }
    &.ici-popup-enter-to {
      .fms-popup {
        transform: translate3d(0, 0, 0) !important;
      }
    }
    .fms-popup {
      pointer-events: auto;
      width: 100%;
      align-items: stretch;
      display: flex;
      flex-shrink: 1;
      flex-direction: column;
      transition: transform .3s cubic-bezier(.8, 0.0, 0.2, 1) !important;
      position: relative;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);
      outline: none;
      .fms-popup-title {
        &:empty {
          display: none;
        }
        background-color: #f7f7f7;
        padding: 20px;
        font-size: 20px;
        align-items: center;
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
        position: relative;
        -webkit-transition: box-shadow .1s ease-in-out;
        transition: box-shadow .1s ease-in-out;
        width: 100%;
        z-index: 1;
        /*滚动效果*/
        &.roll {
          box-shadow: 0 0 10px silver;
        }
      }

      .fms-popup-body {
        position: relative;
        width: 100%;
        display: flex;
        .fms-popup-body-inner {
          flex: auto;
          overflow: auto;
          &.noscroll {
            overflow: visible;
          }
        }
      }
      .fms-popup-footer {
        flex: none;
        padding: 5px 10px;
        display: flex;
        .fms-popup-footer-left {
          flex: auto
        }
        .fms-popup-handle {
          flex: auto;
          text-align: right;
        }
      }
    }
  }
</style>
