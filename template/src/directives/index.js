import copy from './copy'
import title from './title'

const directives = {
  copy,
  title
}
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}