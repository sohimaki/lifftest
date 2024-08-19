import config from '@/config.js'
import axios from './axios.js'

export function createStateMessage(sensorid, stateMessage) {
  // 引数の sensorid と stateMessage を使用してメッセージを作成
  const message = `センサー：${sensorid}\n${stateMessage}`;
  return message;
}

export function sendMessageToLine(sensorid, sendmessage) {
  console.log('sendMessageToLine start');
  if (window.navigator.userAgent.includes("Line")) {
    const fullMessage = createStateMessage(sensorid, sendmessage)
    const message = {
      type: 'text',
      text: fullMessage
    };

    window.liff.sendMessages([message])
      .then(() => {
        console.log('Message sent');
      })
      .catch((err) => {
        console.error('Error sending message:', err);
      });
  } else {
    console.log("LIFF features are not supported in this environment.");
  }  
}

// センサー状態を示す生データから、状態コードを抽出
export function GetSensorStatus(rawdata)
{
    var cmd = rawdata.substr(2, 2)
    var value = parseInt(cmd, 16)

    return value
}

// センサー状態を示す生データから、ステート文字列を作成
export function GetSensorStatusKind(rawdata)
{
    const heartbeat1 = 0x00                  //0x00
    const heartbeat2 = 0x01                  //0x01
//    const startofarmingbybutton = 0x10       //0x10
//    const armedbybutton = 0x11               //0x11
//    const automaticallyarmed = 0x12          //0x12
//    const disarmedafterevent = 0x13          //0x13
//    const disarmedbylongpress = 0x14         //0x14
//    const downlinkconfirmationwithmore = 0x15//0x15
//    const downlinkconfirmationwithnomore = 0x16//0x16
//    const armedbyforcedarm = 0x17            //0x17
//    const disarmedbyforceddisarm = 0x18      //0x18
    const startofmovement = 0x20             //0x20
    const endofmovement = 0x21               //0x21
    const tracingtag = 0x22                  //0x22
    const dropalert = 0x23                   //0x23
    const rotationalert = 0x24               //0x24
    const shortpress = 0x30                  //0x30
    const doubleclick = 0x31                 //0x31
    const longpress = 0x32                   //0x32
//    const oddshortpress = 0x33               //0x33
//    const evenshortpress = 0x34              //0x34
//    const temperaturebelowthresholdA = 0x50  //0x50
//    const temperatureabovethresholdA = 0x51  //0x51
//    const temperaturebelowthresholdB = 0x52  //0x52
//    const temperatureabovethresholdB = 0x53  //0x53
//    const temperaturebelowthresholdC = 0x54  //0x54
//    const temperatureabovethresholdC = 0x55  //0x55
//    const temperaturedeltaalert = 0x56       //0x56
//    const lightchangeon = 0x60               //0x60
//    const lightchangeoff = 0x61              //0x61
//    const reedchangeon = 0x62                //0x62
//    const reedchangeoff = 0x63               //0x63
//    const Extralongpress = 0x81               //0x81 Extra long press (6 seconds)
    
//alert("SensorStatus.GetSensorStatusKind() rawdata:" + rawdata)
    var kind = ""
    var status = GetSensorStatus(rawdata)

    if (status == shortpress ||
        status == doubleclick ||
        status == longpress)
    {
        kind = "ボタン"
    }
    else if (status == startofmovement ||
             status == endofmovement ||
             status == tracingtag ||
             status == dropalert ||
             status == rotationalert)
    {
        kind = "揺れ検出"
    }
    else if (status == heartbeat1 ||
             status == heartbeat2)
    {
        kind = "電波確認"
    }
    else
    {
        kind = "その他";
    }

    return kind
}

// センサをLINEに登録して、結果文字列を取得
export async function RegistSensor(sensorid, lineid, linetype) {
    const EndpointUriLIFF = config.LIFFREGISTLINESENSOR_URI;
    const payload = {
      sensorid: sensorid,
      lineid: lineid,
      linetype: linetype,
    };
  
    try {
      const response = await axios.post(EndpointUriLIFF, payload);
      return response.data.returnmsg; // axiosのレスポンスデータを直接返す
    } catch (error) {
      console.error("RegistSensor error:", error);
      return null; // エラーが発生した場合はnullを返す
    }
}

// センサをLINEから解除する
export async function DeleteSensor(sensorid,  lineid)
{
  const EndpointUriLIFF = config.LIFFDELETELINESENSOR_URI
  const payload = {
    sensorid : sensorid,
    lineid : lineid,
  };

  try {
    const response = await axios.post(EndpointUriLIFF, payload);
    return response.data; // axiosのレスポンスデータを直接返す
  } catch (error) {
    console.error("DeleteSensor error:", error);
    return null; // エラーが発生した場合はnullを返す
  }
}

export async function GetSensorListFunction(lineid, execDate) {
  try {
      return new Promise((resolve, reject) => {
          let formattedDateTime = "";

          if (execDate) {
            // execDate が渡された場合の処理
            const year = execDate.getFullYear();
            const month = ('0' + (execDate.getMonth() + 1)).slice(-2);
            const day = ('0' + execDate.getDate()).slice(-2);
            const hour = ('0' + execDate.getHours()).slice(-2);
            const minute = ('0' + execDate.getMinutes()).slice(-2);
            const second = ('0' + execDate.getSeconds()).slice(-2);

            formattedDateTime = `${year}${month}${day}${hour}${minute}${second}`;
          }          

          const EndpointUriLIFF = config.LIFFDEMOFUNCTION_URI;
          const functionPRM = `lineid=${lineid}${formattedDateTime ? `&datetime=${formattedDateTime}` : ""}`;

          // クエリーパラメータが既に存在するかどうかをチェック
          const separator = EndpointUriLIFF.includes('?') ? '&' : '?';
          const finalURL = `${EndpointUriLIFF}${separator}${functionPRM}`;

          axios
              .get(finalURL)
              .then((response) => {
                  let dataList = response.data;
                  
                  // データをソート
/*                   
                  dataList.sort((a, b) => {
                      if (a.lastaccelstatus === b.lastaccelstatus) {
                          return a.sensorid.localeCompare(b.sensorid);
                      }
                      return b.lastaccelstatus - a.lastaccelstatus;
                  });

 */                  resolve(dataList); // 成功時にデータを解決します
              })
              .catch((error) => {
                  reject(error); // エラー時にエラーを拒否します
              });
      });
  } catch (e) {
      alert("function GetSensorListFunction():" + e);
  }
}

