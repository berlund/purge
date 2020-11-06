var parser = require('fast-xml-parser')
var he = require('he');

export function parse(xmlData: string): any {
  var options = {
    attributeNamePrefix: "",
    //attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataTagName: "__cdata",
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false,
    attrValueProcessor: (val: any, attrName: any) => he.decode(val, { isAttributeValue: true }),
    tagValueProcessor: (val: any, tagName: any) => he.decode(val),
    stopNodes: ["parse-me-as-string"]
  };

  if (parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
    var jsonObj = parser.parse(xmlData, options);
  }

  // Intermediate obj
  var tObj = parser.getTraversalObj(xmlData, options);
  var jsonObj = parser.convertToJson(tObj, options);

  return jsonObj;
}