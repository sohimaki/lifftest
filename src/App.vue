<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  async mounted() {
    try {
      await this.$router.isReady()  // Routerの初期化終亁E��にmounted()フックが呼び出されと、queryパラメータが読み取れなぁE�Eで、Routerの初期化を征E��

      if ((this.$route.query['command'] != undefined) && (this.$route.query['command'] != null))
      {
        this.$store.commit('COMMAND', this.$route.query['command'])
      }
      if ((this.$route.query['sensorid'] != undefined) && (this.$route.query['sensorid'] != null))
      {
        this.$store.commit('SENSOR_ID', this.$route.query['sensorid'])
      }
      if ((this.$route.query['lineid'] != undefined) && (this.$route.query['lineid'] != null))
      {
        this.$store.commit('LINE_ID', this.$route.query['lineid'])
      }
      if ((this.$route.query['linetype'] != undefined) && (this.$route.query['linetype'] != null))
      {
        this.$store.commit('LINE_TYPE', this.$route.query['linetype'])
      }
      this.$store.commit('EXEC_DATE', new Date());
      if ((this.$route.query['exectime'] != undefined) && (this.$route.query['exectime'] != null))
      {
        const datetimeQueryParam = this.$route.query['exectime'];
        if (datetimeQueryParam) {
          const year = parseInt(datetimeQueryParam.substring(0, 4), 10);
          const month = parseInt(datetimeQueryParam.substring(4, 6), 10) - 1;
          const day = parseInt(datetimeQueryParam.substring(6, 8), 10);
          const hour = parseInt(datetimeQueryParam.substring(8, 10), 10);
          const minute = parseInt(datetimeQueryParam.substring(10, 12), 10);
          const second = parseInt(datetimeQueryParam.substring(12, 14), 10);

          // エラーハンドリング
          if (!isNaN(year) && !isNaN(month) && !isNaN(day) &&
              !isNaN(hour) && !isNaN(minute) && !isNaN(second)) {
            const execDate = new Date(year, month, day, hour, minute, second);
            // Vuexストアに格納（ミューテーション名を大文字に変更）
            this.$store.commit('EXEC_DATE', execDate);
          } 
        }
      }
      // queryパラメータ直接ではなく、保存してあるパラメータチE�Eタのcommandで振り�Eける
      const command = this.$store.getters.getCommand
      this.$router.push('/AllSensorList')
/*    
      if (command == "sensorlist")
      {
        this.$router.push('/AllSensorList')
      }
      else
      {
        alert("App.vue mounted():unknown command : " + command)
      }
 */ 
    }
    catch (e)
    {
      alert("App.vue mounted():" + e)
    }
  },
}

</script>
