import type { ExtractPropTypes, CSSProperties } from 'vue';
import { computed, watch, defineComponent, onMounted, ref } from 'vue';
import VcTooltip from '../vc-tooltip';
import classNames from '../_util/classNames';
import PropTypes from '../_util/vue-types';
import { PresetColorTypes } from '../_util/colors';
import warning from '../_util/warning';
import { getStyle, filterEmpty, isValidElement, initDefaultProps } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
export type { TriggerType, TooltipPlacement } from './abstractTooltipProps';
import abstractTooltipProps from './abstractTooltipProps';
import useConfigInject from '../_util/hooks/useConfigInject';
import getPlacements from './placements';
import firstNotUndefined from '../_util/firstNotUndefined';
import raf from '../_util/ref';
export type { AdjustOverflow, PlacementsConfig } from './placements';

// https://github.com/react-component/tooltip
// https://github.com/yiminghe/dom-align
export interface TooltipAlignConfig {
  points?: [string, string];
  offset?: [number | string, number | string];
  targetOffset?: [number | string, number | string];
  overflow?: { adjustX: boolean; adjustY: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

const splitObject = (obj: any, keys: string[]) => {
  const picked = {};
  const omitted = { ...obj };
  keys.forEach(key => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
};

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);

export const tooltipProps = () => ({
  ...abstractTooltipProps(),
  title: PropTypes.any,
});

export const tooltipDefaultProps = () => ({
  trigger: 'hover',
  transitionName: 'zoom-big-fast',
  align: {},
  placement: 'top',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
});

export type TooltipProps = Partial<ExtractPropTypes<ReturnType<typeof tooltipDefaultProps>>>;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATooltip',
  inheritAttrs: false,
  props: initDefaultProps(tooltipProps(), {
    trigger: 'hover',
    transitionName: 'zoom-big-fast',
    align: {},
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
  }),
  slots: ['title'],
  // emits: ['update:visible', 'visibleChange'],
  setup(props, { slots, emit, attrs, expose }) {
    const { prefixCls, getPopupContainer } = useConfigInject('tooltip', props);

  }
})
