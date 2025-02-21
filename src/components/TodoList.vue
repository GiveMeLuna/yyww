<template>
  <div id="todo-list">
    <!-- 输入框和按钮 -->
    <div class="input-container">
      <input v-model="newItem" placeholder="输入内容">
      <button @click="addItem">添加</button>
    </div>
    <!-- 动态列表 -->
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <input type="checkbox" v-model="item.completed"> <!-- 单选框 -->
        <span :style="{ textDecoration: item.completed ? 'line-through' : 'none', wordBreak: 'break-all' }">{{ item.text }}</span> <!-- 划线状态，自动换行 -->
        <button @click="removeItem(index)" class="delete-button">删除</button> <!-- 删除按钮 -->
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'TodoList',
  props: {
    selectedDate: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const newItem = ref(''); // 存储新输入的内容
    const items = ref([]); // 存储列表项

    const addItem = async () => {
      // 检查输入内容是否为空
      if (newItem.value.trim() !== '') {
        // 将新输入的内容添加到列表中
        const task = newItem.value; // 在清空输入框之前获取输入内容
        items.value.push({ text: task, completed: false });
        // 清空输入框
        newItem.value = '';

        // 向后端发送请求，添加数据
        try {
          await axios.post('http://localhost:3000/add', {
            task: task, // 使用之前获取的输入内容
            completed: false, // 默认未完成
            dueDate: new Date(new Date(props.selectedDate).getTime() + 8 * 60 * 60 * 1000).toISOString() // 转换为东八区时间
          });
          console.log('数据已添加');
        } catch (error) {
          console.error('添加数据时出错', error);
        }
      }
    };

    const removeItem = (index) => {
      // 删除指定索引的列表项
      items.value.splice(index, 1);
    };

    return {
      newItem,
      items,
      addItem,
      removeItem
    };
  }
};
</script>

<style>
#todo-list {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 300px; /* 固定宽度 */
  max-height: 80%; /* 最大高度 */
  overflow-y: auto; /* 超出时滚动 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

input {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px; /* 调整按钮的上下宽度与输入框一致 */
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #358a6b;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
}

li {
  text-align: left;
  margin: 5px 0;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between; /* 确保内容和按钮在两边 */
  word-wrap: break-word; /* 自动换行 */
}

li input[type="checkbox"] {
  width: 20px;
  height: 20px;
  flex-shrink: 0; /* 防止单选框因内容增多而变化 */
}

li .delete-button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: red; /* 红色背景 */
  color: white; /* 白色字体 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex-shrink: 0; /* 防止按钮因内容增多而变化 */
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
</style>