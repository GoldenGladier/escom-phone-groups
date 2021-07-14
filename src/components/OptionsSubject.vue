<template>
    <div class="subject-options-container">
        <button class="button btn-subject-options" v-on:click="handleOptions">
            <i class="bi bi-three-dots-vertical"></i>
        </button>
        <div class="subject-options" v-if="options" v-click-outside="handleOptions">
            <button class="item" v-clipboard:copy="link" v-clipboard:success="handleOptions"><i class="bi bi-files"></i> Copiar vínculo</button>
            <div class="item"><i class="bi bi-share"></i> Compartir vínculo</div>
            <div class="item"><i class="bi bi-pencil"></i> Editar materia</div>
            <div class="item"><i class="bi bi-eraser"></i> Eliminar materia</div>
            <!-- <div class="item">Option 5</div> -->
        </div>
    </div>
</template>

<script>

export default {
  name: 'ItemGroupList',
  props : {
    link : String,
  },
  data() {
    return {
      options : false,
    }
  },
  methods : {
    handleOptions : function() {
      if(this.options){
        this.options = false;
      }
      else{
        this.options = true;
      } 
    }
  }
}
</script>

<style lang="css" scoped>
.subject-options-container{
  position: relative;
}
.btn-subject-options{
    border: 0;
}
.subject-options{
  position: absolute;
  background: #fdfdfd;
  border-radius: 5px;
  border: solid 1px #efefef;

  left: 40px;
  top: 0;
  min-width: 10rem;
  overflow: hidden;
  text-align: left;
}
.subject-options .item{
  padding: 0 5px;
  width: 100% !important;
  
  background: transparent;
  border: 0;
  text-align: left;
}
.subject-options .item:hover{
  background: #a7d7ff;
}
</style>
    
