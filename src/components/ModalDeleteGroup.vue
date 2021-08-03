<template>
<transition name="fade">

  <div class="background-modal" v-if="open">
      <div class="modal" v-click-outside="modalDeactivate" v-on:keyup.enter="updateSubject">
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
              ¿Estas seguro de que deseas eliminar el grupo "{{groupName}}"?
          </div>


          <!-- FOOTER/BOTONES -->
          <div class="modal-footer">
              <button class="button btn-modal btn-cancel" v-on:click="modalDeactivate">Cancelar</button>
              <button class="button btn-modal btn-delete" @click="deleteGroup">Eliminar</button>
          </div>
      </div>
  </div>

</transition>
</template>

<script>
// BD FIRESTORE
import {db} from '../db.js'
// = = = = = = =
import Loader from "./LoaderSpinner.vue";

export default {
  name: 'ModalForm',
  props : {
    open : Boolean,
    title : String,
    
    careerKey : String,
    // groupName : String,
    groupKey : Number,
    escom : [],
  },
  components : {
      Loader,
  },
  data() {
    return {
      loading : false,
      groupName : 'NINGUNO',
    }
  },  
//   mounted() {
//       if(this.escom && this.open){

//       }
//   },
  watch : {
      open : function(value){
          if(value){
            this.groupName = this.escom[this.careerKey].groups[this.groupKey].name;
            // console.log(this.groupName);
          }
      }
  },
  methods : {
    modalDeactivate : function () {
        this.$emit("modal-close");
        this.loading = false;
    },

    deleteGroup : function(){
        console.log("Borrando grupo...");
        this.loading = true;
        var career = this.escom[this.careerKey];
        career.groups.splice(this.groupKey, 1);

        db.ref('escomCareers/' + this.careerKey).set(career).then( () => {
            console.log('¡Grupo eliminado!');
            this.modalDeactivate();
        } );          
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
    text-align: center;
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

.input-modal:focus{
    border-color: #2c3e50;
}

#label-subject-url{
    margin-top: 10px;
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

.btn-modal{
    padding: 5px;
    margin: 0 4px;
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
    
