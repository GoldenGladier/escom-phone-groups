<template>
    <transition name="loader">
        <div class="loader">
            <h5>Cargando...</h5>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g>
                <circle cx="60" cy="50" r="4" fill="#1768ac">
                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"></animate>
                    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"></animate>
                </circle>
                <circle cx="60" cy="50" r="4" fill="#1768ac">
                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"></animate>
                    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"></animate>
                </circle>
                <circle cx="60" cy="50" r="4" fill="#1768ac">
                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"></animate>
                    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
                </circle>
                </g><g transform="translate(-15 0)">
                <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(90 50 50)"></path>
                <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                </path>
                <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                </path>
                </g>
            </svg>        
        </div>
    </transition>
</template>

<script>

export default {
  name: 'ModalForm',
  props : {

  }, 
}
</script>

<style lang="css" scoped>

.loader h5{
    color: #1768AC;
    font-weight: 400;
    margin: 0;
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

/* ANIMATIONS */
.loader-enter-active, .loader-leave-active {
  transition: scale 4s
}
.loader-enter, .loader-leave-to {
  transform: scale(0);
}
</style>
    
