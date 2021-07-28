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
            <label for="subject-name" class="label">Nombre de la materia</label>
            <input v-model="newName" autocomplete="off" type="text" class="input input-modal" 
            placeholder="Ejemplos: Diseño de Sistemas Digitales, Sistemas Operativos, Administración de Proyectos, etc." name="subject-name">

            <div class="message-container" v-if="nameAlert">
                <p class="message msg-danger"><i class="bi bi-exclamation-circle"></i> El nombre de la materia no puede estar vacio.</p>
            </div>
            <div class="message-container" v-if="alertSubjectExist">
                <p class="message msg-danger"><i class="bi bi-exclamation-circle"></i> La materia ya fue registrada para este grupo.</p>
            </div>        

            <label for="subject-url" class="label" id="label-subject-url">Link o enlace para unirse al grupo</label>
            <div class="link-modal" v-on:click="linkFocus">
              <div class="button icon-link" v-on:click="linkFocus">
                  <i class="bi bi-link-45deg"></i>
              </div>
              <input v-model="newLink" autocomplete="off" type="text" class="input input-modal-link" placeholder="Ejemplo: https://chat.whatsapp.com/Fj9kBy8ALfs1PBLwCAqkm8" 
              name="subject-url" id="subjectUrl" ref="subjectUrl"> 
              <div class="btn-paste-container">
                <button class="button btn-pegar" v-on:click="paste">Pegar</button>
              </div>
            </div>

            <div class="message-container" id="message-paste" v-if="linkAlert">
                <p class="message msg-danger"><i class="bi bi-exclamation-circle"></i> El link del grupo no puede estar vacio.</p>
            </div>
            <div class="message-container" v-if="!clipboardPermissions">
                <p class="message msg-alert"><i class="bi bi-exclamation-circle"></i> Debes permitir acceso al portapapeles para usar el botón.</p>
            </div>

          </div>
          <!-- FOOTER/BOTONES -->
          <div class="modal-footer">
              <button class="button btn-modal btn-cancel" v-on:click="modalDeactivate">Cancelar</button>
              <button class="button btn-modal btn-create" @click="updateSubject">Guardar</button>
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
    content : String,

    careerKey : String,
    groupName : String,
    name : String,
    link : String,
  },
  components : {
      Loader,
  },
  data() {
    return {
      clipboardPermissions : true,
      nameAlert : false,
      linkAlert : false,  
      alertSubjectExist : false,  
      newName : '', 
      newLink : '',
      loading : false,
    }
  },  
  watch: {
      name : function () {
        this.newName = this.name;
          if(this.name != ''){
            this.nameAlert = false;
          }
        // console.log('Name: ' + this.newName);
      },
      link : function () {
          if(this.link != '')
            this.linkAlert = false;
        this.newLink = this.link; 
        // console.log('Link: ' + this.newLink);
      },
      open : function (val) {
          if(val == false){
            this.nameAlert = false;
            this.alertSubjectExist = false;
            this.newName = this.name;
            this.newLink = this.link;
          }
      }
  },
  methods : {
    modalDeactivate : function () {
        this.$emit("modal-close");
        this.alertSubjectExist = false;
        this.loading = false;
    },
    linkFocus : function() {
      this.$refs.subjectUrl.focus();
    },
    paste : function(){
        navigator.clipboard.readText()
        .then(texto => {
            this.clipboardPermissions = true;
            this.newLink = texto;
            // console.log("Aquí tenemos el texto: ", texto);
        })
        .catch(error => {
            // Por si el usuario no da permiso u ocurre un error
            this.clipboardPermissions = false;
            console.log("Hubo un error, probablemente no se han dado los permisos necesarios al sitio para usar el portapapeles: ", error);
        });        
    },

    updateSubject : function(){
        this.alertSubjectExist = false;
        if(this.newName != '' && this.newLink != ''){
            // console.log('Actualizando...');
            var career = this.escom[this.careerKey];
            var indexSubject = -1, indexGroup = -1;
            var newGroup;
            if(!career.groups){
                career.groups = [];
                console.log("EDIT ERROR 01: No se encontraron grupos en " + career.name + " mientras se trataba de editar una materia.");
            }
            career.groups.forEach(group => { // Buscamos el grupo de la materia
                if(group.name == this.groupName){
                    newGroup = group;
                    indexGroup = career.groups.indexOf(newGroup);
                    if(!newGroup.subjects){
                        newGroup.subjects = [];
                        console.log("EDIT ERROR 02: No se encontraron materias en " + career.name + " - " + newGroup.name + " mientras se trataba de editar una materia.");
                    }
                    newGroup.subjects.forEach(subject => {
                        // console.log(subject.name + " - " + this.name);
                        if( (subject.name == this.newName) && (this.newName != this.name) ){ // Comprobamos que el nombre nuevo y el anterior sea distinto
                            this.alertSubjectExist = true;
                            // console.log("Nombre en uso");
                        }
                        else{
                            if(subject.name == this.name){
                                indexSubject = newGroup.subjects.indexOf(subject);
                                // console.log("Encontre el lugar a modificar: " + indexSubject);
                            }
                        }
                    });
                }
            });
            if(!this.alertSubjectExist){
                this.loading = true;
                var subject = career.groups[indexGroup].subjects[indexSubject];
                subject.name = this.newName;
                subject.linkSubject = this.newLink;
                db.ref('escomCareers/' + this.careerKey).set(career).then( () => {
                    console.log('¡Materia actualizada!');
                    this.modalDeactivate();
                } );  
            }
        }
        else{
            if(this.name == ''){
                this.nameAlert = true;
            }
            if(this.link == ''){
                this.linkAlert = true;
            }
        }
                            // newGroup.subjects.forEach(subject => {
                    //     console.log(subject.name + " - " + this.name);
                    //     if( (subject.name == this.name) && (!this.alertSubjectExist)){
                    //         console.log(subject.name + " - " + this.name);
                    //         this.loading = true;
                    //         subject.name = this.newName;
                    //         subject.linkSubject = this.newLink;
                    //         db.ref('escomCareers/' + this.careerKey).set(career).then( () => {
                    //             console.log('¡Materia actualizada!');
                    //             this.modalDeactivate();
                    //         } );                            
                    //     }
                    // });
    }

  },
  firebase : {
    escom : db.ref('escomCareers'),
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
/* .up-enter-active, .up-leave-active {
    transition: all 0.3s ease;
}

.up-enter, .up-leave-to {
    transform: translateY(100%);
} */

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
    
