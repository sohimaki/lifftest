<template>
    <div>
      <v-row>
<!--         <v-col cols="12" align="left" class="headline-text" @click="showDialog = true">
          <v-icon color="black">mdi-battery-high</v-icon>
          バッテリー残量ステータス
        </v-col>
 -->        
        <v-col cols="12" align="left" class="headline-text tappable" @click="showDialog = true" style="font-size: 12px;">
          <v-icon color="black" size="16">mdi-battery-high</v-icon>
          <span class="tappable-text">バッテリー残量ステータス</span>
        </v-col>
      </v-row>
  
      <v-dialog v-model="showDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">バッテリー残量ステータス</v-card-title>
          <v-card-text class="custom-card-text">
            2.6V以下になるとセンサーが停止する可能性があります
          </v-card-text>
          <v-card-text>
            <div class="icon-explanation">
              <div class="icon-item">
                <v-icon size="24px" color="black">mdi-battery-high</v-icon> 2.9V-3.1V
              </div>
              <div class="icon-item">
                <v-icon size="24px" color="black">mdi-battery-medium</v-icon> 2.6V-2.8V
              </div>
              <div class="icon-item">
                <v-icon size="24px" color="black">mdi-battery-low</v-icon> 2.2V-2.5V
              </div>
              <div class="icon-item">
                <v-icon size="24px" color="red">mdi-battery-off-outline</v-icon> 2.1V以下
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
  
  .custom-card-text {
    font-size: 0.875rem; /* 必要に応じて文字サイズを調整 */
    color: #ff9999; /* 濃いピンク色 */
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
  