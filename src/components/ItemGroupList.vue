<template>
  <div class="ItemGroupList">
      <div class="group-data" v-on:click="collapse">
        {{group}}
        <button class="btn-view-more">
          <i class="bi bi-caret-up" v-if="collapsed"></i>
          <i class="bi bi-caret-down" v-else></i>
        </button>
      </div>

      <div class="container-subjects" v-if="collapsed">
        <div v-if="subjects" class="subjects-list">
          <div class="item-subject-list" v-for="subject in subjects" :key="subject">

            <Options link='www.youtube.com' />
            <!-- <div class="subject-options-container">
              <button class="button btn-subject-options"><i class="bi bi-three-dots-vertical"></i></button>
              <div class="subject-options">
                <div class="item">Option 1</div>
                <div class="item">Option 2</div>
                <div class="item">Option 3</div>
                <div class="item">Option 4</div>
                <div class="item">Option 5</div>
              </div>
            </div> -->
            
            <!-- Subjects -->
            <div class="subject-name">
              {{subject}}
            </div>
            <div class="join-link">
              <a href="www.youtube.com" class="button join-group"><i class="bi bi-person-plus"></i> Unirse</a>
            </div>
            <!-- = = = = =  -->
          </div>
        </div>
        <h5 v-else>Aún no hay materias registradas para este grupo...</h5>
      </div>
  </div>
</template>

<script>
import Options from './OptionsSubject.vue'

export default {
  name: 'ItemGroupList',
  props : {
    group : String,
    subjects : Array,
  },
  data() {
    return {
      collapsed : false,
      // options : false,
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
    }
  },
  components : {
    Options,
  }
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
  /* background: rgba(37, 65, 178, 0.40); */
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
    
