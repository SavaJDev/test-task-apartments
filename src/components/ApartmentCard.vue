<template>
    <v-col cols="3"> 
     <v-card width="270" 
             height="365" 
             rounded="10" 
             :elevation="elevation"
             hover
             @mouseover="activeCard" 
             @mouseleave="disactiveCard" 
     >
       <div class="d-flex flex-row">
            <v-card-subtitle class="floor pa-0 d-flex align-center mt-2 ml-4">{{ apartment.floor }} этаж</v-card-subtitle>
            <v-spacer></v-spacer>
            <v-card-title class="rooms pa-0 mt-2 mr-4">
                {{ apartment.rooms }} комната - {{ apartment.square }}м<sup>2</sup>
            </v-card-title> 
       </div> 
       <div class="content" :class="{'content-active': detailsActive}">
           <div class="number d-flex justify-center align-center">
               <p class="txt-number ma-0">№{{ apartment.number }}</p>
           </div>
           <div class="img-apartment d-flex align-center justify-center" :class="{'img-active': detailsActive}">
               <img src="../assets/img/apartment.png" alt="apartment">
           </div>
       </div>
       <div class="price d-flex justify-end mt-3 mr-4">
          <p class="txt-price">{{ apartment.price_real }}р.</p> 
       </div>
       <div class="price-square d-flex justify-end mt-1 mr-4">
           <p class="txt-price-square">{{ Math.round(apartment.price_real/apartment.square) }} р. за м<sup>2</sup></p>
       </div>
       <transition name="fade">
           <div v-if="detailsActive" class="btn-details d-flex align-center justify-center">
               <p class="txt-btn-details mb-0">ПОДРОБНЕЕ</p>
           </div>
       </transition>
    </v-card>
  </v-col> 
</template>

<script>
  export default {
    name: 'ApartmentCard',
    props: ['apartment'],  
    data: () => ({
       detailsActive: false,
       elevation: 0    
    }),
    methods: {
       activeCard(){
          this.detailsActive = true
          this.elevation = 5      
       },
       disactiveCard(){
          this.detailsActive = false 
          this.elevation = 0   
       }    
    },
    computed: {
        priceSquareMeter(){
            
        }
    }  
  }
</script>

<style scoped>
    
    .v-card {
        overflow: hidden;
    }
    
    .floor {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        opacity: 0.8;
    }
    
    .rooms {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        color: #2C323A;
    }
    
    .content {
        width: 250px;
        height: 250px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        box-sizing: border-box;
        border-radius: 5px;
        margin-left: 10px;
        transition: .5s;
    }
    
    .content-active {
        height: 200px;
        transition: .5s;
    }
    
    .number {
        width: 62px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        box-sizing: border-box;
        border-radius: 0px 5px;
        margin-left: 187px;
        margin-top: -1px;
    }
    
    .img-apartment img {
        width: 230px;
        height: 188px;
        transition: .5s;
    }
    
    .img-active img {
        width: 186px;
        height: 152px;
        transition: .5s;
    }
    
    .txt-number {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #2C323A;
    }
    
    .price {
        height: 28px;
    }
    
    .txt-price {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        color: #2C323A;
        line-height: 28px;
    } 
    
    .txt-price-square {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        color: #2C323A;
        opacity: 0.6;
    }
    
    .btn-details {
        width: 250px;
        height: 40px;
        background: #70D24E;
        border-radius: 2px 2px 5px 5px;
        margin-left: 10px;
        cursor: pointer;
    }
    
    .txt-btn-details {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #FFFFFF;
    }
    
    .fade-enter-active, .fade-leave-active {
       transition: opacity 0.6s;
    }
    
    .fade-enter, .fade-leave-to {
       opacity: .8;
    }
    
    
</style>
