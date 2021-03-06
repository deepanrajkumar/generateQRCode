/* Parser for Bharat QR TLV Format */

const TAG_NAME_LENGTH = 2;
const TAG_LEN_LENGTH = 2;
// Bharat QR data definition. Includes new Tags 26, 27 and 28 by NPCI

const sampleQR =
  "000201010212021647250010000000120415526550000000001061661000900000000310823ABCD000123812380151933726350010A0000005240110bivek@npci02031.027720010A0000005240135bivek1234567890123456789012345520130215www.npci.org.in28300010A000000524011270308093964452045411530335654032.05802IN5910Bivek Rath6006MUMBAI610640006762410203***0403***0603***0708000000030804test63047d4f";
const BQRFormat = {
  "00": {
    name: "Payload Format Indicator",
    type: "P",
    format: "N",
    length_type: "F",
    length_min: 2,
    length_max: 2,
    usage: "M",
  },
  "01": {
    name: "Point of Initiation Method",
    type: "P",
    format: "N",
    length_type: "F",
    length_min: 2,
    length_max: 2,
    usage: "O",
  },
  "02": {
    name: "Visa Merchant ID",
    type: "P",
    format: "N",
    length_type: "V",
    length_min: 8,
    length_max: 16,
    usage: "M",
  },
  "03": { name: "Reserved for future definition by Visa", type: "R" },
  "04": {
    name: "MasterCard Merchant ID",
    type: "P",
    format: "N",
    length_type: "V",
    length_min: 15,
    length_max: 15,
    usage: "M",
  },
  "05": { name: "Reserved for future definition by MasterCard", type: "R" },
  "06": {
    name: "NPCI Merchant ID",
    type: "P",
    format: "N",
    length_type: "F",
    length_min: 16,
    length_max: 16,
    usage: "M",
  },
  "07": { name: "Reserved for future definition by NPCI", type: "R" },
  "08": {
    name: "Account IFSC",
    type: "P",
    format: "N",
    length_type: "F",
    length_min: 11,
    length_max: 37,
    usage: "O",
  },
  "09": { name: "Reserved for future definition", type: "R" },
  10: { name: "Reserved for future definition", type: "R" },
  11: { name: "Reserved for future definition", type: "R" },
  12: { name: "Reserved for future definition", type: "R" },
  13: { name: "Reserved for future definition", type: "R" },
  14: { name: "Reserved for future definition", type: "R" },
  15: { name: "Reserved for future definition", type: "R" },
  16: { name: "Reserved for future definition", type: "R" },
  17: { name: "Reserved for future definition", type: "R" },
  18: { name: "Reserved for future definition", type: "R" },
  19: { name: "Reserved for future definition", type: "R" },
  20: { name: "Reserved for future definition", type: "R" },
  21: { name: "Reserved for future definition", type: "R" },
  22: { name: "Reserved for future definition", type: "R" },
  23: { name: "Reserved for future definition", type: "R" },
  24: { name: "Reserved for future definition", type: "R" },
  25: { name: "Reserved for future definition", type: "R" },
  26: {
    name: "UPI Data",
    type: "C",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 73,
    usage: "O",
    nested: {
      "00": {
        name: "Rupay RID",
        type: "P",
        format: "AN",
        length_type: "F",
        length_min: 10,
        length_max: 10,
        usage: "M",
      },
      "01": {
        name: "Payee VPA",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 50,
        usage: "O",
      },
      "02": {
        name: "Minimum Amount",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 13,
        usage: "O",
      },
    },
  },
  27: {
    name: "UPI Additional Data",
    type: "C",
    format: "AN",
    length_type: "V",
    length_min: 4,
    length_max: 61,
    usage: "O",
    nested: {
      "00": {
        name: "Rupay RID",
        type: "P",
        format: "AN",
        length_type: "F",
        length_min: 10,
        length_max: 10,
        usage: "M",
      },
      "01": {
        name: "TR",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 4,
        length_max: 35,
        usage: "C",
      },
      "02": {
        name: "URL",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
    },
  },
  28: {
    name: "UPI Aadhaar Data",
    type: "C",
    format: "AN",
    length_type: "V",
    length_min: 22,
    length_max: 22,
    usage: "O",
    nested: {
      "00": {
        name: "Rupay RID",
        type: "P",
        format: "AN",
        length_type: "F",
        length_min: 10,
        length_max: 10,
        usage: "M",
      },
      "01": {
        name: "Aadhaar Number",
        type: "P",
        format: "AN",
        length_type: "F",
        length_min: 12,
        length_max: 12,
        usage: "C",
      },
    },
  },
  30: { name: "Reserved for future definition", type: "R" },
  31: { name: "Reserved for future definition", type: "R" },
  32: { name: "Reserved for future definition", type: "R" },
  33: { name: "Reserved for future definition", type: "R" },
  34: { name: "Reserved for future definition", type: "R" },
  35: { name: "Reserved for future definition", type: "R" },
  37: { name: "Reserved for future definition", type: "R" },
  38: { name: "Reserved for future definition", type: "R" },
  39: { name: "Reserved for future definition", type: "R" },
  40: { name: "Reserved for future definition", type: "R" },
  41: { name: "Reserved for future definition", type: "R" },
  42: { name: "Reserved for future definition", type: "R" },
  43: { name: "Reserved for future definition", type: "R" },
  44: { name: "Reserved for future definition", type: "R" },
  45: { name: "Reserved for future definition", type: "R" },
  46: { name: "Reserved for future definition", type: "R" },
  47: { name: "Reserved for future definition", type: "R" },
  48: { name: "Reserved for future definition", type: "R" },
  49: { name: "Reserved for future definition", type: "R" },
  50: { name: "Reserved for future definition", type: "R" },
  51: { name: "Reserved for future definition", type: "R" },
  52: {
    name: "Merchant Category Code",
    type: "P",
    format: "N",
    length_type: "F",
    length_min: 4,
    length_max: 4,
    usage: "M",
  },
  53: {
    name: "Transaction Currency Code",
    type: "P",
    format: "N",
    length_type: "F",
    length_min: 3,
    length_max: 3,
    usage: "M",
  },
  54: {
    name: "Transaction Amount",
    type: "P",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 13,
    usage: "O",
  },
  55: {
    name: "Tip or Convenience Fee Indicator",
    type: "P",
    format: "N",
    length_type: "F",
    length_min: 2,
    length_max: 2,
    usage: "O",
  },
  56: {
    name: "Value of Convenience Fee ??? Flat",
    type: "P",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 13,
    usage: "C",
  },
  57: {
    name: "Value of Convenience Fee ??? Percentage",
    type: "P",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 5,
    usage: "C",
  },
  58: {
    name: "Country Code",
    type: "P",
    format: "AN",
    length_type: "F",
    length_min: 2,
    length_max: 2,
    usage: "M",
  },
  59: {
    name: "Merchant Name",
    type: "P",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 25,
    usage: "M",
  },
  60: {
    name: "Merchant City",
    type: "P",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 15,
    usage: "M",
  },
  61: {
    name: "Postal Code",
    type: "P",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 10,
    usage: "O",
  },
  62: {
    name: "Additional Data Field",
    type: "C",
    format: "AN",
    length_type: "V",
    length_min: 0,
    length_max: 99,
    usage: "O",
    nested: {
      "01": {
        name: "Bill Number",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "02": {
        name: "Mobile Number",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "03": {
        name: "Store ID",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "04": {
        name: "Loyalty Number",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "05": {
        name: "Reference ID",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "06": {
        name: "Consumer ID",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "07": {
        name: "Terminal ID",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "08": {
        name: "Purpose",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
      "09": {
        name: "Additional Consumer Data Request",
        type: "P",
        format: "AN",
        length_type: "V",
        length_min: 0,
        length_max: 26,
        usage: "O",
      },
    },
  },
  63: {
    name: "CRC",
    type: "P",
    format: "AN",
    length_type: "F",
    length_min: 4,
    length_max: 4,
    usage: "M",
  },
};

// 'data' should look like "01050010203000..." etc.
// In other words: TLVs, serialized, as one big string.
// A TLV object is returned. Use it to look up Values by Tag name.
// TLV['01'] will contain the value of tag 01.
const parseTags = (data, parent) => {
  parent = parent || null;
  const TLV = {}; // results go here

  // inner method to read data for a tag
  function readData(tag) {
    console.log("Current data string: " + data + "\n");

    let tagType = "P";
    tagType = !parent
      ? BQRFormat[tag].type
      : BQRFormat[parent].nested[tag].type;
    console.log("Tag Type: " + tagType + "\n");

    data = data.slice(TAG_NAME_LENGTH); // get past tag name
    let length = data.substr(0, TAG_LEN_LENGTH); // find the Length (the L in TLV)
    length = parseInt(length); // cast to Number
    console.log("Length: " + length + "\n");
    data = data.slice(TAG_LEN_LENGTH); // get past length
    const V = data.substr(0, length);
    console.log("Value: " + V + "\n");
    console.log("Parent Tag: " + parent + "\n");

    if (tagType === "C") {
      // constructed tag
      const tmptlv = parseTags(V, tag);
      console.log(
        "Push Tag: " + tag + " => " + "Value: " + String(tmptlv) + "\n"
      );
      // push the nested TLV onto the TLV array
      TLV[tag] = tmptlv;
    } else if (tagType === "P") {
      // primitive tag
      console.log("Push Tag: " + tag + " => " + "Value: " + V + "\n");
      // push the V onto the TLV array
      TLV[tag] = V;
    } else if (tagType === "R") {
      // Warning: reserved tag, assumed to work like primitive
      console.log("Push Tag: " + tag + " => " + "Value: " + V + "\n");
      // push the V onto the TLV array
      TLV[tag] = V;
    }

    data = data.slice(length); // get past the data
  }

  let tag;

  while (true) {
    if (data === "") break;
    tag = data.substr(0, TAG_NAME_LENGTH);
    console.log("Tag: " + tag + "\n");
    if (tag in BQRFormat) {
    } else {
      console.log("Expected a Bharat QR tag, found none. Data: \n" + data);
      break; // Unrecognized tag, stop parsing
    }
    readData(tag); // This method shortens data TLV element each time
  }

  return TLV; // return an object in which TLV[ key ] == V
};

const validate = (data, TLV) => {
  const validateCRC = () => {};

  const validateTag = (tag, value) => {
    const type = BQRFormat[tag].type;
    const format = BQRFormat[tag].format;
    const length_type = BQRFormat[tag].length_type;
    const min_lenth = BQRFormat[tag].length_min;
    const max_lenth = BQRFormat[tag].length_max;
    const usage = BQRFormat[tag].usage;
  };

  const validateTags = () => {
    for (tag in TLV) {
      const value = TLV[tag];
      validateTag(tag, value);
    }
  };
};

const CRC16CCITT = (data) => {
  const toUTF8Array = (str) => {
    const utf8 = unescape(encodeURIComponent(str));
    const arr = new Array(utf8.length);
    for (let i = 0; i < utf8.length; i++) arr[i] = utf8.charCodeAt(i);
    return arr;
  };

  let crc = 0xffff; // initial value
  const polynomial = 0x1021; // 0001 0000 0010 0001  (0, 5, 12)

  const bytes = toUTF8Array(data);

  for (let j = 0, len = bytes.length; j < len; j++) {
    const b = bytes[j];
    for (let i = 0; i < 8; i++) {
      const bit = ((b >> (7 - i)) & 1) == 1;
      const c15 = ((crc >> 15) & 1) == 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }

  crc &= 0xffff;
  const ret = Number(crc).toString(16);
  console.log("CRC16-CCITT = " + ret);
  return ret;
};

const prettyPrint = (tlv) => {
  for (const prop in tlv) {
    console.log(`${obj.prop} = ${obj[prop]}`);
    console.log(prop);
  }
};

export { sampleQR, parseTags, validate, CRC16CCITT, prettyPrint };
