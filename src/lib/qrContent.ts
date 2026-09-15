import { ContentFields, ContentType } from "@/types/qr";

function escapeWifiValue(value: string) {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export function buildQRContent(type: ContentType, fields: ContentFields): string {
  switch (type) {
    case "url":
      return fields.url.trim();
    case "text":
      return fields.text;
    case "phone":
      return fields.phone.trim() ? `tel:${fields.phone.trim()}` : "";
    case "email":
      return fields.email.trim() ? `mailto:${fields.email.trim()}` : "";
    case "wifi": {
      if (!fields.wifiSsid.trim()) return "";
      let str = `WIFI:T:${fields.wifiEncryption};S:${escapeWifiValue(fields.wifiSsid)};`;
      if (fields.wifiEncryption !== "nopass") {
        str += `P:${escapeWifiValue(fields.wifiPassword)};`;
      }
      return str + ";";
    }
  }
}
