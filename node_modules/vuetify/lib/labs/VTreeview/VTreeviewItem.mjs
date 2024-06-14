import { mergeProps as _mergeProps, withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VTreeviewItem.css";

// Components
import { VBtn } from "../../components/VBtn/index.mjs";
import { VListItemAction, VListItemSubtitle, VListItemTitle } from "../../components/VList/index.mjs";
import { makeVListItemProps, VListItem } from "../../components/VList/VListItem.mjs";
import { VProgressCircular } from "../../components/VProgressCircular/index.mjs"; // Composables
import { useDensity } from "../../composables/density.mjs";
import { IconValue } from "../../composables/icons.mjs";
import { useNestedItem } from "../../composables/nested/nested.mjs";
import { useLink } from "../../composables/router.mjs";
import { genOverlays } from "../../composables/variant.mjs"; // Utilities
import { computed, inject, ref } from 'vue';
import { genericComponent, propsFactory, useRender } from "../../util/index.mjs"; // Types
import { VTreeviewSymbol } from "./shared.mjs";
export const makeVTreeviewItemProps = propsFactory({
  loading: Boolean,
  toggleIcon: IconValue,
  ...makeVListItemProps({
    slim: true
  })
}, 'VTreeviewItem');
export const VTreeviewItem = genericComponent()({
  name: 'VTreeviewItem',
  props: makeVTreeviewItemProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const link = useLink(props, attrs);
    const rawId = computed(() => props.value === undefined ? link.href.value : props.value);
    const vListItemRef = ref();
    const {
      activate,
      isActivated,
      select,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      id
    } = useNestedItem(rawId, false);
    const isActivatableGroupActivator = computed(() => root.activatable.value && isGroupActivator);
    const {
      densityClasses
    } = useDensity(props, 'v-list-item');
    const slotProps = computed(() => ({
      isActive: isActivated.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value
    }));
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || props.value != null && !!vListItemRef.value?.list));
    function activateItem(e) {
      if (!isClickable.value || !isActivatableGroupActivator.value && isGroupActivator) return;
      if (root.activatable.value) {
        if (isActivatableGroupActivator.value) {
          activate(!isActivated.value, e);
        } else {
          vListItemRef.value?.activate(!vListItemRef.value?.isActivated, e);
        }
      }
    }
    function onKeyDown(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateItem(e);
      }
    }
    const visibleIds = inject(VTreeviewSymbol, {
      visibleIds: ref()
    }).visibleIds;
    useRender(() => {
      const hasTitle = slots.title || props.title != null;
      const hasSubtitle = slots.subtitle || props.subtitle != null;
      const listItemProps = VListItem.filterProps(props);
      const hasPrepend = slots.prepend || props.toggleIcon;
      return isActivatableGroupActivator.value ? _withDirectives(_createVNode("div", {
        "class": ['v-list-item', 'v-list-item--one-line', 'v-treeview-item', 'v-treeview-item--activetable-group-activator', {
          'v-list-item--active': isActivated.value || isSelected.value,
          'v-treeview-item--filtered': visibleIds.value && !visibleIds.value.has(id.value)
        }, densityClasses.value, props.class],
        "onClick": activateItem
      }, [_createVNode(_Fragment, null, [genOverlays(isActivated.value || isSelected.value, 'v-list-item'), props.toggleIcon && _createVNode(VListItemAction, {
        "start": false
      }, {
        default: () => [_createVNode(VBtn, {
          "density": "compact",
          "icon": props.toggleIcon,
          "loading": props.loading,
          "variant": "text",
          "onClick": props.onClick
        }, {
          loader() {
            return _createVNode(VProgressCircular, {
              "indeterminate": "disable-shrink",
              "size": "20",
              "width": "2"
            }, null);
          }
        })]
      })]), _createVNode("div", {
        "class": "v-list-item__content",
        "data-no-activator": ""
      }, [hasTitle && _createVNode(VListItemTitle, {
        "key": "title"
      }, {
        default: () => [slots.title?.({
          title: props.title
        }) ?? props.title]
      }), hasSubtitle && _createVNode(VListItemSubtitle, {
        "key": "subtitle"
      }, {
        default: () => [slots.subtitle?.({
          subtitle: props.subtitle
        }) ?? props.subtitle]
      }), slots.default?.(slotProps.value)])]), [[_resolveDirective("ripple"), isClickable.value && props.ripple]]) : _createVNode(VListItem, _mergeProps({
        "ref": vListItemRef
      }, listItemProps, {
        "class": ['v-treeview-item', {
          'v-treeview-item--filtered': visibleIds.value && !visibleIds.value.has(id.value)
        }, props.class],
        "value": id.value,
        "onClick": activateItem,
        "onKeydown": isClickable.value && onKeyDown
      }), {
        ...slots,
        prepend: hasPrepend ? slotProps => {
          return _createVNode(_Fragment, null, [props.toggleIcon && _createVNode(VListItemAction, {
            "start": false
          }, {
            default: () => [_createVNode(VBtn, {
              "density": "compact",
              "icon": props.toggleIcon,
              "loading": props.loading,
              "variant": "text"
            }, {
              loader() {
                return _createVNode(VProgressCircular, {
                  "indeterminate": "disable-shrink",
                  "size": "20",
                  "width": "2"
                }, null);
              }
            })]
          }), slots.prepend?.(slotProps)]);
        } : undefined
      });
    });
    return {};
  }
});
//# sourceMappingURL=VTreeviewItem.mjs.map