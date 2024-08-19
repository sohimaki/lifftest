<template>
    <div>
      <v-row>
<!--         <v-col cols="12" align="left" class="headline-text" @click="showDialog = true">
          <v-icon color="red">mdi-bell-ring</v-icon>
          揺れ検出ステータス
        </v-col>
 -->
        <v-col cols="12" align="left" class="headline-text tappable" @click="showDialog = true" style="font-size: 12px;">
          <v-icon color="red" size="16">mdi-bell-ring</v-icon>
          <span class="tappable-text">揺れ検出ステータス</span>
        </v-col>
        
      </v-row>
  
      <v-dialog v-model="showDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">揺れ検出ステータス</v-card-title>
          <v-card-text>
            <div class="icon-explanation">
              <div class="icon-item">
                <v-icon size="24px" color="red">mdi-bell-ring</v-icon> 24時間以内に揺れを検出したことを示します
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
  