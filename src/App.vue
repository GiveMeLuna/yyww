<template>
  <div id="app">
    <MyCalendar class="scaled-calendar" />

  </div>
</template>

<script>
import MyCalendar from './components/MyCalendar.vue';


export default {
  name: 'App',
  components: {
    MyCalendar
  }


};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0; /* 移除顶部的空白 */
  padding-top: 0px; /* 增加顶部内边距 */
  background-color: #e0f7e9; /* 设置与 MyCalendar.vue 一致的淡绿色背景 */
  min-height: 100vh; /* 确保背景覆盖整个视口高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scaled-calendar {
  transform: scale(1.3); /* 等比例缩小 */
  transform-origin: center; /* 以中心为基准进行缩放 */
}

</style>
