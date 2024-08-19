import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    command:    "",
    sensorid:   "",
    lineid:     "",
    linetype:   "",
    expiredate: new Date(),
    execdate:   new Date(),
    sensorList: [],
    listperpage: 10,
  },
  getters: {
    getCommand(state)
    {
      return state.command;
    },
    getSensorid(state)
    {
      return state.sensorid;
    },
    getLineid(state)
    {
      return state.lineid;
    },
    getLinetype(state)
    {
      return state.linetype;
    },
    getExpiredate(state)
    {
      return state.expiredate;
    },
    getExecdate(state)
    {
      return state.execdate;
    },
    getSensorList(state)
    {
      return state.sensorList;
    },
    getListPerPage(state)
    {
      return state.listperpage;
    },
  },
  mutations: {
    COMMAND(state, payload)
    {
      state.command = payload
    },
    SENSOR_ID(state, payload)
    {
      state.sensorid = payload
    },
    LINE_ID(state, payload)
    {
      state.lineid = payload
    },
    LINE_TYPE(state, payload)
    {
      state.linetype = payload
    },
    EXPIRE_DATE(state, payload)
    {
      state.expiredate = payload
    },
    EXEC_DATE(state, payload)
    {
      state.execdate = payload
    },
    SENSOR_LIST(state, payload)
    {
      state.sensorList = payload
    },
    LIST_PER_PAGE(state, payload)
    {
      state.listperpage = payload
    },
    updateSensorCaption(state, { sensorid, caption }) {
      const sensor = state.sensorList.find(sensor => sensor.sensorid === sensorid);
      if (sensor) {
        sensor.caption = caption;
      }
    },
    updateSensorAccelNotify(state, { sensorid, accelnotify }) {
      const sensor = state.sensorList.find(sensor => sensor.sensorid === sensorid);
      if (sensor) {
        sensor.isAccelNotifyOff = accelnotify;
      }
    }  
  },
  actions: {
  },
  modules: {
  }
})
