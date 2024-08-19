<template>
    <div>
      <v-row>
<!--         <v-col cols="12" align="left" class="headline-text" @click="showDialog = true">
          <v-icon color="black">mdi-signal-cellular-3</v-icon>
          電波確認受信ステータス
        </v-col>
 -->
        <v-col cols="12" align="left" class="headline-text tappable" @click="showDialog = true" style="font-size: 12px;">
          <v-icon color="black" size="16">mdi-signal-cellular-3</v-icon>
          <span class="tappable-text">電波確認受信ステータス</span>
        </v-col>
      </v-row>
  
      <v-dialog v-model="showDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">電波確認受信ステータス</v-card-title>
          <v-card-text>
            1日1回センサーが送る電波確認信号を正しく受信しているかを示します
          </v-card-text>
          <v-card-text>
            <div class="icon-explanation">
              <div class="icon-item">
                <v-icon size="24px" color="black">mdi-signal-cellular-3</v-icon> 36時間以内に受信
              </div>
              <div class="icon-item">
                <v-icon size="24px" color="black">mdi-signal-cellular-2</v-icon> 60時間以内に受信
              </div>
              <div class="icon-item">
                <v-icon size="24px" color="black">mdi-signal-cellular-1</v-icon> 84時間以内に受信
              </div>
              <div class="icon-item">
                <v-icon size="24px" color="red">mdi-signal-off</v-icon> 84時間以上受信できていない
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showDialog = false">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDialog: false
      };
    }
  };
  </script>
  
  <style scoped>
  .headline-text {
    font-size: 1rem; /* 見出しの文字サイズ */
    cursor: pointer;
  }
  
  .icon-explanation {
    display: flex;
    flex-direction: column; /* 縦方向に配置 */
    gap: 0.5rem; /* アイテム間の間隔 */
  }
  
.icon-item {
    display: flex;
    align-items: center;
  }
  
.icon-item v-icon {
    margin-right: 0.5rem;
  }
.tappable {
  cursor: pointer;
}

.tappable-text {
  text-decoration: underline;
  color: blue;
}

.tappable:hover .tappable-text {
  color: darkblue;
}
  </style>
  