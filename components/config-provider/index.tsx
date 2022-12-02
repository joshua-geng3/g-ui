import type { UnwrapRef, App, Plugin, WatchStopHandle } from "vue";
import { computed, reactive, provide, defineComponent, watch, watchEffect } from "vue";
import defaultRenderEmpty from './renderEmpty';
import type { RenderEmptyHandler } from './renderEmpty';
import type { Locale } from '../locale-provider';
import LocaleProvider, { ANT_MARK } from '../locale-provider';

import LocaleReceiver from '../locale-provider/LocaleReceiver';

import type { MayBeRef } from '../_util/type';
import message from '../message';
import notification from '../notification';
import { registerTheme } from './cssVariables';
import defaultLocale from '../locale/default';
import type { ValidateMessages } from '../form/interface';

import type { ConfigProviderProps, Theme } from './context';
import { configProviderProps, useProvideGlobalForm } from './context';

export type { ConfigProviderProps, Theme, SizeType, Direction, CSPConfig } from './context';
export const defaultPrefixCls = 'ant';
function getGlobalPrefixCls() {
  return globalConfigForApi.prefixCls || defaultPrefixCls;
}
const globalConfigByCom = reactive<ConfigProviderProps>({});
const globalConfigBySet = reactive<ConfigProviderProps>({});
export const globalConfigForApi = reactive<
  ConfigProviderProps & {
    getRootPrefixCls?: (rootPrefixCls?: string, customizePrefixCls?: string) => string;
  }
>({});

watchEffect(() => {
  Object.assign(globalConfigForApi, globalConfigByCom, globalConfigBySet);
  globalConfigForApi.prefixCls = getGlobalPrefixCls();
  globalConfigForApi.get
});
