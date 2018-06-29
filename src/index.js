import iciButton from './components/ici-button.vue'
import iciLoading from './components/ici-loading.vue'
import iciIcon from './components/ici-icon.vue'
import iciInput from './components/ici-input.vue'
import iciInputGroup from './components/ici-input-group'
import multipleField from './components/multiple_field.vue'
import radioField from './components/radio_field.vue'
import iciPopup from './components/ici-popup.vue'
import iciMessage from './components/ici-message.vue'
import iciSearch from './components/ici-search.vue'
import iciHint from './components/ici-hint.vue'
import iciHeader from './components/ici-header.vue'

export const components = {
  iciButton, iciLoading, iciIcon, multipleField, radioField, iciInput,iciInputGroup, iciPopup, iciSearch, iciHint,iciHeader
}
const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(function (val) {
    return Vue.component(val, components[val]);
  });

  var message = new Vue(iciMessage);
  Vue.prototype.$icimsg = message;

  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('focus', {
    // 指令的定义
    update: function (el, binding) {
      if (binding.value && binding.value  !== binding.oldValue) {
        setTimeout(function () {
          el.focus();
        }, 150)
      }
    },
    inserted: function (el, binding) {
      if (binding.value) {
        setTimeout(function () {
          el.focus();
        }, 150);
      }
    }
  })
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {install: install};
