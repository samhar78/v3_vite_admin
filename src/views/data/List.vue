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

import TableComponent from './TableComponentView.vue'
import { ref } from 'vue'; 
const tableConfig: TableConfigInterface = {
  api: 'getTableData',
  columns: [
    {
      prop: 'log_time',
      label: '上传时间',
      tooltip: 'This is Date'
    },
    {
      prop: 'name',
      label: '发送者'
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
