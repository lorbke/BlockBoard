#include <HTTPClient.h>
#include <SPIFFS.h>
#include <Web3.h>
#include <WiFi.h>
// #include <Contract.h>

#include "display.h"

#define PANEL_RES_X \
  64  // Number of pixels wide of each INDIVIDUAL panel module.
#define PANEL_RES_Y \
  64                   // Number of pixels tall of each INDIVIDUAL panel module.
#define PANEL_CHAIN 2  // Total number of panels chained one to another

const char* ssid = "0xCola";
const char* password = "0xColaqq";

#define MY_ADDR "1"
#define CONTRACT "0xf5bd7ff5D55B21aBbB814F6FC906766c2E233e4a"

#define NATIVE_ETH_TOKENS \
  "ETH"  // if you switch chains you might want to change this

Web3* web3 = nullptr;
string active_url;

void downloadAndSaveFile(const char* url) {
  Serial.println("downloading...");
  HTTPClient http;
  http.begin(url);

  int httpCode = http.GET();

  SPIFFS.remove("/ad.gif");

  if (httpCode == HTTP_CODE_OK) {
    File file = SPIFFS.open("/ad.gif", FILE_WRITE);
    if (!file) {
      Serial.println("Error opening file for writing");
      return;
    }

    int len = http.getSize();
    uint8_t buff[1024] = {0};

    WiFiClient* stream = http.getStreamPtr();
    while (http.connected() && (len > 0 || len == -1)) {
      int size = stream->available();
      if (size) {
        int c = stream->readBytes(
            buff, ((size > sizeof(buff)) ? sizeof(buff) : size));
        file.write(buff, c);
        if (len > 0) {
          len -= c;
        }
      }
      delay(1);
    }
    file.close();
    Serial.println("File downloaded and saved to SPIFFS");
  } else {
    display::drawText("shit http failed");
    delay(1000);
    Serial.printf("HTTP request failed with error %s\n",
                  http.errorToString(httpCode).c_str());
  }

  http.end();
}

string queryUrl() {
  string contractAddrStr = CONTRACT;
  uint256_t id = 1;

  Contract contract(web3, CONTRACT);

  string param = contract.SetupContractData("getAd(uint256)", &id);
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
  if (!SPIFFS.begin(true)) {
    Serial.println("An error occurred while mounting SPIFFS");
    return;
  }
  display::dispay_gif("/gifs/eth.gif");
  delay(1000);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  web3 = new Web3(GOERLI_ID);

  active_url = "";
  // active_url = queryUrl();
  // downloadAndSaveFile(active_url.c_str());
  // display::dispay_gif("/ad.gif");
}

char filePath[256] = {0};
File root, gifFile;

const char *current_image = "/gifs/eth.gif";

void loop() {
  Serial.println("checking for new image");
  string url = queryUrl();
  if (url != active_url) {
    display::drawText("update...");
    if (url.length() > 1) {
      active_url = url;
      downloadAndSaveFile(url.c_str());
      current_image = "/ad.gif";
    } else {
      current_image = "/gifs/eth.gif";
    }
  } else {
    if (active_url.length() > 1) {
      current_image = "/ad.gif";
    } else {
      current_image = "/gifs/eth.gif";
    }
  }
  display::dispay_gif(current_image);
}