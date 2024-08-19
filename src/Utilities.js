
//  日付・時刻文字列を、フォーマット変換
export function FormatDateTime(format, dateText)
{
  var formatted = ""
  var dateObj = new Date(dateText)

  const pad = (number) => (number < 10 ? '0' + number : number);

  if (format === "YYYY年MM月DD日")    
  {
    formatted = `${dateObj.getFullYear()}年${pad(dateObj.getMonth()+1)}月${pad(dateObj.getDate())}日`
  }
  else if (format === "YYYY/MM/DD HH:mm:ss")
  {
    formatted = `${dateObj.getFullYear()}/${pad(dateObj.getMonth()+1)}/${pad(dateObj.getDate())} ${pad(dateObj.getHours())}:${dateObj.getMinutes()}:${pad(dateObj.getSeconds())}`
  }
  else if (format === "YYYY/MM/DD HH:mm")
  {
    formatted = `${dateObj.getFullYear()}/${pad(dateObj.getMonth()+1)}/${pad(dateObj.getDate())} ${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`
  }
  else
  {
    formatted = dateText
  }

  return formatted
}

// 電圧値(numer)を少数点以下第1位までの数字に変換してVを付加(3.141592→"3.1V")
export function FormatVoltage(voltnum, zerostr, minusstr)
{
  var voltstr = ""
  if (voltnum === 0)
  {
    voltstr = zerostr
  }
  else if (voltnum < 0)
  {
    voltstr = minusstr
  }
  else
  {
    var lastVolt = voltnum / 10.0
    voltstr = lastVolt.toFixed(1) + "V"
  }
  
  return voltstr
}

export function isWithin24Hours(lastaccelerometerdatetime, store) {
  if(store.getters.getExecdate.getTime() > new Date(lastaccelerometerdatetime).getTime())
  {
      const timeDifference = store.getters.getExecdate.getTime() - new Date(lastaccelerometerdatetime).getTime()
      const hoursDifference = timeDifference / (1000 * 60 * 60)
      return hoursDifference < 24
  }
  else
  {
      return true
  }
}

export function formatDisplayString(inputString) {
  if (!inputString) {
    return '-'; // nullやundefinedの場合は空文字を返す
  } else if (inputString.length <= 9) {
    return inputString;
  } else {
    return inputString.slice(0, 8) + '...';
  }
}

export function getVoltIcon(voltstatus) {
  if (voltstatus == 0) return 'mdi-battery-high'
  if (voltstatus == 1) return 'mdi-battery-medium'
  if (voltstatus == 2) return 'mdi-battery-low'
  if (voltstatus == 3) return 'mdi-battery-off-outline'
  return 'mdi-battery-unknown'
}

export function getVoltIconFromID(sensorid, eventlist) {
  const item = getSensorItem(sensorid, eventlist)
  if (item.voltvalue >= 29 && item.voltvalue <= 31) return 'mdi-battery-high'
  if (item.voltvalue >= 26 && item.voltvalue <= 28) return 'mdi-battery-medium'
  if (item.voltvalue >= 22 && item.voltvalue <= 25) return 'mdi-battery-low'
  if (item.voltvalue >= 1 && item.voltvalue <= 21) return 'mdi-battery-off-outline'
  return 'mdi-battery-unknown'
}

export function getVoltIconColor(voltstatus) {
  if (voltstatus == 0) return 'black'
  if (voltstatus == 1) return 'black'
  if (voltstatus == 2) return 'black'
  if (voltstatus == 3) return 'red'
  return 'grey'
}

export function getVoltIconColorFromID(sensorid, eventlist) {
  const item = getSensorItem(sensorid, eventlist)
  if (item.voltvalue >= 29 && item.voltvalue <= 31) return 'black'
  if (item.voltvalue >= 26 && item.voltvalue <= 28) return 'black'
  if (item.voltvalue >= 22 && item.voltvalue <= 25) return 'black'
  if (item.voltvalue >= 1 && item.voltvalue <= 21) return 'red'
  return 'grey'
}
export function getHeartbeatIconColor(lastheartbeatstatus)
{
    if (lastheartbeatstatus == 0) return 'black'
    if (lastheartbeatstatus == 1) return 'black'
    if (lastheartbeatstatus == 2) return 'black'
    return 'red'
}

export function getHeartbeatIcon(lastheartbeatstatus)
{
    if (lastheartbeatstatus == 0) return 'mdi-signal-cellular-3'
    if (lastheartbeatstatus == 1) return 'mdi-signal-cellular-2'
    if (lastheartbeatstatus == 2) return 'mdi-signal-cellular-1'
    return 'mdi-signal-off'
}

export function getHeartbeatIconColorFromID(sensorid, eventlist, store)
{
    const item = getSensorItem(sensorid, eventlist)
    const status = GetHeartbeatStatus(item.heartbeat, store)
    if (status == 0) return 'black'
    if (status == 1) return 'black'
    if (status == 2) return 'black'
    return 'red'
}

export function getHeartbeatIconFromID(sensorid, eventlist, store)
{
    const item = getSensorItem(sensorid, eventlist)
    const status = GetHeartbeatStatus(item.heartbeat, store)
    if (status == 0) return 'mdi-signal-cellular-3'
    if (status == 1) return 'mdi-signal-cellular-2'
    if (status == 2) return 'mdi-signal-cellular-1'
    return 'mdi-signal-off'
}

export function GetHeartbeatStatus(heartbeattime, store) {
  const lastheartbeatdatetime = new Date(heartbeattime)
  if(store.getters.getExecdate.getTime() > lastheartbeatdatetime.getTime())
  {
      const timeDifference = store.getters.getExecdate.getTime() - lastheartbeatdatetime.getTime()
      const hoursDifference = timeDifference / (1000 * 60 * 60)
      if(hoursDifference < 36)
      {
          return 0
      }
      if(hoursDifference < 60)
      {
          return 1
      }
      if(hoursDifference < 84)
      {
          return 2
      }
      return -1
  }
  return 0
}

export function isWithin24HoursFromID(sensorid, eventlist, store)
{
  console.log("センサーID:", sensorid);
  const item = getSensorItem(sensorid, eventlist)

  if (item && item.lastaccelerometerdatetime) {
    console.log("item.lastaccelerometerdatetime:", item.lastaccelerometerdatetime);
    const is24 = isWithin24Hours(item.lastaccelerometerdatetime, store);
    console.log("isWithin24Hours:", is24);
    return is24;
  } else {
    console.log("itemが正しく取得できませんでした。");
    return false;
  }  
}

export function getSensorItem(targetSensorId, eventlist)
{
    const targetEvent = eventlist.find((item) => item.sensorid === targetSensorId)
    return targetEvent
}
