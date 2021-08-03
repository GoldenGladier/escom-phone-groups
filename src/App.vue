<template>
  <div id="app" @keydown.esc="handleModalESC">
    <CoverTop />
    <div class="container-list" id="searchList">
      <!-- {{escom}} -->
      <h2>Buscar</h2>
      <p>Selecciona tu carrera y/o busca el grupo en el que estás inscrito.</p>


      <select name="selectCareer" class="input select-career" v-on:change="selectFilter" v-model="selectOption" title="Selecciona tu carrera">
        <option value="-1">Todas las carreras</option>
        <option v-for="carrera in escom" :key="carrera['.key']" :value="carrera.name">
          {{carrera.name}}
        </option>
      </select>

      <div class="search" title="Ingresa el nombre del grupo como aparece en tu horario">
        <input v-model="inputSearchGroup" @input="inputSearchGroup = $event.target.value.toUpperCase()" type="text" name="search-group" 
        class="input search-group" placeholder="Busqueda por grupo">
        <!-- Buscar grupo, ejemplos: 2CV15, 1CM8, 2CV6, etc." -->
        <button class="button search-group"><i class="bi bi-search"></i></button>
      </div>
    <!-- BUSQUEDA POR FILTRO (si existe) -->
    
    <div v-if="activeFilter">
      <div v-for="carrera in filter" :key="carrera['.key']">
        <transition name="bounce">
          <div v-if="carrera.active">

            <h3 class="career-name">{{carrera.name}}</h3>
            <div class="container-list-grid career-container" >
                <ItemGroupList v-for="group in carrera.groups" :key="group['.key']" :group="group" @modal-open='handleModal'
                  :subjects="group.subjects" :careerKey="carrera['.key']" :groupActive="group.active"
                  @create-subject="registerNewSubject" 
                  @modal-subject-edit="handleEditSubject" @modal-subject-delete="handleDeleteSubject" />

              <!-- New Group -->
              <button @click="handleModalGroup(carrera.name)" class="btn-create create-new-group"><i class="bi bi-clipboard-plus"></i> Nuevo grupo</button>
              <!-- = = = = =  -->
            </div>

          </div>
        </transition>
      </div>
    </div>
    
    <!-- MOSTRANDO TODOS LOS DATOS -->
    <transition name="bounce">
    <div v-if="!activeFilter && !loader">
      <div v-for="carrera in escom" :key="carrera['.key']">
        <h3 class="career-name">{{carrera.name}}</h3>
        <div class="container-list-grid career-container" >
          <ItemGroupList v-for="group in carrera.groups" :key="group['.key']" :group="group" @modal-open='handleModal'
            :subjects="group.subjects" :careerKey="carrera['.key']" :groupActive="true" :groupKey="carrera.groups.indexOf(group)"
            @modal-subject-edit="handleEditSubject" @modal-subject-delete="handleDeleteSubject" @modal-group-delete="handleDeleteGroup"/>

          <!-- New Group -->
          <button @click="handleModalGroup(carrera.name)" class="btn-create create-new-group"><i class="bi bi-clipboard-plus"></i> Nuevo grupo</button>
          <!-- = = = = =  -->

        </div>
      </div>
    </div>
    </transition>

    <Loader v-if="loader"/>

    </div>

    <Rules />

    <ContactInformation />
    
    <Modal :open='modalActive' :title="titleModal" :careerKey="careerKey" :groupName="groupName"  @modal-close='handleModal'
    @create-subject="registerNewSubject" :alertSubjectExist="alertSubjectExist" :loading="modalSubjectLoading"/>
    <ModalGroup :open='modalGroupActive' :title="titleModal" :careerName="careerName"  @modal-close='handleModalGroup' 
    @create-group="registerNewGroup" :alertGroupExist="alertGroupExist" :loading="modalGroupLoading"/>

    <ModalEditSubject :open="modalSubjectEditActive" :title="titleModal" :careerKey="careerKey" :groupName="groupName"  
    :name="subjectNameEdit" :link="subjectLinkEdit" @modal-close='handleEditSubject' />
    <!-- @create-subject="registerNewSubject" -->

    <ModalDeleteSubject :open="modalSubjectDeleteActive" :title="titleModal" :careerKey="careerKey" :groupName="groupName"  
    :subjectName="subjectName" @modal-close='handleDeleteSubject' />

    <ModalDeleteGroup :open="modalGroupDeleteActive" :title="titleModal" :careerKey="careerKey" :groupName="groupName"  
    :groupKey="groupKey" :escom="escom" @modal-close='handleDeleteGroup' />

    <Footer />

  </div>
</template>

<script>
// BD FIRESTORE
import {db} from './db.js'
// = = = = = = =
import CoverTop from './components/CoverPage.vue';
import ItemGroupList from './components/ItemGroupList.vue';
import Modal from './components/Modal.vue';
import ModalEditSubject from "./components/ModalEditSubject.vue";
import ModalDeleteSubject from "./components/ModalDeleteSubject.vue";
import ModalGroup from './components/ModalGroup.vue';
import Footer from './components/Footer.vue';
import Loader from "./components/LoaderSpinner.vue";
import Rules from "./components/Rules.vue";
import ContactInformation from "./components/ContactInformation.vue";
import ModalDeleteGroup from "./components/ModalDeleteGroup.vue";
// import func from 'vue-editor-bridge'

export default {
  name: 'App',
  components: {
    CoverTop,
    ItemGroupList,
    Modal,
    ModalEditSubject,
    ModalDeleteSubject,
    ModalGroup,
    ModalDeleteGroup,
    Footer,
    Loader,
    Rules,
    ContactInformation,
  },
  data() {
    return {
      list : ['omar', 'daniel', 'issac', 'etc'],
      // groups : [],
      escom : [],
      // newData : [],
      modalActive : false,
      modalGroupActive : false,
      titleModal : "",
      careerName : "",
      loader : true,

      // Filter
      selectOption : -1,
      filter : [],
      activeFilter : false,
      inputSearchGroup : '',

      // Modal Group
      modalGroupLoading : false,
      alertGroupExist : false,

      // Modal Subject
      modalSubjectLoading : false,
      alertSubjectExist : false,
      careerKey : '',
      groupName : '',
      // Edit
      modalSubjectEditActive : false,
      subjectNameEdit : '',
      subjectLinkEdit : '',
      // Delete
      modalSubjectDeleteActive : false,
      subjectName : '',

      // Delete Group
      modalGroupDeleteActive : false,
      groupKey : -1,
    }
  },
  watch : {
    inputSearchGroup : function () {
      this.selectFilter();
    },
    escom : function (value) {
      if(value.length === 0){
        // console.log("CARGANDO DATOS...");
        this.loader = true;
      }
      else{
        // console.log("DONE...");
        // PARA PRUEBAS DE DATOS
        // this.escom.forEach(career => {
        //   console.log(career.name);
        // });
        this.loader = false;
      }
      this.selectFilter();
    },
    selectOption : function(value){
      localStorage.selectOptionFilterByCareer = value;
    }
  },
  mounted() {
    if (localStorage.selectOptionFilterByCareer) {
      this.selectOption = localStorage.selectOptionFilterByCareer;
    }
  },
  firebase : {
    // groups : db.ref('groups'),
    escom : db.ref('escomCareers'),
  },
  methods : {
      inputFilter : function () {
        if(this.inputSearchGroup != ''){ // Comprobamos que el input no este vacio
          this.filter.forEach(career => {
            if(career.groups){
              career.groups.forEach(group => {
                if(this.inputSearchGroup == group.name.substring(0, this.inputSearchGroup.length)){
                  group.active = true;
                }
                else{
                  group.active = false;
                }
              });
            }
          });
          this.activeFilter = true;
        }
      },
      selectFilter : function (){
        this.filter = this.escom;
        // console.log(this.selectOption);
        if(this.selectOption != -1){
          this.filter.forEach(career => {
            if(career.name == this.selectOption){
              if(career.groups){
                career.groups.forEach(group => {
                  group.active = true;
                });
              }
              career.active = true;
            }
            else{
              career.active = false; 
            }
          });
          this.activeFilter = true;
        }
        else{ // Cuando selecciona todas las carreras
          this.filter.forEach(career => {
              career.active = true; // Activa todas
          });
          this.activeFilter = false;
        }
        this.inputFilter();
      },

      handleModal : function(careerKey, groupName) {
        if(this.modalActive){
          this.modalActive = false;
          this.modalSubjectLoading = false;
          document.documentElement.style.overflow = 'initial';
        }
        else{
          this.alertSubjectExist = false;
          this.titleModal = "Nueva materia para " + groupName; 
          this.careerKey = careerKey;
          this.groupName = groupName;
          this.modalActive = true;
          document.documentElement.style.overflow = 'hidden';
        } 
        // console.log("Escuchado");
      },
      handleEditSubject : function(careerKey, groupName, subjectName, subjectLink) {
        // console.log("Escuchado" + subjectName);
        if(this.modalSubjectEditActive){
          this.modalSubjectEditActive = false;
          this.modalSubjectLoading = false;
          document.documentElement.style.overflow = 'initial';
        }
        else{
          this.alertSubjectExist = false;
          this.titleModal = "Editar " + subjectName + " de " + groupName; 
          this.careerKey = careerKey;
          // console.log('Career key: '+this.careerKey);
          this.groupName = groupName;
          this.subjectNameEdit = subjectName;
          this.subjectLinkEdit = subjectLink;
          this.modalSubjectEditActive = true;
          document.documentElement.style.overflow = 'hidden';
        } 
      },
      handleDeleteSubject : function(careerKey, groupName, subjectName) {
        // console.log("Escuchado" + subjectName);
        if(this.modalSubjectDeleteActive){
          this.modalSubjectDeleteActive = false;
          document.documentElement.style.overflow = 'initial';
        }
        else{
          this.titleModal = "Eliminar Materia"; 
          this.careerKey = careerKey;
          // console.log('Career key: '+this.careerKey);
          this.groupName = groupName;
          this.subjectName = subjectName;
          this.modalSubjectDeleteActive = true;
          document.documentElement.style.overflow = 'hidden';
        } 
      },
      handleDeleteGroup : function(careerKey, groupKey) {
        // console.log("Escuchado" + subjectName);
        if(this.modalGroupDeleteActive){
          this.modalGroupDeleteActive = false;
          document.documentElement.style.overflow = 'initial';
        }
        else{
          this.titleModal = "Eliminar Grupo"; 
          this.careerKey = careerKey;
          // console.log('Career key: '+this.careerKey);
          // this.groupName = groupName;
          this.groupKey = groupKey;
          this.modalGroupDeleteActive = true;
          document.documentElement.style.overflow = 'hidden';
        } 
      },
      handleModalGroup : function(careerName) {
        if(this.modalGroupActive){
          this.modalGroupActive = false;
          this.modalGroupLoading = false;
          document.documentElement.style.overflow = 'initial';
        }
        else{
          this.alertGroupExist = false;
          this.titleModal = "Nuevo grupo para " + careerName;
          this.careerName = careerName;
          this.modalGroupActive = true;
          document.documentElement.style.overflow = 'hidden';
        } 
        // console.log("Escuchado");
      },
      handleModalESC : function(){
        if(this.modalGroupActive || this.modalActive || this.modalSubjectEditActive || this.modalSubjectDeleteActive || this.modalGroupDeleteActive){
          this.modalActive = false;
          this.modalGroupActive = false;
          this.modalSubjectEditActive = false;
          this.modalSubjectDeleteActive = false;
          this.modalGroupDeleteActive = false;
          document.documentElement.style.overflow = 'initial';
        }
      },

      registerNewGroup : function (groupName, careerName) {
        var groupFound = false;
        var careerKey = '';
        // var groups = [];
        var newCareer = [];
        var arrayGroupsNames = [];
        this.escom.forEach(carrera => {
          if(carrera.name == careerName){
            careerKey = carrera['.key'];
            newCareer = carrera;
            // Revisamos si existen grupos
            if(carrera.groups){
              carrera.groups.forEach(group => {
                arrayGroupsNames.push(group.name); // Llenando array con solo nombres de los grupos
                if(group.name == groupName){
                  groupFound = true;
                }
              });
            }
            else{
              newCareer.groups = [];
              groupFound = false;
            }

          }
        });

        if(!groupFound){ 
          arrayGroupsNames.push(groupName); // Metemos el nombre al array
          arrayGroupsNames.sort(); // Ordenamos alfabeticamente
          console.log(arrayGroupsNames);
          var newIndex = arrayGroupsNames.indexOf(groupName); // Definimos el indice del nuevo grupo (ordenado alfabeticamente)
          // console.log('Indice nuevo: ' + arrayGroupsNames.indexOf(groupName));
          this.alertGroupExist = false;
          this.modalGroupLoading = true; // <-- Activate the loader
          // console.log("REGISTRANDO...");
          var newGroup = new Object();
          newGroup.name = groupName;
          newGroup.active = true;
          // newCareer.groups.push(newGroup);

          newCareer.groups.splice(newIndex, 0, newGroup); // Insertamos el grupo en el indice adecuando, sobreescribiendo cero elementos
          db.ref('escomCareers/' + careerKey).set(newCareer).then( () => {
            console.log('¡Grupo creado!');
            this.handleModalGroup();
          } );

        }
        else{
          this.alertGroupExist = true;
        }
      },

      registerNewSubject : function (careerKey, groupName, subjectName, link) {
        // console.log("Peticion recibida.")
        var subjectFound = false;
        var newGroup = [];
        var indexGroup = '';

        this.escom.forEach(carrera => {
          if(carrera['.key'] == careerKey){
            carrera.groups.forEach(group => {
              if(group.name == groupName){
                newGroup = group;
                indexGroup = carrera.groups.indexOf(group);
                // Revisamos si existen materias
                if(group.subjects){
                  group.subjects.forEach(subject => {
                    if(subject.name == subjectName){
                      subjectFound = true;
                    }
                  });
                }
                else{
                  newGroup.subjects = [];
                  subjectFound = false;
                }
              }
            });
          }
        });

        if(!subjectFound){ 
          this.alertSubjectExist = false;
          this.modalSubjectLoading = true; // <-- Activate the loader
          // console.log("REGISTRANDO MATERIA...");

          var newSubject = new Object();
          newSubject.name = subjectName;
          newSubject.linkSubject = link;

          newGroup.subjects.push(newSubject);
          newGroup.active = true;
          db.ref('escomCareers/' + careerKey + '/groups/' + indexGroup).set(newGroup).then( () => {
            console.log('¡Materia creada!');
            this.handleModal();
          } );
        }
        else{
          this.alertSubjectExist = true;
        }
      },


  },

}
</script>

<style>
/* Bootstrap icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");

/* Fuente */
/* USO: font-family: 'Open Sans Condensed', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&display=swap');

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

body, *{
  margin: 0;
  padding: 0;
  /* background: #efefef; */
}
svg, img{
  vertical-align: middle;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.create-new-group{
  padding: 7px 11px !important;
  margin: 0 !important;
  border: dashed 2px #66DE93;
  border: solid 1px #66DE93;
  border-radius: 5px;
  background: rgba(102, 222, 147, 0.1);

  position: relative;
  outline: none;
}

.label{
  text-align: left;
  margin-left: 5px;
  margin-bottom: 3px;
  /* font-family: 'Open Sans Condensed', sans-serif; */
  /* font-size: 17pt; */
}
.input{
  transition: 0.5s;
  outline: none;
  border: solid 1px #efefef;
  border-radius: 5px;
  background: #fdfdfd;
  color: #8f8f8f;
  padding: 8px 12px;
}
.input:focus{
  color: #2c3e50;
}
.button{
  transition: 0.5s;
  border: solid 1px #efefef;
  border-radius: 5px;
  background: #fdfdfd;

  padding: 8px 12px;
  outline: none;
}


.message-container{
  width: 90%;
  margin: auto;
  margin-top: 2px;
  margin-bottom: 5px;
}
.message{
  text-align: left;
  padding: 5px auto;
  margin: auto;
} 
.msg-alert{
  color: #E5D549;
}
.msg-danger{
  color: #BF1363;
}


.select-career{
  margin-top: 1em;
  margin-bottom: 1em;
  width: 35%;
  height: 42px;
  color: #8f8f8f;
}
.select-career:focus{
  color: #2c3e50;
  border-color: #2c3e50;
}

.search{
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  margin: auto;
  margin-bottom: 60px;
  border: solid 1px #efefef;
  border-radius: 5px;
  height: 42px;
}
.search:focus-within{
  transition: 0.5s;
  border-color: #2c3e50;
}
input.search-group{
  display: block;
  width: 100%;
  border-right: 0;
  border-radius: 5px 0 0 5px;
  border: 0;
}
button.search-group{
  display: block;
  border-left: 0;
  border-radius: 0 5px 5px 0;
  border: 0;
  color: #75758F;
}

.container-list{
  width: 90%;
  margin: auto;
}

.container-list-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
  gap: 1em;
}

.career-name{
  font-size: 15pt;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-top: 2rem;
  border-top: solid 1px #efefef;
}

@media only screen and (max-width: 600px) {
  .select-career, .search{
    width: 100%;
  }
}


/* BOTONES */
.btn-create{
  margin-top: 8px;
  border-color: #66DE93;
  /* background: #66DE93; */
  background: rgba(102, 222, 147, 0.1 );
  padding: 4px;
}
.btn-create:hover{
  background: rgba(102, 222, 147, 0.3);
}

.btn-delete{
  border-color: rgba(191, 19, 99, 0.6);
  background: rgba(191, 19, 99, 0.1);
  color: #38081f;
  /* padding: 5px;
  margin: 0 4px; */
}
.btn-delete:hover{
  background: rgba(191, 19, 99, 0.15);
  border-color: rgba(191, 19, 99, 0.6);
  color: #38081f;
}
</style>
