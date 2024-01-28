<template>
  <section id="blogEdit">
    <v-container>
      <v-text-field class="text_input" v-model="title" regular label="Заголовок статьи"></v-text-field>
      <v-file-input
      class="text_input"
      v-model="mainImg"
      regular
      label="Обложка статьи"
      accept=".jpeg, .jpg, .png"
      ></v-file-input>
      <div>
        <div class="blog-edit__label">Добавьте и заполните разделы статьи</div>
        <div v-for="(i,index) in json_string" :key="index">
          <v-file-input
          class="text_input"
          v-model="json_string[index].content"
          multiple
          regular
          label="Выберите фотографии"
          accept=".jpeg, .jpg, .png"
          v-if="i.type ==='img'"
          ></v-file-input>
          <v-textarea
          outlined
          label="Текст абзаца"
          v-model="json_string[index].content"
          v-if="i.type ==='text'"
          />
        </div>
      </div>
      <div class="blog-edit__buttons">
        <button class="btn btn-primary" @click.prevent="newImg">Добавить фото</button>
        <button class="btn btn-primary" @click.prevent="newTxt">Добавить абзац текста</button>
        <button class="btn btn-primary ml-auto" v-if="ready" @click.prevent="saveIt()">Сохранить статью</button>
      </div>
    </v-container>
  </section>
</template>

<script>
import store from "../store/store";
import {mapState} from "vuex";

export default {
  name: "BlogEdit",
  data(){
    return{
      title:'',
      mainImg:null,
      json_string:[]
    }
  },
  methods:{
    newImg() {
      this.json_string.push({"type":"img", "content":null})
    },
    newTxt() {
      this.json_string.push({"type":"text", "content":null})
    },
    saveIt() {
      store.commit("loader")
      let i=0,
      mainImg="",
      mi=new FormData,
      miName="";
      miName = 'blog.' + Date.now() + '_main';
      mi.append(miName, this.mainImg);
      this.$API.uploadPhoto(mi).then(value => {
        console.log(value)
      });
      mainImg = miName+'.'+this.mainImg.name.substring(this.mainImg.name.lastIndexOf('.')+1, this.mainImg.name.length);
      let js_to_send = this.json_string
      for (let el of js_to_send) {
        if (el.type === "img") {
          let fd = new FormData, new_content="";
          for (let p of el.content) {
            let file_name = 'blog.' + Date.now();
            file_name += "_" + i;
            i++;
            fd.append(file_name, p);
            new_content+=file_name+'.'+p.name.substring(p.name.lastIndexOf('.')+1, p.name.length)+',';
          }
          this.$API.uploadPhoto(fd).then(value => {
            console.log(value)
          });
          el.content = new_content.substring(0,new_content.length-1);
        }
      }
      this.$API.createBlog(this.title, mainImg, js_to_send)
      setTimeout(()=> {
        store.commit("loader");
        this.$router.go(-1);
      } ,5000)
    }
  },
  computed: {
    ready() {
      for (let el of this.json_string) {
        if (el.content == null) {
          return false;
        }
        if (el.type ==='img' && typeof(el.content) ==='string') {
          return false;
        }
      }
      return (this.json_string.length>0 && this.title && this.mainImg)
    },
    ...mapState(['user_info', 'loggedIn'])
  },
  created() {
    if (this.user_info.role !== 3) {
      store.commit("set_snack_message", { msg: "Нужен пользователь с правами администратора!", type: "error" });
      setTimeout(() => {this.$router.push('/');}, 2500);
    }
  }
}
</script>

<style scoped lang="scss">
#blogEdit
{
  padding: 5rem 0 10rem 0;
}
.blog-edit__label
{
  font-size: 2.4rem;
  line-height: 1.3em;
  margin-bottom: 30px;
}
.blog-edit__buttons
{
  display: flex;
  column-gap: 12px;
}
</style>
