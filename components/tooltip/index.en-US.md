---
category: Components
type: Data Display
title: Tooltip
cover: https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a 'button/text/operation'. It's often used instead of the html 'title' attribute.

## API

| Property | Description                   | Type         | Default |
| -------- | ----------------------------- | ------------ | ------- |
| title    | The text shown in the tooltip | string\|slot | -       |

### Common API

The following APIs are shared by Tooltip, Popconfirm, Popover.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| align | this value will be merged into placement's config, please refer to the settings [dom-align](https://github.com/yiminghe/dom-align) | Object | - |
| arrowPointAtCenter | Whether the arrow is pointed at the center of target | boolean | `false` |
| autoAdjustOverflow | Whether to adjust popup placement automatically when popup is off screen | boolean | `true` |
| color | The background color | string | - |
| defaultVisible | Whether the floating tooltip card is visible by default | boolean | `false` |
| destroyTooltipOnHide | Whether to destroy tooltip on hide | boolean | false |
| getPopupContainer | The DOM container of the tip, the default behavior is to create a `div` element in `body`. | Function(triggerNode) | () => document.body |
| mouseEnterDelay | Delay in seconds, before tooltip is shown on mouse enter | number | 0.1 |
| mouseLeaveDelay | Delay in seconds, before tooltip is hidden on mouse leave | number | 0.1 |
| overlayClassName | Class name of the tooltip card | string | - |
| overlayStyle | Style of the tooltip card | object | - |
| placement | The position of the tooltip relative to the target, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` |
| trigger | Tooltip trigger mode | `hover` \| `focus` \| `click` \| `contextmenu` | `hover` |
| visible(v-model) | Whether the floating tooltip card is visible or not | boolean | `false` |

### events

| Events Name | Description | Arguments |  |
| --- | --- | --- | --- |
| visibleChange | Callback executed when visibility of the tooltip card is changed | (visible) => void | - |

## Note

Please ensure that the child node of `Tooltip` accepts `mouseenter`, `mouseleave`, `focus`, `click` events.
