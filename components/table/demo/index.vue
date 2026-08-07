<template>
  <demo-sort :cols="1">
    <Basic />
    <CustomHeader />
    <Ajax />
    <Bordered />
    <Ellipsis />
    <ColspanRowspan />
    <EditCell />
    <EditRow />
    <ExpandChildren />
    <Expand />
    <FixedColumnsHeader />
    <FixedColumns />
    <FixedHeader />
    <AutoHeight />
    <VirtualList />
    <VirtualTree />
    <GroupingColumns />
    <MultipleSorter />
    <NestedTable />
    <Head />
    <CustomFilterPanel />
    <ResetFilter />
    <filterSearchVue />
    <filterInTreeVue />
    <RowSelectionAndOperation />
    <RowSelectionCustom />
    <RowSelection />
    <Sticky />
    <ResizableColumn />
    <ResizableRow />
    <VerticalLayout />
    <DragSort />
    <DragSortTree />
    <DragSortVertical />
    <Size />
    <Stripe />
    <Summary />
    <Responsive />
    <TemplateCom />
  </demo-sort>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Ajax from './ajax.vue';
import Basic from './basic.vue';
import CustomHeader from './custom-header.vue';
import Bordered from './bordered.vue';
import ColspanRowspan from './colspan-rowspan.vue';
import CustomFilterPanel from './custom-filter-panel.vue';
import EditCell from './edit-cell.vue';
import EditRow from './edit-row.vue';
import ExpandChildren from './expand-children.vue';
import Expand from './expand.vue';
import FixedColumnsHeader from './fixed-columns-header.vue';
import FixedColumns from './fixed-columns.vue';
import FixedHeader from './fixed-header.vue';
import AutoHeight from './auto-height.vue';
import VirtualList from './virtual-list.vue';
import VirtualTree from './virtual-tree.vue';
import GroupingColumns from './grouping-columns.vue';
import Head from './head.vue';
import NestedTable from './nested-table.vue';
import ResetFilter from './reset-filter.vue';
import RowSelectionAndOperation from './row-selection-and-operation.vue';
import RowSelectionCustom from './row-selection-custom.vue';
import RowSelection from './row-selection.vue';
import Size from './size.vue';
import TemplateCom from './template.vue';
import Ellipsis from './ellipsis.vue';
import Stripe from './stripe.vue';
import MultipleSorter from './multiple-sorter.vue';
import Summary from './summary.vue';
import Sticky from './sticky.vue';
import ResizableColumn from './resizable-column.vue';
import ResizableRow from './resizable-row.vue';
import VerticalLayout from './vertical-layout.vue';
import DragSort from './drag-sort.vue';
import DragSortTree from './drag-sort-tree.vue';
import DragSortVertical from './drag-sort-vertical.vue';
import Responsive from './responsive.vue';
import filterSearchVue from './filter-search.vue';
import filterInTreeVue from './filter-in-tree.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';

export default defineComponent({
  CN,
  US,
  components: {
    filterInTreeVue,
    filterSearchVue,
    Basic,
    CustomHeader,
    Ellipsis,
    Ajax,
    Bordered,
    ColspanRowspan,
    CustomFilterPanel,
    EditCell,
    EditRow,
    ExpandChildren,
    Expand,
    FixedColumnsHeader,
    FixedColumns,
    FixedHeader,
    AutoHeight,
    VirtualList,
    VirtualTree,
    GroupingColumns,
    Head,
    NestedTable,
    ResetFilter,
    RowSelectionAndOperation,
    RowSelectionCustom,
    RowSelection,
    Size,
    TemplateCom,
    Stripe,
    MultipleSorter,
    Summary,
    Sticky,
    ResizableColumn,
    ResizableRow,
    VerticalLayout,
    DragSort,
    DragSortTree,
    DragSortVertical,
    Responsive,
  },
});
</script>
