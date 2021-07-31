<template>
    <div class="rules" id="rulesList">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fill-opacity="1" d="M0,96L40,106.7C80,117,160,139,240,122.7C320,107,400,53,480,53.3C560,53,640,107,720,133.3C800,160,880,160,960,138.7C1040,117,1120,75,1200,101.3C1280,128,1360,224,1400,272L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>
        <!-- Reglas -->
        <div class="rules-container">
            <h3>Reglas</h3>
            <p>El conjunto de reglas que a continuación se presentan son para que el sitio sea perfectamente funcional para toda la comunidad de ESCOM, por favor respeta las reglas en todo momento.</p>
            <ul>
                <li>No borrar o editar una materia creada por alguien más al menos que no se haya nombrado correctamente o el link del grupo este caído.</li>
                <li>Registrar grupos y materias con el nombre que aparece en el horario para que el resto de compañeros encuentren sus grupos rápidamente.</li>
                <li>Registrar únicamente grupos y materias escolares, evitar en todo momento registrar grupos no relacionados con la escuela y las clases.</li>
            </ul>
        </div>
        <!-- Manual -->
        <div class="handbook-container" id="handbookList">
            <h3>Manual</h3>
            <h5>Registrar un grupo</h5>
            <div class="handbook-block">
                <p>En la sección de tu respectiva carrera usa el botón "Nuevo grupo", ubicado al final de la sección (debajo de todos los grupos registrados).</p>
                <img class="img-btn" src="../assets/btn-new-group.png" alt="btn-new-group.png">
            </div>
            <div class="handbook-block">
                <p>Luego registra el nombre del grupo en el formulario desplegado. 
                  <span class="msg-alert">Nota: No se admiten nombres de grupos iguales dentro de la misma carrera.</span></p>
                <img class="img-btn" src="../assets/modal-new-group.png" alt="modal-new-group">
            </div>  

            <h5>Registrar una materia</h5>
            <div class="handbook-block">
                <p>Encuentra el grupo en el cual quieres registrar la materia, luego da clic en el botón "Crear nueva materia", ubicado debajo de todas las materias del grupo.</p>
                <img class="img-btn-small" src="../assets/btn-new-subject.png" alt="btn-new-subject">
            </div>  
            <div class="handbook-block">
                <p>
                  Esto desplegará el siguiente formulario, en el primer campo debes ingresar el nombre de la materia (tal como aparece en tu horario). 
                  <span class="msg-alert">Nota: No se admiten nombres de materias iguales dentro del mismo grupo</span>.

                  En el siguiente campo ingresa el vínculo para unirse al grupo. La página trabaja perfectamente con links de Whatsapp y Telegram, pero no fue probada con otras redes sociales. 
                  <span class="msg-alert">Nota: Si vas a utilizar otra red social asegúrate de que el link comience con "https://" y luego de registrar la materia prueba el botón "Unirse" para asegurarte de que todo esté bien.</span>
                </p>
                <img class="img-btn" src="../assets/modal-new-subject.png" alt="modal-new-subject">
            </div> 
            <div class="handbook-block" id="handbook-paste">
              <p>Para utilizar el botón de pegar debes conceder permisos al sitio desde tu navegador, normalmente deberías ver una ventana similar a esta, deberás dar clic en "Allow/Permitir". Si no quieres conceder los permisos un simple "Ctrl + v" debería ser suficiente para ti.</p>
              <img src="../assets/msg-chrome.png" alt="option-subject">
            </div>  

            <h5>Opciones extras de las materias</h5>
            <div class="handbook-block">
              <p>Todas las materias cuentan con acciones o controles extras, para acceder a ellas debes hacer clic en el botón de opciones (<i class="bi bi-three-dots-vertical"></i>) ubicado al costado izquierdo de la materia. Al dar clic se desplegarán tres opciones extras.</p>
              <img src="../assets/options-subject.png" alt="option-subject">
            </div>  

            <div class="handbook-block sub">
              <h6>1. Copiar vínculo. </h6>
              <p>Esta opción permite copiar el vínculo del grupo de la respectiva materia directamente al portapapeles, de este modo puedes compartir el vínculo con otros compañeros de clases.</p>
              <h6>2. Editar materia. </h6>
              <p>Esta opción despliega el mismo formulario con el que las materias son creadas y funciona exactamente con las mismas reglas. La opción fue diseñada para hacer cambios si es que te equivocaste al crear la materia, es importante que si la materia no fue creada por ti, evites en todo momento modificarla por respeto al resto de compañeros, al menos que la materia se haya registrado con un nombre incorrecto o el link este caído.</p>
              <h6>3. Eliminar materia. </h6>
              <p>Esta opción despliega una única confirmación sobre la eliminación de la materia, una vez confirmada la materia será eliminada inmediatamente y los datos no se podrán recuperar después de esto. Por favor evita en todo momento eliminar materias registradas por alguien más.</p>
            </div>  
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

.rules-container{
  width: 80%;
  margin: auto;
}

.rules-container p{
  text-align: left;
}

h3{
  font-weight: bold;
}

.rules-container ul{
    text-align: left;
    width: 95%;
    margin: auto;
}

.handbook-container{
    width: 80%;
    margin: auto;    
    margin-top: 30px;
}

.handbook-container h5{
  text-align: left;
  font-weight: bold;
  margin-top: 10px;
}
.handbook-container h6{
  font-weight: bold;
}

.handbook-block *{
  text-align: left;
}
.handbook-block.sub{
  width: 80%;
  margin: auto;
}
.handbook-block img{
  max-width: 100%;
}

.img-btn{
  width: 40%;
}
.img-btn-small{
  width: 18%;
}

@media only screen and (max-width: 768px) {
  .handbook-block img{
    width: 100% !important;
  }
  .handbook-block .img-btn-small{
    width: 60% !important;
  }
  #handbook-paste{
    display: none;
  }
}

</style>
    
