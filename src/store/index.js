import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
/*работу с фильтром и данными лучше поместить в раздельные модули, но для тестового сделал в одном*/
Vue.use(Vuex)

export default new Vuex.Store({
  state: {     
      apartments: [],
      filters: [
        {
         roomsForFilter: [
                            {
                                txt:'S',
                                value: 'studio',
                                active:false
                            },
                            {
                                txt:'1к',
                                value: 1,
                                active:false
                            },
                            {
                                txt:'2к',
                                value: 2,
                                active:false
                            },
                            {
                                txt:'3к',
                                value: 3,
                                active:false
                            }
                        ]
        },
        {
          floor: [1,100]
        },
        {
          square: [10,1000]    
        },
        {
          price: [1,100]    
        }
      ]
  },
 
  getters: {
      filterApartments(state){
          let filterArr = []
          /*если активна хотя бы одна из кнопок, то фильтруем по количеству комнат*/
          if(state.filters[0].roomsForFilter[0].active || state.filters[0].roomsForFilter[1].active || state.filters[0].roomsForFilter[2].active || state.filters[0].roomsForFilter[3].active) {
              filterArr = state.apartments.filter(function(item){
                                if(item.rooms == state.filters[0].roomsForFilter[0].value && 
                                   state.filters[0].roomsForFilter[0].active || 
                                   item.rooms == state.filters[0].roomsForFilter[1].value &&
                                   state.filters[0].roomsForFilter[1].active ||
                                   item.rooms == state.filters[0].roomsForFilter[2].value &&
                                   state.filters[0].roomsForFilter[2].active ||
                                   item.rooms == state.filters[0].roomsForFilter[3].value &&
                                   state.filters[0].roomsForFilter[3].active) return item
                                
                            })
          }
          else filterArr = state.apartments
          /*проверка по этажу*/   
          filterArr = filterArr.filter(function(item){
                        if(item.floor >= state.filters[1].floor[0] && item.floor <= state.filters[1].floor[1]) return item
                    })
          /*проверка по площади*/
          filterArr = filterArr.filter(function(item){
                        if(item.square >= state.filters[2].square[0] && item.square <= state.filters[2].square[1]) return item
                    })
          /*проверка по стоимости*/
          filterArr = filterArr.filter(function(item){
                        if((item.price_real/1000000) >= state.filters[3].price[0] && (item.price_real/1000000) <= state.filters[3].price[1]) return item
                    })
          
            return filterArr
      }   
  },    
    
  mutations: {
      loadApartments(state,data){
            state.apartments = data
      },
      btnRoom(state,index){
            state.filters[0].roomsForFilter[index].active = !state.filters[0].roomsForFilter[index].active
      },
      dataSelect(state,dataObj){
            if(dataObj.flag == 1) state.filters[1].floor = dataObj.arr
            if(dataObj.flag == 10) state.filters[2].square = dataObj.arr
            if(dataObj.flag == 1.1) state.filters[3].price = dataObj.arr  
      },
      resetFilterRooms(state){
            state.filters[0].roomsForFilter.forEach((item) => item.active = false)
      }
  },
    
  actions: {
      /*загрузка данных с файла JSON*/
      loadApartments({commit}){
          return new Promise(function(resolve,reject){
              axios.get('http://localhost:8080/json/test-data.json')
              .then((response) => {
                  commit('loadApartments',response.data) 
                  resolve()      
            })
          })
      },
      /*активация фильтра по количеству комнат*/
      btnRoom({commit}, index){
			return new Promise(function(resolve, reject){
                    commit('btnRoom',index);
					resolve();
			});
      },
      /*внесение изменений в фильтры по этажу, площади и стоимости*/
      dataSelect({commit}, dataObj){
			return new Promise(function(resolve, reject){
                    commit('dataSelect',dataObj);
					resolve();
			});
      },
      /*сброс фильтра по количеству комнат*/
      resetFilterRooms({commit}){
			return new Promise(function(resolve, reject){
                    commit('resetFilterRooms');
					resolve();
			});
      }
  }
})
