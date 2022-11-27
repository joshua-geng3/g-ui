import type { VNodeTypes, PropType, computedRef, Ref } from 'vue';
import { unref, inject, defineComponent, computed } from 'vue';
import defaultLocaleData from './default';
import type { Locale } from '.';
export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: Locale | Function;
  children: (locale: Locale, localeCode?: string, fullLocale?: Locale) => VNodeTypes;
}

interface LocaleInterface {
  [key: string]: any;
}

export interface LocaleReceiverContext {
  antLocale?: LocaleInterface;
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LocaleReceiver',
  props: {
    componentName: String as PropType<LocaleComponentName>,
    defaultLocale: {
      type: [Object, Function],
    },
    children: {
      type: Function as PropType<
        (locale: any, localeCode?: string, fullLocale?: object) => VNodeTypes
      >,
    },
  },
  setup(props, { slots }) {
    const localeData = inject<LocaleReceiverContext>('localeData', {});
    const locale = computed(() => {
      const { componentName = 'global', defaultLocale } = props;
    });
  }
})
