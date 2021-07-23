<template>
  <div class="task-list">
    12122{{ content }}
    <table style="margin: 0 auto">
      <!-- 设置居中,如果没获取到内容则不显示 -->
      <tr><th v-for="h in content[0]" :key="h.id">{{h}}</th></tr>  
      <tr v-for="row in content.slice(1,)" :key=row.id>
        <td v-for="item in row" :key=item.id>{{item}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import XLSX from "xlsx";
import transformSheets from "./xlsx.js"; //导入转制函数

export default {
  name: "TaskList",
  data() {
    return {
      content: "qqq", //初始化数据
      err: "",
    };
  },
  created() {
    console.log(1232311);
    var url = "./mingzi1.xlsx"; //放在public目录下的文件可以直接访问

    //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
    axios
      .get(url, { responseType: "arraybuffer" })
      .then((res) => {
        console.log(121212);
        console.log(res);
        var data = new Uint8Array(res.data);
        var wb = XLSX.read(data, { type: "array" });
        var sheets = wb.Sheets;
        let str = this.ab2str(res.data);
        console.log(str);

        this.content = transformSheets(sheets);
      })
      .catch((err) => {
        this.err = err;
      });
  },
  methods: {
    ab2str(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    },
  },
};
</script>