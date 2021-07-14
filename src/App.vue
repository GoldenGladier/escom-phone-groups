<template>
  <div id="app">
    <CoverTop />
    <div class="container-list">
      <h2>Buscar</h2>
      <p>Busque el grupo o materia en la que está inscrito.</p>

      <div class="search">
        <input type="text" name="search-group" class="input search-group" placeholder="Ejemplo: 2CV15">
        <button class="button search-group"><i class="bi bi-search"></i></button>
      </div>
      <!-- <i class="bi bi-search"></i> -->
      <div class="container-list-grid">
        <ItemGroupList v-for="group in list" :key="group" :group="group" :subjects="['Mates', 'DSD', 'Analogica', 'Matematicas avanzadas para la ingenieria']"/>
      </div>
    </div>

    <footer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#03256C" fill-opacity="1" d="M0,320L40,309.3C80,299,160,277,240,250.7C320,224,400,192,480,170.7C560,149,640,139,720,165.3C800,192,880,256,960,245.3C1040,235,1120,149,1200,122.7C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
    </footer>
    
  </div>
</template>

<script>
import CoverTop from './components/CoverPage.vue'
import ItemGroupList from './components/ItemGroupList.vue'

export default {
  name: 'App',
  components: {
    CoverTop,
    ItemGroupList,
  },
  data() {
    return {
      list : ['omar', 'daniel', 'issac', 'etc'],
    }
  }

}
</script>

<style>
/* Bootstrap icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");

body{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.input{
  transition: 0.5s;
  outline: none;
  border: solid 1px #efefef;
  border-radius: 5px;
  background: #fdfdfd;

  padding: 8px 12px;
}
.button{
  transition: 0.5s;
  border: solid 1px #efefef;
  border-radius: 5px;
  background: #fdfdfd;

  padding: 8px 12px;
}

.search{
  display: flex;
  justify-content: center;
  align-items: center;
}
input.search-group{
  display: block;
  width: 35%;
  margin-bottom: 60px;

  border-right: 0;
  border-radius: 5px 0 0 5px;
}
button.search-group{
  display: block;
  margin-bottom: 60px;

  border-left: 0;
  border-radius: 0 5px 5px 0;
  color: #75758F;
}

input:focus{
  transition: 0.5s;
  border-color: #2c3e50;
}
input:focus ~ button.search-group{
  transition: 0.5s;
  border-color: #2c3e50;
  color: #2c3e50;
}

.container-list{
  width: 90%;
  margin: auto;
  /* background: tomato; */
}

.container-list-grid{
  /* background: tomato; */
  /* width: 90%;
  margin: auto;
  padding: 0; */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
  gap: 1em;
}


@media only screen and (max-width: 600px) {
  input.search-group{
    width: 100%;
  }
}
</style>
