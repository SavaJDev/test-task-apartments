<template>
    <v-col class="filter-content">
        <v-row>
            <p class="floor mb-0">{{ parameterText }}</p>
        </v-row>
        <v-row>
            <input class="field" :value="valMin" @change="changeMin($event)"> 
            <p class="mx-1 mt-1">-</p>
            <input class="field" :value="valMax" @change="changeMax($event)">
        </v-row>
        <v-row>
            <v-range-slider color="success" 
                            track-color="#D8D8D8"
                            v-model="range"
                            max="100"
                            min="0">     
             </v-range-slider>
        </v-row>
    </v-col>
</template>

<script>
  import {mapActions} from 'vuex'    
    
  export default {
    name: 'FilterParameter',
    props: ['parameterText','k','flagPrice','reset'], 
    data: () => ({ 
       rangeMin: 2,
       rangeMax: 90   
    }),
      
    methods: {
        /*Отслеживание изменений в вводном поле по значению мин.*/
        changeMin(e){
            let res = e.target.value.trim()
            if(/^[0-9]{1,3}$/.test(res)) this.rangeMin = res/this.k
            else this.rangeMin = 2
        },
        /*Отслеживание изменений в вводном поле по значению макс.*/
        changeMax(e){
            let res = e.target.value.trim()
            if(/^[0-9]{1,3}$/.test(res)) this.rangeMax = res/this.k
            else this.rangeMax = 90
        },
        ...mapActions(['dataSelect'])
    },
      
    computed: {
        /*Отображение мин. значения заданного ползунком*/
        valMin(){
            if(this.flagPrice) return (this.range[0]*this.k).toFixed(1)
            else return this.range[0]*this.k
        },
        /*Отображение мин. значения заданного ползунком*/
        valMax(){
           if(this.flagPrice) return (this.range[1]*this.k).toFixed(1)
           else return this.range[1]*this.k
        },
        /*Выбор диапазона ползунком*/
        range: {
            get: function() {
                return [this.rangeMin,this.rangeMax]
            },
            set: function(newRange) {
                this.rangeMin = newRange[0]
                this.rangeMax = newRange[1]
            }
        }
    },
    watch: {
       valMin(val){
           this.dataSelect({arr: [val,this.valMax],
                           flag: this.k})
       },
       valMax(val){
           this.dataSelect({arr: [this.valMin,val],
                           flag: this.k})
       },
       reset(val){
           if(val) this.range = [2, 90]
       }    
    }  
  }
</script>

<style scoped>
    
    .filter-content {
        max-width: 175px;
    }
    
    p.floor {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 28px;
        color: #2C323A;
    }
    
    .field {
        width: 80px;
        max-height: 40px;
        border: 1px solid #D8D8D8;
        border-radius: 5px;
        background: #FFFFFF;
        text-align:center;
    }
</style>    