<template>
<transition name="bounce">
  <div class="ItemGroupList" v-if="groupActive">
      <div class="group-data" v-on:click="collapse">
        <!-- <OptionsGroup /> -->
        {{group.name}}
        <button class="btn-view-more">
          <i class="bi bi-caret-up" v-if="collapsed"></i>
          <i class="bi bi-caret-down" v-else></i>
        </button>
      </div>

      <div class="container-subjects" v-if="collapsed">
        <div v-if="subjects" class="subjects-list">
          <div class="item-subject-list" v-for="subject in subjects" :key="subject['.key']">

            <OptionsSubject :link="subject.linkSubject" @modal-subject-edit="handleEditSubject(subject.name, subject.linkSubject)"
             @modal-subject-delete="handleDeleteSubject(subject.name)" />
            
            <!-- Subjects -->
            <div class="subject-name">
              {{subject.name}}
            </div>
            <div class="join-link">
              <a :href="subject.linkSubject" target="_blank" class="button join-group"><i class="bi bi-person-plus"></i> Unirse</a>
              <!-- <a :href="'//' + subject.linkSubject" target="_blank" class="button join-group"><i class="bi bi-person-plus"></i> Unirse</a> -->
            </div>
            <!-- = = = = =  -->
          </div>

          <div class="item-subject-list">
              <button class="button btn-create" v-on:click="modalActivate(group.name)"><i class="bi bi-journal-plus"></i> Crear nueva materia</button>
          </div> 
        </div>

        <div v-else class="subjects-list subjects-none">

            <div class="item-subject-list message">
              <i class="bi bi-info-circle"></i> Aún no hay materias registradas para este grupo...
            </div> 
            <div class="item-subject-list">
              <button class="button btn-create" v-on:click="modalActivate(group.name)"><i class="bi bi-journal-plus"></i> Crear nueva materia</button>
            </div> 

        </div>

      </div>
  </div>
</transition>
</template>

<script>
import OptionsSubject from './OptionsSubject.vue'

export default {
  name: 'ItemGroupList',
  components : {
    OptionsSubject,
  },
  props : {
    group : [],
    // groupKey : String,
    subjects : Array,
    careerKey : String,
    groupActive : Boolean,
  },
  data() {
    return {
      collapsed : false,
    }
  },
  methods : {
    collapse : function(){
      if(this.collapsed){
        this.collapsed = false;
      }
      else{
        this.collapsed = true;
      }
    },
    options : function() {
      if(this.options){
        this.options = false;
      }
      else{
        this.options = true;
      } 
    },
    modalActivate : function(groupName) {
      this.$emit("modal-open", this.careerKey, groupName);
      // console.log("Click");
    },
    handleEditSubject : function (subjectName, Subjectlink){ // Abre el modal para editar materia
      // console.log("EDIT 02" + Subjectlink);
      this.$emit("modal-subject-edit", this.careerKey, this.group.name, subjectName, Subjectlink);
    },
    handleDeleteSubject : function (subjectName){ // Abre el modal para Eliminar la materia
      this.$emit("modal-subject-delete", this.careerKey, this.group.name, subjectName);
    },
  },
}
</script>

<style lang="css" scoped>
*{
    color: #232323;
}

.ItemGroupList{
  padding: 8px 12px;
  margin: 0;
  border: solid 1px #efefef;
  border-radius: 5px;
  background: #fdfdfd;

  position: relative;
  align-self: start;
}
.group-data{
  cursor: pointer;
}

.btn-view-more{
  background: transparent;
  border: 0;
  position: absolute;
  right: 12px;
}

.btn-subject-options{
  border: 0;
}

.container-subjects{
  padding-top: 8px;
}

.subjects-list{
  width: 100%;
  cursor: initial;
}

.item-subject-list{
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 1px #efefef;
}

.subjects-none .item-subject-list.message{
  padding: 10px;
}
.subjects-none .item-subject-list.message i{
  margin-right: 0.3rem;
}

.subject-name{
  width: 60%;
  /* background: tomato; */
}

.join-link{
  /* background: purple; */
  width: 30%;
}
.join-group{
  display: block;
  padding: 5px;
  margin: 5px;
  width: auto;
  text-decoration: none;
  color: azure;

  border-color: #1768AC;
  background: #1768AC;
  /* background: rgba(23, 104, 172, 0.3); */
}
.join-group:hover{
  transition: 0.5s;
  border-color: #2541B2;
  background: #2541B2;
}
.join-group i{
  color: azure;
}

.subject-options-container{
  position: relative;
}
.subject-options{
  position: absolute;
  background: #fdfdfd;
  border-radius: 5px;
  border: solid 1px #efefef;

  left: 40px;
  top: 0;
  min-width: 150px;
  overflow: hidden;
}
.subject-options .item{
  padding: 0 5px;
  /* margin: 3px 0; */
  /* background: tomato; */
}
.subject-options .item:hover{
  background: #a7d7ff;
}
</style>
    
