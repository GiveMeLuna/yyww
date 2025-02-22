const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors'); // 添加CORS支持
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors()); // 使用CORS中间件
app.use(bodyParser.json()); // 使用body-parser中间件解析JSON请求体

const uri = 'mongodb://localhost:27017'; // MongoDB连接字符串
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect(); // 连接到MongoDB
    const database = client.db('todolist'); // 选择数据库
    const collection = database.collection('todolist'); // 选择集合

    // 添加任务的API
    app.post('/add', async (req, res) => {
      const { task, completed, dueDate } = req.body; // 从请求体中获取任务数据
      const newDocument = {
        task,
        completed,
        dueDate: new Date(dueDate) // 将dueDate转换为Date对象
      };
      await collection.insertOne(newDocument); // 插入新任务到集合中
      res.send('Document inserted'); // 返回成功消息
    });

    // 获取任务的API，根据是否提供dueDate参数来决定查询所有任务还是查询匹配dueDate的任务
    app.get('/list', async (req, res) => {
      const { dueDate } = req.query; // 从查询参数中获取dueDate
      console.log('Received dueDate:', dueDate); // 打印传入的dueDate的值
      let query = {};
      if (dueDate) {
        const dueDateOnly = new Date(dueDate).toISOString().split('T')[0]; // 截取日期部分
        console.log('Formatted dueDate:', dueDateOnly); // 打印格式化后的dueDate
        query = {
          $expr: {
            $eq: [{ $substr: ['$dueDate', 0, 10] }, dueDateOnly] // 使用表达式截取数据库中dueDate的日期部分进行匹配
          }
        };
      }
      console.log('Query:', query); // 打印查询条件
      const documents = await collection.find(query).toArray(); // 查询任务
      console.log('Documents:', documents); // 打印查询结果
      res.json(documents); // 返回任务列表
    });

    // 启动服务器
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err); // 处理错误
  }
}

run().catch(console.error); // 运行主函数并处理错误