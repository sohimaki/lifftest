// 環境に基づいてAzure FunctionのBase URIを設定
function getAzureFunctionBaseURI() {
    // ローカル開発環境の場合
/* 
    if (window.location.hostname === "localhost") {
      return "http://localhost:7268/api";
    }

 */    // 開発環境
    return "https://linebottest20240807144515.azurewebsites.net/api";
  }

  export default {
    "liffid": "2006029720-Ya16bzz2",
    "AZUREFUNCTIONBASE_URI": getAzureFunctionBaseURI(),
    "LIFFDEMOFUNCTION_URI": "/LIFFDemoFunction",
  };
  