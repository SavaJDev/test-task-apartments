<template>
  <v-app>
    <v-main>
      <v-container class="wrapper d-flex flex-column align-center pt-0">
         <v-row class="header">
            <v-col cols="12">
                <v-row class="d-flex justify-center">
                    <p>LOREM IPSUM DOLOR SIT</p>
                </v-row>
                <v-row class="d-flex justify-space-between">
                   
                    <!--фильтр по комнатам-->
                    <v-col class="filter-rooms" cols="">
                        <v-row>
                            <p class="txt-rooms mb-0">комнаты</p>
                        </v-row>
                        <v-row>
                            <div class="btnFilterRooms d-flex align-center justify-center mr-1"
                                 :class="{'active-room': item.active}" 
                                 v-for="(item,i) in filters[0].roomsForFilter"
                                 @click="btnRoom(i)">
                                    <p class="mb-0">{{ item.txt }}</p>
                            </div>
                        </v-row>
                    </v-col>
                    
                    <!--фильтры по этажу,площади и стоимости-->
                    <FilterParameter :parameterText="'этаж'" :k="1" :flagPrice="false" :reset="reset"/>
                    <FilterParameter :parameterText="'площадь, м2'" :k="10" :flagPrice="false" :reset="reset"/>
                    <FilterParameter :parameterText="'стоимость, млн.р.'" :k="1.1" :flagPrice="true" :reset="reset"/>
                    
                    <!--колонка с кнопками действий по фильтру-->
                    <v-col class="filter-actions">
                        <v-row class="mt-7">
                            <div  class="applyBtn d-flex align-center justify-center" @click="applyFilter">
                                <p class="mb-0">ПРИМЕНИТЬ</p>
                            </div>
                        </v-row>
                        <v-row class="d-flex justify-center">
                           <div class="resetFilter" @click="resetFilter">
                               <p class="mb-0 mt-3">сбросить фильтр</p>
                               <hr>
                           </div>
                        </v-row>
                    </v-col>
                </v-row> 
            </v-col>
         </v-row>
         <!--отображение квартир -->
         <v-row class="content">
                <ApartmentCard v-for="(apartment,i) in showApartments" 
                               :apartment="apartment" 
                               :key="i"/>
         </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
    import {mapState,mapGetters,mapActions} from 'vuex'
    import ApartmentCard from './components/ApartmentCard'
    import FilterParameter from './components/FilterParameter'

    export default {
      name: 'App',

      components: {
          ApartmentCard,
          FilterParameter  
      },

      data: () => ({
          activeFilter: false,
          reset: false
          
      }),
      computed: {
          ...mapState({
                        allApartments: 'apartments',
                        filters: 'filters'
                     }),
          ...mapGetters(['filterApartments']),
          showApartments(){
            if(this.activeFilter) return this.filterApartments
            else return this.allApartments
          }
      },
      methods: {
          ...mapActions(['btnRoom','resetFilterRooms']),
          applyFilter(){
              this.activeFilter = true
          },
          resetFilter(){
              this.reset = true
              this.activeFilter = false
              this.resetFilterRooms()
              setTimeout(() => this.reset = false, 300)
          }      
      }    
    }
</script>

<style scoped>
    
    .wrapper {
        max-width: 1700px;
        background: #F8F8F8;
    }
    
    .header {
        width: 100%;
        max-width: 1170px;
        position: fixed;
        z-index: 1;
        background: #F8F8F8;
    }
    
    .header p {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 34px;
        color: #2C323A;
    }
    
    .filter-rooms{
        max-width: 204px;
    }
    
    p.txt-rooms {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 28px;
        color: #2C323A;
    }
    
    .btnFilterRooms {
        width: 47px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #D8D8D8;
        box-sizing: border-box;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .btnFilterRooms p {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
    }
    
    .active-room {
        background: #70D24E;
    }
    
    .active-room p {
        color: #FFFFFF;
    }
    
    .filter-actions {
        max-width: 201px;
    }
    
    .applyBtn {
        width: 201px;
        height: 40px;
        background: #70D24E;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .applyBtn p {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #FFFFFF;
    }
    
    .resetFilter {
        cursor: pointer;
    }
    
    .resetFilter p {
        font-family: Gotham Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 10px;
        color: #2C323A;
    }
    
    .resetFilter hr {
        background: #70D24E;
    }
    
    .content {
        max-width: 1170px;
        width: 100%;
        margin-top: 240px;
    }
</style>
