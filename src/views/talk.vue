<template>
  <div class="right">
    <el-scrollbar height="80%">
      <div class="left-talk">
        <el-avatar style="margin-right: 20px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-card style="width: 480px" shadow="always">
          {{ askMsg }}
        </el-card>
      </div>
      <div class="right-talk">
        <el-card style="width: 480px" shadow="always">
          {{ returnMsg }}
        </el-card>
        <el-avatar style="margin-left: 20px;" src="https://pic.aigexing.net/uploads/6/1253/2097803297/9123380427/63937713.jpg" />
      </div>
    </el-scrollbar>
    <div class="bottom">
      <el-divider />
      <div class="content">
        <el-avatar style="margin-right: 20px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-input
          v-model="chatText"
          style="width: 80%;"
          :autosize="{ minRows: 5, maxRows: 6 }"
          type="textarea"
          placeholder="请输入聊天内容"
          @change=""
        />
        <el-button type="primary" style="margin-left: 20px;" :disabled="chatText === ''" @click="getList">发送</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="clearChat">清空聊天</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import talkAxios from "@/axios/axios"
import { onMounted, reactive, ref } from "vue";

const chatText = ref('')
const askMsg = ref('')
const returnMsg = ref('')
async function getList() {
  returnMsg.value = ''
  if(chatText.value != ''){
    let body = {
      "model": "gpt-4o-mini",
      "messages": [
        {
          "role": "user",
          "content": chatText.value
        }
      ]
    }
    askMsg.value = chatText.value
    // 清空文字
    chatText.value = ''
    let res =  await talkAxios.post("/v1/chat/completions",body)
    console.log("后端",(res as any).choices[0].message)
    returnMsg.value = (res as any).choices[0].message.content
  }

}
function clearChat() {
  chatText.value = ''
  askMsg.value = ''
  returnMsg.value = ''
}
onMounted(() => {

});
</script>

<style lang="scss" scoped>
  .right {
    position: relative;
    width: 100%;
    height: 100%;
    .left-talk {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
    }
    .right-talk {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
    }
    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 25%;
      .content {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;

      }
    }
  }
</style>
