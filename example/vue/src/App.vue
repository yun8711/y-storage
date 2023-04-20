<template>
  <div id="app">
    <p>打开控制台，在application -> Local Storage 中查看效果</p>
    <button @click="init">初始化命名空间</button>
    <button @click="save1" :disabled="!myStorage">写入数据1</button>
    <button @click="save2" :disabled="!myStorage">写入数据2</button>
    <button @click="get" :disabled="!myStorage">读取数据1</button>
    <button @click="del" :disabled="!myStorage">删除数据</button>
    <button @click="clear" :disabled="!myStorage">清空数据</button>
    <button @click="destroy" :disabled="!myStorage">销毁空间</button>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { YStorage } from "y-storage"

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      myStorage: null,
      msg:''
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    init(){
      let that = this
      this.myStorage = new YStorage({
        namespace: 'liuyun',
        callback(e){
          console.log(e)
          that.msg = JSON.stringify(e)
        }
      });
      console.log(this.myStorage)
    },
    save1() {
      this.myStorage.setItem('name', 'liuyun')
    },
    save2() {
      this.myStorage.setItem('department', 'kd-fe')
    },
    get() {
      alert(this.myStorage.getItem('name'))
    },
    del() {
      this.myStorage.removeItem('name')
    },
    clear(){
      this.myStorage.clear()
    },
    destroy() {
      this.myStorage.destroy()
      this.myStorage = null
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
