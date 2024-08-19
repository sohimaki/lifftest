<template>
  <div class="title-container">
    <span class="text-h6">登録センサー全表示</span>
  </div>  
  <v-container>
    <div>
    <v-card class="status-card">
          <BatteryStatus />
          <SignalStatus />
          <ShakeStatus />
        </v-card>
  </div>
<!-- 
    <v-row class="title-row">
      <v-col cols="12" align="center" class="text-h6">登録センサー全表示</v-col>
    </v-row>

 -->
<!--     <v-row class="status-row">
      <v-col cols="12">
        <v-card class="status-card">
          <BatteryStatus />
          <SignalStatus />
          <ShakeStatus />
        </v-card>
      </v-col>
    </v-row>
 -->    
  </v-container>
  <div>
    <SensorListComponent
      :lineid="this.$store.getters.getLineid"
    />
  </div>
</template>  
<script>
  import SensorListComponent from '@/components/SensorListEx.vue';
  import BatteryStatus from '@/components/BatteryStatus.vue';
  import SignalStatus from '@/components/SignalStatus.vue';
  import ShakeStatus from '@/components/ShakeStatus.vue';

  export default {
  components: {
    BatteryStatus,
    SignalStatus,
    ShakeStatus,
    SensorListComponent,
  },
  data() {
    return {
      showBatteryDialog: false,
      showSignalDialog: false,
      showShakeDialog: false,
    };
  }
  };    
</script>

<style scoped>
.title-row {
  margin-bottom: 8px; /* 下部のマージンを狭くする */
}

.status-row {
  margin-top: 0px; /* 上部のマージンを狭くする */
}
.status-card {
  padding: 16px;
  margin-top: 16px;
  border: 1px solid #ccc; /* 枠線 */
  border-radius: 8px; /* 角丸 */
}
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30; /* お好みで調整可能 */
  margin-bottom: 0px; /* タイトルと次のコンポーネントの間のスペース */
}
</style>

