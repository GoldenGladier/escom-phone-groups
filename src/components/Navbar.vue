<template>
  <header id="navbar">
      <div class="title-container">
          <i class="bi bi-hexagon-half"></i>
          Escom Groups
      </div>
      <ul class="nav-items">
          <li class="nav-item"><a href="#searchList"><i class="bi bi-search"></i> Buscar</a></li>
          <li class="nav-item"><a href="#rulesList"><i class="bi bi-bookmark-star"></i> Reglas</a></li>
          <li class="nav-item"><a href="#handbookList"><i class="bi bi-book"></i> Manual</a></li>
          <li class="nav-item"><a href="#contactInformation"><i class="bi bi-envelope"></i> Contacto</a></li>
      </ul>
      <button class="button btn-list-menu" @click="openMenu">
        <i class="bi bi-list"></i>
        <!-- <i class="bi bi-x" v-else></i> -->
      </button>
      <transition name="bounce">
      <div class="responsive-nav" v-if="open">
          <div class="panel-items" v-click-outside="openMenu">
          <button class="button btn-list-menu close" @click="openMenu" >
            <i class="bi bi-x"></i>
          </button>
            <div class="responsive-items">
                <a class="nav-item" href="#searchList" @click="openMenu"><i class="bi bi-search"></i> Buscar</a>
                <a class="nav-item" href="#rulesList"><i class="bi bi-bookmark-star"></i> Reglas</a>
                <a class="nav-item" href="#handbookList"><i class="bi bi-book"></i> Manual</a>
                <a class="nav-item" href="#contactInformation"><i class="bi bi-envelope"></i> Contacto</a>
            </div>
          </div>
      </div>    
      </transition>  
  </header>
</template>

<script>

export default {
  name: 'NavBar',
  data() {
    return {
      open : false,
    }
  },  
  methods : {
    openMenu : function() {
        this.open = !this.open;
    },
  },
  watch : {
      open : function(value){
          if(value){
            document.documentElement.style.overflow = 'hidden';
          }
          else{
            document.documentElement.style.overflow = 'initial';
          }
      }
  }
}
</script>

<style lang="css" scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Fuggles&display=swap'); */
/* USO
font-family: 'Dancing Script', cursive;
font-family: 'Fuggles', cursive; */

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    transform: translateY(100%);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
    transform: translateY(0%);
  }
}


*{
    color: #fff;
}

header{
    display: flex;
}
.title-container{
    min-width: 20%;
    display: block;
    margin: 5px;
    margin-left: 0;
    padding: 5px;
    padding-left: 20px;
    text-align: left;
    font-weight: bold;
    /* color: #2940D3; */
    /* font-family: 'Dancing Script', cursive; */
}

ul.nav-items{
    margin: 0;
    padding: 0;
    widows: auto;
    /* min-width: 50%; */
    position: absolute;
    right: 0;
    padding-right: 20px;
}

ul li{
    display: inline-block;
    margin: 5px;
    margin-top: 10px;
    color: #fff;
}
.nav-item a{
    transition: 0.5s;
    text-decoration: none;
    padding: 5px;
    border: solid 1px transparent;
    border-radius: 5px;
}
.nav-item a:hover{
    transition: 0.5s;
    border: solid 1px azure;
    color: azure;
}

.btn-list-menu{
    background: transparent;
    border: 0;
    color: azure;
    font-size: 18pt;
    display: none;

    padding-right: 20px;
    position: absolute;
    right: 0;
    z-index: 2;
}
.btn-list-menu.close{
  z-index: 3;
  /* background: tomato; */
  top: 0;
}
.btn-list-menu.close i{
  color: #2c3e50;
}

.responsive-nav{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    height: 120vh;
    width: 100vw;
    z-index: 2;
}
.panel-items{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    padding-bottom: 20vh;
    margin: 0;
    height: 80%;
    width: 100%;
    border-radius: 10px 10px 0 0;
    background: #fff;

    position: absolute;
    bottom: 0;
}

.responsive-nav .panel-items .responsive-items .nav-item{
    display: block;
    /* margin: 10px; */
    padding: 10px;
    width: 100vw;
    background: transparent;
}
.responsive-nav .panel-items .responsive-items .nav-item{
    color: #2c3e50;
    text-decoration: none;
    font-size: 16pt;
}
.responsive-nav .panel-items .responsive-items .nav-item i{
    color: #2c3e50;
}
.responsive-nav .panel-items .responsive-items .nav-item:hover{
    background: #2964e460;
    border: 0;
}

@media only screen and (max-width: 480px) {
  .btn-list-menu{
    display: block;
  }
  .nav-items{
    display: none;
  }
}

</style>
    
