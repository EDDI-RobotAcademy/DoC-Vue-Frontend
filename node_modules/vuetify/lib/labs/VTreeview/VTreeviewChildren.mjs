import { mergeProps as _mergeProps, resolveDirective as _resolveDirective, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Components
import { VTreeviewGroup } from "./VTreeviewGroup.mjs";
import { VTreeviewItem } from "./VTreeviewItem.mjs";
import { VCheckboxBtn } from "../../components/VCheckbox/index.mjs"; // Utilities
import { shallowRef, withModifiers } from 'vue';
import { genericComponent, propsFactory } from "../../util/index.mjs"; // Types
export const makeVTreeviewChildrenProps = propsFactory({
  loadChildren: Function,
  loadingIcon: {
    type: String,
    default: '$loading'
  },
  items: Array,
  selectable: Boolean,
  selectStrategy: [String, Function, Object]
}, 'VTreeviewChildren');
export const VTreeviewChildren = genericComponent()({
  name: 'VTreeviewChildren',
  props: makeVTreeviewChildrenProps(),
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isLoading = shallowRef(null);
    function checkChildren(item) {
      return new Promise(resolve => {
        if (!props.items?.length || !props.loadChildren) return resolve();
        if (item?.children?.length === 0) {
          isLoading.value = item.value;
          props.loadChildren(item).then(resolve);
          return;
        }
        resolve();
      }).finally(() => {
        isLoading.value = null;
      });
    }
    function selectItem(select, isSelected) {
      if (props.selectable) {
        select(!isSelected);
      }
    }
    return () => slots.default?.() ?? props.items?.map(_ref2 => {
      let {
        children,
        props: itemProps,
        raw: item
      } = _ref2;
      const loading = isLoading.value === item.value;
      const slotsWithItem = {
        prepend: slotProps => _createVNode(_Fragment, null, [props.selectable && (!children || children && !['leaf', 'single-leaf'].includes(props.selectStrategy)) && _createVNode("div", null, [_createVNode(VCheckboxBtn, {
          "key": item.value,
          "modelValue": slotProps.isSelected,
          "loading": loading,
          "indeterminate": slotProps.isIndeterminate,
          "onClick": withModifiers(() => selectItem(slotProps.select, slotProps.isSelected), ['stop']),
          "onKeydown": e => {
            if (!['Enter', 'Space'].includes(e.key)) return;
            e.stopPropagation();
            selectItem(slotProps.select, slotProps.isSelected);
          }
        }, null)]), slots.prepend?.({
          ...slotProps,
          item
        })]),
        append: slots.append ? slotProps => slots.append?.({
          ...slotProps,
          item
        }) : undefined,
        title: slots.title ? slotProps => slots.title?.({
          ...slotProps,
          item
        }) : undefined
      };
      const treeviewGroupProps = VTreeviewGroup.filterProps(itemProps);
      const treeviewChildrenProps = VTreeviewChildren.filterProps(props);
      return children ? _createVNode(VTreeviewGroup, _mergeProps({
        "value": itemProps?.value
      }, treeviewGroupProps), {
        activator: _ref3 => {
          let {
            props: activatorProps
          } = _ref3;
          const listItemProps = {
            ...itemProps,
            ...activatorProps,
            value: itemProps?.value
          };
          return _createVNode(VTreeviewItem, _mergeProps(listItemProps, {
            "loading": loading,
            "onClick": () => checkChildren(item)
          }), slotsWithItem);
        },
        default: () => _createVNode(VTreeviewChildren, _mergeProps(treeviewChildrenProps, {
          "items": children
        }), slots)
      }) : slots.item?.({
        props: itemProps
      }) ?? _createVNode(VTreeviewItem, itemProps, slotsWithItem);
    });
  }
});
//# sourceMappingURL=VTreeviewChildren.mjs.map