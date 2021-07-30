<template>
    <div class="rules" id="rulesList">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fill-opacity="1" d="M0,96L40,106.7C80,117,160,139,240,122.7C320,107,400,53,480,53.3C560,53,640,107,720,133.3C800,160,880,160,960,138.7C1040,117,1120,75,1200,101.3C1280,128,1360,224,1400,272L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>

        <div class="rules-container">
            <h3>Reglas</h3>
            <ul>
                <li>No borrar una materia creada por alguien más.</li>
                <li>No editar una materia creada por alguien más almenos que no se haya creado correctamente.</li>
                <li>Registrar grupos y materias con el nombre que aparece en el horario para que el resto de compañeros encuentren sus grupos rápidamente
                </li>
                <li>Registrar unicamente grupos y materias escolares, evitar en todo momento registrar grupos no relacionados con la escuela y las clases.</li>
            </ul>
        </div>
        <div class="handbook-container" id="handbookList">
            <h3>Manual</h3>
            <h5>Registrar un grupo</h5>
            <div class="handbook-block">
                <!-- <img src="../assets/btn-create-group.png" alt=""> -->
                <p>En la sección de tu carrera usa el botón "Nuevo grupo", ubicado al final de la sección (debajo de todos los grupos registrados).</p>
            </div>
            <div class="handbook-block">
                <!-- <img src="../assets/btn-create-group.png" alt=""> -->
                <p>Luego registra el nombre del grupo en el formulario desplegado. Nota: No se admiten nombres iguales a los de otros grupos registrados en la misma carrera.</p>
            </div>        
            <h5>Registrar una materia</h5>
            <h5>Editar una materia</h5>
            <h5>Eliminar una materia</h5>
            <h5>Unirme a una grupo</h5>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fill-opacity="1" d="M0,64L40,53.3C80,43,160,21,240,32C320,43,400,85,480,90.7C560,96,640,64,720,96C800,128,880,224,960,256C1040,288,1120,256,1200,245.3C1280,235,1360,245,1400,250.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
    </div>
</template>

<script>

export default {
  name: 'Rules',
  data() {
    return {
    }
  },  
}
</script>

<style lang="css" scoped>
.rules{
    color: #fff;
    background: #03256C;
}

ul{
    text-align: left;
    width: 80%;
    margin: auto;
}

.handbook-container{
    width: 90%;
    margin: auto;    
    margin-top: 30px;

    /* border-top: solid 1px #fff; */
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
    
