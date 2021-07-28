<template>
<transition name="fade">

  <div class="background-modal" v-if="open">
      <div class="modal" v-click-outside="modalDeactivate" v-on:keyup.enter="createGroup">
          <!-- TITULO -->
          <div class="modal-title">
              <h5>{{title}}</h5>
              <button class="button btn-close-modal" v-on:click="modalDeactivate"><i class="bi bi-x"></i></button>
          </div>
          <!-- CONTENIDO -->
          <div class="modal-content" v-if="loading">
                <Loader />
          </div>
          <div class="modal-content" v-else>

            <label for="group" class="label">Nombre del grupo</label>
            <input v-model="groupName" @input="groupName = $event.target.value.toUpperCase()" @keypress="changeInputName" autocomplete="off" type="text" 
            class="input input-modal" placeholder="Ejemplos: 1CM8, 2CV5, 3CM4, etc." name="group">

            <div class="message-container" v-if="nameAlert">
                <p class="message msg-danger"><i class="bi bi-exclamation-circle"></i> El nombre del grupo no puede estar en blanco.</p>
            </div>

            <div class="message-container" v-if="alertGroupExist">
                <p class="message msg-danger"><i class="bi bi-exclamation-circle"></i> Este grupo ya esta registrado.</p>
            </div>            

          </div>
          <!-- FOOTER/BOTONES -->
          <div class="modal-footer">
              <button class="button btn-modal btn-cancel" v-on:click="modalDeactivate">Cancelar</button>
              <button type="submit" class="button btn-modal btn-create" @click="createGroup">Crear</button>
          </div>
      </div>
  </div>

</transition>
</template>

<script>
import Loader from './LoaderSpinner.vue'

export default {
  name: 'ModalForm',
  components :{
      Loader,
  },
  props : {
    open : Boolean,
    title : String,
    content : String,
    careerName : String,
    alertGroupExist : Boolean,
    loading : Boolean,
  },
  data() {
    return {
    //   loading : false,
      clipboardPermissions : true,
      groupName : '',
      nameAlert : false,
    }
  },  
  watch: {
      open : function (val) {
          if(val == false){
              this.groupName = '';
              this.nameAlert = false;
          }
      }
  },
  methods : {
    modalDeactivate : function () {
        this.groupName = '';
        this.nameAlert = false;        
        this.$emit("modal-close");
    },
    linkFocus : function() {
      this.$refs.subjectUrl.focus();
    },
    paste : function(){
        navigator.clipboard.readText()
        .then(texto => {
            this.clipboardPermissions = true;
            this.link = texto;
            // console.log("Aquí tenemos el texto: ", texto);
        })
        .catch(error => {
            // Por si el usuario no da permiso u ocurre un error
            this.clipboardPermissions = false;
            console.log("Hubo un error, probablemente no se han dado los permisos necesarios al sitio para usar el portapapeles: ", error);
        });        
    },

    changeInputName : function () {
        if(this.groupName != ''){
            this.nameAlert = false;
        }
    },
    createGroup : function () {
        if(this.groupName != ''){
            this.$emit("create-group", this.groupName, this.careerName);
        }
        else{
            this.nameAlert = true;
        }
    }

  },

}
</script>

<style lang="css" scoped>

.background-modal{
    /* position: absolute; */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.background-modal .modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    

    z-index: 2;
    display: block;
    width: auto;
    min-height: 50px;
    height: auto;
    background: #fdfdfd;

    padding: 15px;
    border-radius: 5px;
    border: solid 1px #efefef;

    min-width: 40%;
}

.modal-title{
    text-align: left;
}
.modal-title h5{
    margin-right: 20px;
}
.btn-close-modal{
    border: 0;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 1.5rem;
    background: transparent;
    padding: 0 5px;
}

.modal-content{
    background: transparent;
    border: 1px solid #efefef;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
    padding: 5px 0;
    padding-bottom: 10px;
}

.modal-footer{
    border: 0;
    padding: 0;
    padding-top: 15px;
}

.input-modal{
    margin-bottom: 10px;
}
.input-modal:focus{
    border-color: #2c3e50;
}

.link-modal{
    display: flex;
}

.link-modal{
    transition: 0.5s;
    border: solid 1px #efefef;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.link-modal:focus-within{
    transition: 0.5s;
    border-color: #2c3e50;
}

.icon-link{
    border: 0;
    padding-right: 0;
    position: absolute;
    left: 0;
}
.link-modal .input-modal-link{
    border: 0;
    width: 100%;
    margin-left: 2rem;
    margin-right: 5rem;
}
.btn-paste-container{
    background: transparent;
    padding-right: 3px;
    position: absolute;
    right: 0;
}
.btn-paste-container .btn-pegar{
    padding: 4px 15px;
    background: #1768AC;
    color: azure;
}
.btn-paste-container .btn-pegar:hover{
    background: #2541B2;
}

.btn-cancel{
    background: #e8efff;
    border-color: #d0daf0;
    padding: 5px;
    margin: 0 4px;
    min-width: 5rem;
}
.btn-cancel:hover{
    background: #dee9ff;
}

.btn-create{
    margin: 0 4px;
    margin-left: 8px;
    min-width: 5rem;
}

@media only screen and (max-width: 769px) {
    .btn-paste-container, #message-paste{
        display: none;
    }
    .link-modal .input-modal-link{
        margin-right: 0;
    }
    .background-modal .modal{
        min-width: 90%;
    }
}

/* ANIMATIONS */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
    
