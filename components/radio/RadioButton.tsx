import { defineComponent, inject } from 'vue';
import type { RadioProps } from './Radio';
import Radio, { radioProps } from './Radio';
import useConfigInject from '../_util/hooks/useConfigInject';
import type { RadioGroupContext } from './interface';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ARadioButton',
  props: radioProps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('radio-button', props);
    const radioGroupContext = inject<RadioGroupContext>('radioGroupContext', undefined);

    return () => {
      const rProps: RadioProps = {
        ...props,
        prefixCls: prefixCls.value,
      };

      if (radioGroupContext) {
        rProps.onChange = radioGroupContext.onRadioChange;
        rProps.checked = rProps.value === radioGroupContext.stateValue.value;
        rProps.disabled = rProps.disabled || radioGroupContext.props.disabled;
      }
      return <Radio {...rProps}>{slots.default?.()}</Radio>;
    };
  },
});
