<template>
    <footer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#03256C" fill-opacity="1" d="M0,320L40,309.3C80,299,160,277,240,250.7C320,224,400,192,480,170.7C560,149,640,139,720,165.3C800,192,880,256,960,245.3C1040,235,1120,149,1200,122.7C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        <div class="footer-container">
            Copiryght © 2021. Todos los derechos reservados.
            <p>
                Proyecto desarrollado por 
                <span>Omar Aguirre Alvarez.</span>
            </p>
            
        </div>
    </footer>
</template>

<script>

export default {
  name: 'Footer',

}
</script>

<style lang="css" scoped>
/* Fuente  */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Fuggles&display=swap');

/* Modo de uso
font-family: 'Dancing Script', cursive;
font-family: 'Fuggles', cursive; 
*/

.footer-container{
    background: #03256C;
    color: azure;
    padding: 10px;
    padding-bottom: 20px;
}

.footer-container p span{
    /* font-family: 'Dancing Script', cursive; */
    font-family: 'Fuggles', cursive; 
    font-size: 25pt;
    display: inline-block;
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
</style>
    
