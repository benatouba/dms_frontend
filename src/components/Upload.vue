<template>
  <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
<!--    <v-file-input-->
<!--            @drop.prevent="addFile"-->
<!--            @dragover.prevent-->
<!--            v-model="files"-->
<!--            show-size-->
<!--            label="File input"-->
<!--    ></v-file-input>-->
    <v-list>
      <v-list-item v-for="file in files" :key="file.name">
        {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
      </v-list-item>
    </v-list>
    <v-btn :disabled="uploadDisabled"
           @click="uploadFile()"
           icon
           large
           target="_blank"
    >
      <v-icon>mdi-upload</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "upload",
    filters: {
      kb: function (val) {
        return Math.floor(val/1024);
      }
    },
    computed: {
      uploadDisabled() {
        return this.files.length === 0;
      }
    },
    methods: {
      addFile(e) {
        let droppedFiles = e.dataTransfer.files;
        if(!droppedFiles) return;
        // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
        ([...droppedFiles]).forEach(f => {
          this.files.push(f);
        });
      },
      removeFile(file){
        this.files = this.files.filter(f => {
          return f !== file;
        });
      },
      uploadFile: function () {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + token);

        var formdata = new FormData();
        this.files.forEach(f => {
          formdata.append("file_type", "UC2");
          formdata.append("file", f);
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/uc2upload/", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
      }
    },
    data() {
      return {
        files: [],
        inputRules: [
          v => v || 'Minimum file name length is 3 characters'
        ]
      };
    }
  };
</script>

<style scoped>
  h1 {
    color: darkblue;
  }
</style>
