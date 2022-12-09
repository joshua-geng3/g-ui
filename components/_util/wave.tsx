import { nextTick, defineComponent, getCurrentInstance, onMounted, onBeforeMount } from 'vue';
import TransitionEvents from "./css-animation/Event";
import raf from './raf';
import { findDOMNode } from "./props-util";
import useConfigInject from './hooks/useConfigInject';
let styleForPesudo: HTMLStyleElement；

// Where el is the DOM element you'd like to test for visibility
function isHidden(element: HTMLElement) {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  return !element || element.offsetParent === null;
}

function isNotGrey(color: string) {
  const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  if (match && match[1] && match[2] && match[3]) {
    return !(match[1] === match[2] && match[2] === match[3]);
  }
  return true;
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Wave',
  props: {
    insertExtraNode: Boolean,
    disabled: Boolean,
  },
  setup(props, { slots, expose }) {
    const instance = getCurrentInstance();
    const { csp, prefixCls } = useConfigInject('', props);
    expose({
      csp,
    });
    let eventIns = null;
    let clickWaveTimeoutId = null;
    let animationStartId = null;
    let animationStart = false;
    let extraNode = null;
    let isUnmounted = false;
    const onTransitionStart = e => {
      if (isUnmounted) return;

      const node = findDOMNode(instance);
      if (!e || e.target !== node) {
        return;
      }

      if (!animationStart) {
        resetEffect(node);
      }
    };
    const onTransitionEnd = e => {
      if (!e || e.animationName !== 'fadeEffect') {
        return;
      }
      resetEffect(e.target);
    };
    const getAttributeName = () => {
      const { insertExtraNode } = props;
      return insertExtraNode
        ? `${prefixCls.value}-click-animating`
        : `${prefixCls.value}-click-animating-without-extra-node`;
    };
    const onClick = (node: HTMLElement, waveColor: string) => {
      const { insertExtraNode, disabled } = props;
      if (disabled || !node || isHidden(node) || node.className.indexOf('-leave') >= 0) {
        return;
      }

      extraNode = document.createElement('div');
      extraNode.className = `${prefixCls.value}-click-animating-node`;
      const attributeName = getAttributeName();
      node.removeAttribute(attributeName);
      node.setAttribute(attributeName, 'true');
      // No white or transparent or grey
      styleForPesudo = styleForPesudo || document.createElement('style');
      if (
        waveColor &&
        waveColor !== '#ffffff' &&
        waveColor !== 'rgb(255, 255, 255)' &&
        isNotGrey(waveColor) &&
        !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
        waveColor !== 'transparent'
      ) {
        // Add nonce if CSP exist
        if (csp.value?.nonce) {
          styleForPesudo.nonce = csp.value.nonce;
        }
        extraNode.style.borderColor = waveColor;
        styleForPesudo.innerHTML = `
        [${prefixCls.value}-click-animating-without-extra-node=true]::after, .${prefixCls.value}-click-animating-node {
          --antd-wave-shadow-color: ${waveColor};
        }`;
        if (!document.body.contains(styleForPesudo)) {
          document.body.appendChild(styleForPesudo);
        }
      }
      if (insertExtraNode) {
        node.appendChild(extraNode);
      }
      TransitionEvents.addStartEventListener(node, onTransitionStart);
      TransitionEvents.addEndEventListener(node, onTransitionEnd);
    };
  }
})
