<template>
  <div id="calendar">
    <div class="header">
      <select v-model="selectedYear" @change="updateCalendar">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
      <select v-model="selectedMonth" @change="updateCalendar">
        <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}</option>
      </select>
    </div>
    <div class="calendar-grid">
      <div class="day" v-for="day in days" :key="day" @click="openTodoList(day)">{{ day }}</div>
    </div>
    <div v-if="showTodoList" class="modal">
      <div class="modal-content">
        <button @click="closeTodoList" class="close-button">关闭</button>
        <TodoList :selectedDate="selectedDate" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoList from './TodoList.vue';

export default {
  name: 'MyCalendar',
  components: {
    TodoList
  },
  setup() {
    const currentDate = ref(new Date()); // 当前日期
    const selectedYear = ref(currentDate.value.getFullYear()); // 选中的年份
    const selectedMonth = ref(currentDate.value.getMonth()); // 选中的月份

    // 计算前后十年的年份数组
    const years = computed(() => {
      const currentYear = selectedYear.value;
      return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
    });

    // 月份数组，中文显示
    const months = ref([
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ]);

    // 计算选中月份的天数
    const daysInMonth = computed(() => new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate());
    // 生成天数数组
    const days = computed(() => Array.from({ length: daysInMonth.value }, (_, i) => i + 1));

    // 更新日历
    const updateCalendar = () => {
      // 触发重新计算天数
    };

    const showTodoList = ref(false); // 控制待办列表的显示
    const selectedDate = ref(''); // 存储选中的日期

    // 打开待办列表
    const openTodoList = (day) => {
      // 根据选中的年、月、日生成日期字符串，并转换为东八区时间
      const date = new Date(selectedYear.value, selectedMonth.value, day);
      selectedDate.value = new Date(date.getTime() + 8 * 60 * 60 * 1000).toISOString();
      showTodoList.value = true;
    };

    // 关闭待办列表
    const closeTodoList = () => {
      showTodoList.value = false;
    };

    return {
      selectedYear,
      selectedMonth,
      years,
      months,
      days,
      updateCalendar,
      showTodoList,
      openTodoList,
      closeTodoList,
      selectedDate // 返回选中的日期
    };
  }
};
</script>

<style>
#calendar {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #e0f7e9; /* 淡绿色背景 */
  padding: 60px; /* 增加内边距，使页面更大 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px; /* 设置更大的最大宽度 */
  margin: 0 auto; /* 居中对齐 */
}

.header {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.header select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  color: #2c3e50;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.header select:hover {
  background-color: #f0f0f0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day {
  padding: 40px; /* 增加大小 */
  background: #fff;
  border-radius: 10px; /* 更圆滑的边角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px; /* 增加字体大小 */
  color: #2c3e50;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1; /* 设置为正方形 */
}

.day:hover {
  background-color: #f0f0f0;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.1); /* 修改为淡蓝色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.modal-content {
  background: #e2f3f5; /* 修改为淡蓝色背景 */
  padding: 20px;
  border-radius: 10px;
  width: 300px; /* 固定宽度 */
  max-height: 80%; /* 最大高度 */
  overflow-y: auto; /* 超出时滚动 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.close-button {
  background: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>