#include <SPIFFS.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Web3.h>
// #include <Contract.h>

#include "display.h"

#define PANEL_RES_X 64      // Number of pixels wide of each INDIVIDUAL panel module. 
#define PANEL_RES_Y 64     // Number of pixels tall of each INDIVIDUAL panel module.
#define PANEL_CHAIN 2      // Total number of panels chained one to another

const char* ssid = "0xCola";
const char* password = "0xColaqq";

#define MY_ADDR "0x18EeDAb07377871eFe7f2B31bFd86EebB8F5DeFF"
#define CONTRACT  "0x0C8d83bAab5Ad0b9bAe3832697f3a9380e086D3e"

#define NATIVE_ETH_TOKENS "ETH"                                //if you switch chains you might want to change this
#define CHILLIFROGS "0xa3b7cee4e082183e69a03fc03476f28b12c545a7"
#define ERC20CONTRACT  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"  //a well known ERC20 token contract on mainnet
#define VITALIKADDRESS "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"


Web3 *web3 = nullptr;
string active_url;

void downloadAndSaveFile(const char* url) {
  Serial.println("downloading...");
  HTTPClient http;
  http.begin(url);

  int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    File file = SPIFFS.open("/ad.gif", FILE_WRITE);
    if (!file) {
      display::drawText("shit download failed");
      delay(1000);
      Serial.println("Error opening file for writing");
      return;
    }

    String payload = http.getString();
    file.print(payload);

    file.close();
    Serial.println("File downloaded and saved to SPIFFS");
  } else {
    display::drawText("shit http failed");
    delay(1000);
    Serial.printf("HTTP request failed with error %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

string queryUrl()
{
    string contractAddrStr = CONTRACT;
    string address = MY_ADDR;

    Contract contract(web3, CONTRACT);

    string param = contract.SetupContractData("getAd(address)", &address);
    string result = contract.ViewCall(&param);

    Serial.println(result.c_str());
    string link = web3->getString(&result);
    Serial.println(link.c_str());
    return link;
}

void setup() {
  Serial.begin(9600);
  delay(1000);

  display::setup();
  delay(1000);

  display::drawText("connecting");

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");

  while(WiFi.status() != WL_CONNECTED){
      display::drawText("connecting");
      delay(200);
      display::drawText("connecting.");
      delay(200);
  }

  display::drawText("connected");
  delay(1000);

  web3 = new Web3(GOERLI_ID);

  if (!SPIFFS.begin(true)) {
    Serial.println("An error occurred while mounting SPIFFS");
    return;
  }

  active_url = queryUrl();
  downloadAndSaveFile(active_url.c_str());

}


char filePath[256] = { 0 };
File root, gifFile;

void loop() 
{
  display::dispay_gif("/gifs/eth.gif");
  delay(3000);
  display::drawText("checking for new image");
  string url = queryUrl();
  if (url != active_url) {
    display::drawText("downloading new image");
    active_url = url;
    downloadAndSaveFile(url.c_str());
  }
  display::dispay_gif("/ad.gif");
  delay(20000);
}