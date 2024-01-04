<template>
  <TableComponent v-bind="tableConfig">
    <template #nameHeader>
      <div>姓名sssefeeffffffffffff</div>
    </template>
    <template #name>
      <div>Yana</div>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">

import TableComponent from './TableComponent.vue';
import { ref } from 'vue'; 
const tableConfig: TableConfigInterface = {
  api: 'getTableData',
  columns: [
    {
      prop: 'date',
      label: 'Date',
      tooltip: 'This is Date'
    },
    {
      prop: 'name',
      label: 'Name'
    },
    {
      prop: 'state',
      label: 'State'
    },
    {
      prop: 'city',
      label: 'City'
    },
    {
      prop: 'address',
      label: 'Address'
    },
    {
      prop: 'zip',
      label: 'Zip',
      style: 'color: red',
      labelStyle: 'color: red',
      sortable: true
    }
  ],
  
  rowKey: 'date',
  selectable: (row) => row.date === '2016-05-07',
  footer: {
    operations: [
      {
        text: '删除',
        click: () => {}
      }
    ]
  }
}
const asideSettings = ref({
  isCollapse:true,
  width:'200'
})

// 给子组件绑定事件，通过子组件emit从而改变父组件的值
const changeAside = ()=>{
 asideSettings.value.isCollapse = !asideSettings.value.isCollapse
 if(asideSettings.value.isCollapse){
  asideSettings.value.width = "64"
 }else{
  asideSettings.value.width = "200"
 }
}

</script>
