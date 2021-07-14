<template>
  <header id="navbar">
      <div class="title-container">
          <i class="bi bi-hexagon-half"></i>
          Escroups
      </div>
      <ul>
          <li><a href="">Link 1</a></li>
          <li><a href="">Link 2</a></li>
          <li><a href="">Link 3</a></li>
      </ul>
  </header>
</template>

<script>

export default {
  name: 'NavBar',

}
</script>

<style lang="css" scoped>
*{
    color: #fff;
}

header{
    display: flex;
}
.title-container{
    min-width: 20%;
    display: block;
    margin: 0;
    padding: 5px;
    padding-left: 20px;
    text-align: left;
    font-weight: bold;
    /* color: #2940D3; */
}
.title-container i{
    /* color: #E5D549; */
}

ul{
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
    margin: 5px 10px;
    color: #fff;
}
</style>
    
