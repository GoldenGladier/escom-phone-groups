<template>
    <div class="contact" id="contactInformation">
      <h3>Desarrollo y contacto.</h3>
      <div class="block-contact">
        <div class="column column-profile-picture">
          <img class="profile-picture" src="../assets/profilePicture.png" alt="profile-picture">
        </div>
        <div class="column column-text">
          <div>
            <h5 class="name">Omar Aguirre Alvarez</h5>
            <p>Desarrollé este proyecto con el afán de poder ayudar a la comunidad de ESCOM a facilitar el contacto entre compañeros 
              de las mismas clases, espero que pueda cumplir con su objetivo. Si surge algún inconveniente con el sitio pueden 
              contactarme directamente a mi correo <span>omar.fi.wwr@gmail.com</span> . 
             </p>
          </div>

        </div>
      
        <div class="column contact-links">
          <div>
            Otros medios de contacto.
            <div class="social-media">
                <a href="//www.facebook.com/omar.aguirre.35110418" target="_blank" class="social-link facebook" title="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="//github.com/GoldenGladier" target="_blank" class="social-link github" title="Github"><i class="bi bi-github"></i></a>
                <a href="//www.linkedin.com/in/omar-aguirre-3a2327183/" class="social-link linkedin" target="_blank" title="Linkedin"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>

export default {
  name: 'ContactInformation',

}
</script>

<style lang="css" scoped>
/* Fuente  */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Fuggles&display=swap');

/* Modo de uso
font-family: 'Dancing Script', cursive;
font-family: 'Fuggles', cursive; 
*/

* {
  color: #2c3e50;
}

.block-contact{
  /* background: #fdfdfd;
  border-radius: 5px;
  border: 1px solid #efefef; */
  width: 70%;
  margin: auto;

  position: relative;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 1fr), 1fr));
  gap: 1em;
}

.column{
  display: flex;
  justify-content: center;
  align-items: center;
}

.column-profile-picture{
  grid-column: 1/2;
}
.profile-picture{
  border-radius: 50%;
  border: 2px solid #efefef;
  width: 100%;
}

.column-text{
  grid-column: 2/5;
}

.name{
  color: #03256C;
}
p{
  text-align: left;
}
p span{
  text-decoration: underline #03256C;
  color: #03256C;
}

.contact-links{
  grid-column: 5/6;
}

.social-link{
  padding: 5px;
  margin: 5px;
  font-size: 35pt;
  /* display: block; */
}
.social-link.facebook i{
  color: #3b5998;
}
.social-link.github i{
  color: #211F1F;
}
.social-link.linkedin i{
  color: #0e76a8;
}


@media only screen and (max-width: 1279px) {
  .column-profile-picture{
    grid-column: 1/3;
  }
  .profile-picture{
    width: 80%;
  }
  .column-text{
    grid-column: 3/5;
  }
}
@media only screen and (max-width: 769px) {
  .block-contact{
    width: 90%;
  }
  .profile-picture{
    width: 70%;
  }
  .column-profile-picture, .column-text, .contact-links{
    grid-column: initial;
  }
  .column-text div p{
    text-align: center;
  }

}
</style>
    
