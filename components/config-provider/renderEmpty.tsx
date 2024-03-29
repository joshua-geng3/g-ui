import Empty from '../empty';
import type { VueNode } from '../_util/type';
import useConfigInject from '../_util/hooks/useConfigInject';

export interface RenderEmptyProps {
  componentName?: string;
}

const RenderEmpty = (props: RenderEmptyProps) => {
  const { prefixCls } = useConfigInject('empty', props);
  const renderHtml = (componentName?: string) => {
    switch (componentName) {
      case 'Table':
      case 'List':
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} class={`${prefixCls.value}-small`} />;

      default:
        return <Empty />;
    }
  };
  return renderHtml(props.componentName);
};

function renderEmpty(componentName?: string): VueNode {
  return <RenderEmpty componentName={componentName} />;
}

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;
