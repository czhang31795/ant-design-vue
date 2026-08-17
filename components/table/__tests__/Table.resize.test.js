import { mount } from '@vue/test-utils';
import Table from '..';
import * as Vue from 'vue';

describe('Table.resize', () => {
  const data = [
    { key: '1', name: 'Jack', age: 32 },
    { key: '2', name: 'Lucy', age: 42 },
  ];

  it('table-level resizable renders handles for numeric-width columns', async () => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
      { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
      { title: 'Tags', dataIndex: 'tags', key: 'tags', width: 180, resizable: false },
    ];
    const wrapper = mount(Table, {
      props: {
        resizable: true,
        pagination: false,
        columns,
        dataSource: data,
      },
      sync: false,
    });
    await Vue.nextTick();

    const handles = wrapper.findAll('.ant-table-resize-handle');
    expect(handles).toHaveLength(2);
    expect(wrapper.find('.ant-table-wrapper-resizable').exists()).toBe(true);
  });

  it('drag commit updates column.width and ColGroup uses declared width', async () => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
      { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
    ];
    const wrapper = mount(Table, {
      props: {
        resizable: true,
        pagination: false,
        columns,
        dataSource: data,
        onResizeColumn: (w, col) => {
          col.width = w;
        },
      },
      sync: false,
    });
    await Vue.nextTick();

    const handle = wrapper.find('.ant-table-resize-handle');
    const th = handle.element.parentElement;
    th.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 150,
      bottom: 40,
      width: 150,
      height: 40,
      toJSON() {},
    });

    const fireMouse = (target, type, pageX) => {
      const evt = new MouseEvent(type, { button: 0, bubbles: true, cancelable: true });
      Object.defineProperty(evt, 'pageX', { get: () => pageX });
      target.dispatchEvent(evt);
    };

    fireMouse(handle.element, 'mousedown', 150);
    fireMouse(document.documentElement, 'mousemove', 220);
    fireMouse(document.documentElement, 'mouseup', 220);
    await Vue.nextTick();

    expect(columns[0].width).toBe(220);
    wrapper.setProps({ columns: [...columns] });
    await Vue.nextTick();

    const colStyle = wrapper.find('col').attributes('style') || '';
    expect(colStyle).toContain('220px');
  });
});
