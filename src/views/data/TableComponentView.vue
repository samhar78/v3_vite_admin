
<script lang="ts" setup>
import { ref,reactive,computed } from 'vue';
interface OperationInterface {
  click: (row: unknown) => void // 按钮点击方法，参数为当前行数据
  text?: string // 按钮显示文字
  icon?: string // 按钮 icon
  visible?: (row?: unknown) => boolean // 设置按钮是否可见，参数为当前行数据，默认为 true
  type?: string // 按钮类型['primary'| 'success'| 'warning'| 'danger'| 'info']
  link?: boolean // 是否为链接按钮
  plain?: boolean // 是否为朴素按钮
}
interface TableConfigInterface {
  api: string // 表格数据获取接口
  rowKey?: string // 行数据的 Key
  columns: {
    // 显示列
    prop: string // 键名
    label?: string // 表头显示名称
    formatter?: (row: unknown) => string // 自定义单元格格式化方法，参数为当前行数据
    tooltip?: string // 表头 tooltip
    sortable?: boolean // 是否可以排序
    width?: number | string // 宽度
    style?: string // 单元格样式
    labelStyle?: string // 表头样式
  }[]
  selectable?: boolean | ((row: unknown) => boolean) // 当前行多选框是否可以勾选，参数为当前行数据，默认为 false
  operation?: {
    // 操作列
    columns: OperationInterface[]
    width?: number | string // 宽度
  }
  footer?: {
    // 操作列
    operations: OperationInterface[]
  }
  defaultSort?: {
    // 默认排序
    prop: string // 默认排序的列
    order?: string // ['ascending'| 'descending'], 没有指定 order, 则默认顺序是 ascending
  }
  maxHeight?: number | string // 表格最大高度
  layout?: string
}

const props = withDefaults(defineProps<TableConfigInterface>(), {
  rowKey: 'id',
  layout: 'prev, pager, next, total'
})
const pagination = ref({
  currentPage: 1,
  pageSize: 10
})
const tableRef = ref()
let tableData = reactive<unknown[]>([])

// 多选框逻辑
const isSelected = ref(false) // 是否有选中数据
const selectionRows = ref<unknown[]>([]) // 当前选中的数据
const handleSelectionChange = (rows: unknown[]) => {
  selectionRows.value = rows
  isSelected.value = rows.length > 0
}
const disabledList = reactive<string[]>([]) // 禁止勾选的数据
const setSelectable = (row: unknown) => {
  const selectable =
    typeof props.selectable === 'boolean' ? props.selectable : props.selectable?.(row)
  if (!selectable && !disabledList.includes(row?.[props.rowKey])) {
    disabledList.push(row?.[props.rowKey])
  }
  return selectable
}
const indeterminate = computed(
  () =>
    selectionRows.value.length > 0 &&
    selectionRows.value.length < tableData.length - disabledList.length
)
const showSelectBox = computed(() => props.selectable && disabledList.length < tableData.length)

// 操作框逻辑
const showOperation = ref(false)
const setVisible = (row: unknown, visible?: (row: unknown) => boolean) => {
  if (!visible || visible(row)) {
    showOperation.value = true
    return true
  }
  return false
}

// 排序
const handleSortChange = (data: { prop: string; order: string | null }) => {
  const { prop, order } = data
  console.log(prop, order)
  // getTableData
}

// 跳转详情页
const goDetail = (row: unknown) => {
  console.log(row)
}

// 发送接口
const loading = ref(true)
const getTableData = () => {
  loading.value = true
  showOperation.value = false
  tableData = [
    {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-05',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-09',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-10',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-11',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }
  ]
  loading.value = false
}
getTableData()
</script>