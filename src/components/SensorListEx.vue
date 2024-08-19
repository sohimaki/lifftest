<template>
  <v-data-table
    :headers="headers"
    :items="eventlist"
    density="compact"
    v-model:items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    :items-per-page-text="'1ページ表示数:'"
    :page.sync="currentPage"
    @update:page="updatePage"
    style="font-size: 12px;"
    class="fixed-width-table"
  >
  <template v-slot:item.no="{ item, index }">
      <div>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</div>
    </template>
    <template v-slot:item.sensorid="{ item }">
      <v-btn
        style="height: 22px; padding: 2px 3px; font-size: 12px; margin:0"
        :color="buttonColor(item.sensorid)"
        dark
        outlined
        @click="ShowDetail(item.sensorid)"
      >
        {{ item.sensorid }}
      </v-btn>
      <v-icon size="small" :style="{ color: usegetVoltIconColorFromID(item.sensorid) }">
        {{ usegetVoltIconFromID(item.sensorid) }}
      </v-icon>
      <v-icon size="small" :style="{ color: usegetHeartbeatIconColorFromID(item.sensorid) }">
        {{ usegetHeartbeatIconFromID(item.sensorid) }}
      </v-icon>
      <v-icon size="small" style="color: red;" v-if="useisWithin24HoursFromID(item.sensorid)">
        mdi-bell-ring
      </v-icon>
    </template>
    <template v-slot:item.caption="{ item }">
      <div :class="caption-cell">{{ useFormatDisplayString(item.caption) }}</div>
    </template>
  </v-data-table></template>
  
  <script>
  import axios from '../axios.js'
  import config from '@/config.js'
  import {formatDisplayString, getVoltIcon, getVoltIconColor, getHeartbeatIconColor, getHeartbeatIcon} from '@/Utilities.js'
  import {GetSensorListFunction} from '@/SensorStatus.js'
  export default {
    name: 'SensorListEx',
    props: {
        lineid: {
            type: String,
            required: true,
        }
    },
    data() {
      return {
        itemsPerPage: 10,
        itemsPerPageOptions:[
            {value: 5, title: '5'},
            {value: 10, title: '10'},
            {value: 20, title: '20'}
        ],
        headers: [
        { title: 'No.', align: 'end', key: 'no', sortable: false },
        { title: 'センサー情報', align: 'start', key: 'sensorid', sortable: false },
        { title: '説明', align: 'start', key: 'caption', sortable: false }
        ],
       
        eventlist:[],
        eventListDict: {}, // 辞書型の初期状態
        SensorListShowTime    : '2000/1/1',
        currentPage: 1, // 現在のページ
      };
    },
    watch: {
    eventlist: {
      handler(newEventList) {
        const dict = {};
        newEventList.forEach(event => {
          dict[event.sensorid] = event;
        });
        this.eventListDict = dict;
      },
      deep: true,
      },
    },
    computed: {
        buttonStyle() {
          return 'height: 22px; padding: 2px 10px; font-size: 12px;';
        },
    },
    mounted() {
        try {
            console.log("SensorListEx mounted")
            this.loadData();
        } catch (e) {
            alert("SensorListEx.mounted():" + e);
        }
    },
    methods: {
        async loadData() {
            try {
                this.SensorListShowTime = new Date();
                if(this.$store.getters.getSensorList.length == 0)
                {
                    console.log("call GetSensorListFunction")
                    this.eventlist = await GetSensorListFunction(this.lineid);
                    this.$store.commit('SENSOR_LIST', this.eventlist)
                }
                else
                {
                    this.itemsPerPage = this.$store.getters.getListPerPage
                    console.log("itemsperpage:", this.itemsPerPage);
                    this.eventlist = this.$store.getters.getSensorList
                    const pageno = this.findSensorPage(this.$store.getters.getSensorid)
                    console.log("ページ番号:", pageno);
                    this.changePage(pageno)
                }
                if (this.$store.getters.getSensorList.length == 0) {
                    this.confirmationNoSensorDialog = true;
                }
            } catch (e) {
                alert("Error loading data: " + e);
            }
        },
        buttonColor(sensorid) {
          //return this.isAccelNotifyOff ? 'gray' : 'primary';
          if (this.eventListDict && this.eventListDict[sensorid])
          {
                if(this.eventListDict[sensorid]?.isAccelNotifyOff == true)
                    return 'grey'
                return 'primary'
          }
          return 'primary'
        },
        updatePage(newPage)
        {
            this.currentPage = newPage;
        },       
        changePage(newPage) {
            // プログラム内でページを変更するためのメソッド
            this.currentPage = newPage;
        },        // センサーリストの取得（日付なしで呼ぶと全センサーが返される）
        findSensorPage(sensorId) {
            // this.eventlistがオブジェクト配列であると仮定
            const sensorIndex = this.eventlist.findIndex(event => event.sensorid === sensorId);
            if (sensorIndex !== -1) {
                // センサーが見つかった場合
                const itemsPerPage = this.itemsPerPage || 5; // デフォルトは1ページあたり5アイテム

                // センサーが見つかった要素位置に基づいてページ数を計算
                const page = Math.ceil((sensorIndex + 1) / itemsPerPage);
                return page;
            } else {
                // センサーが見つからなかった場合
                return 1;
            }
        },
        // formatDisplayString を使用するメソッド
        useFormatDisplayString(inputString) {
            return formatDisplayString(inputString);
        },
        usegetVoltIconColorFromID(sensorid)
        {
            if (this.eventListDict && this.eventListDict[sensorid])
            {
                return getVoltIconColor(this.eventListDict[sensorid]?.voltstatus)
            }
        },
        usegetVoltIconFromID(sensorid) {
            if (this.eventListDict && this.eventListDict[sensorid])
            {
                return getVoltIcon(this.eventListDict[sensorid]?.voltstatus);
            }
        },
        usegetHeartbeatIconColorFromID(sensorid)
        {
            if (this.eventListDict && this.eventListDict[sensorid])
            {
                return getHeartbeatIconColor(this.eventListDict[sensorid]?.lastheartbeatstatus)
            }
        },
        usegetHeartbeatIconFromID(sensorid)
        {
            if (this.eventListDict && this.eventListDict[sensorid])
            {
                return getHeartbeatIcon(this.eventListDict[sensorid]?.lastheartbeatstatus)
            }
        },
        useisWithin24HoursFromID(sensorid) {
            if (this.eventListDict && this.eventListDict[sensorid])
            {
                if(this.eventListDict[sensorid]?.lastaccelstatus == 0)
                    return false
                return true
            }
            return false
        },
        ShowDetail(sensorid) {
            try{
            // センサー履歴へ遷移
            this.$store.commit('SENSOR_ID', sensorid)
            this.$store.commit('LIST_PER_PAGE', this.itemsPerPage)
            this.$router.push('/SensorInfo')
            }
            catch(e)
            {
                alert("DeleteSensorList.ShowDetail():" + e)
            }
        },
    }
  }
    </script>
  
  <style scoped>
  .number-cell {
    width: 3%; /* 幅を%で設定 */
    text-align: right; /* テキストを右揃え */
    padding: 0 !important;
  }
  
  .sensor-info-cell {
    width: 40%; /* センサー情報列の幅を%で設定 */
    display: flex;
    align-items: center;
    padding: 0;
  }
  
  .caption-cell {
    width: 57%; /* 説明列の幅を%で設定 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 4px;
  }
 
  .text-red {
    color: red;
  }
 
  .fixed-width-table .v-data-table__wrapper {
    display: block;
    width: 100%;
 }

 .fixed-width-table .v-data-table__wrapper table {
    table-layout: fixed;
    width: 100%;
 }

  </style>
