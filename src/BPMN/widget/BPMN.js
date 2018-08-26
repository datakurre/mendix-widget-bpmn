/*global logger*/
/*
    BPMN
    ========================

    @file      : BPMN.js
    @version   : 1.0
    @author    : Asko Soukka
    @date      : 2018-08-26
    @copyright : Asko Soukka <asko.soukka@iki.fi>
    @license   : MIT

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list.
define([
  "dojo/_base/declare",
  "mxui/widget/_WidgetBase",
  "dijit/_TemplatedMixin",

  "dojo/dom-style",

  "BPMN/lib/bpmn-viewer.production.min",
  "dojo/text!BPMN/widget/template/BPMN.html"
], function (declare, _WidgetBase, _TemplatedMixin, dojoStyle, _BPMN, widgetTemplate) {
  "use strict";

  // Declare widget's prototype.
  return declare("BPMN.widget.BPMN", [_WidgetBase, _TemplatedMixin], {
    // _TemplatedMixin will create our dom node using this HTML template.
    templateString: widgetTemplate,

    // DOM elements
    bpmnNode: null,

    // Parameters configured in the Modeler.
    xml: "",
    xmlAttribute: "",
    highlight: "",
    highlightAttribute: "",

    // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
    constructor: function () {
      logger.debug(this.id + ".constructor");
    },

    // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
    postCreate: function () {
      logger.debug(this.id + ".postCreate");
    },

    // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
    update: function (obj, callback) {
      logger.debug(this.id + ".update");
      dojoStyle.set(this.domNode, "display", "block");
      var bpmnJS = new _BPMN({ container: this.bpmnNode });
      var xml = obj.get(this.xmlAttribute) || this.xml;
      var highlight = obj.get(this.highlightAttribute) || this.highlight;
      bpmnJS.importXML(xml, function (err) {
        if (!err) {
          bpmnJS.get('canvas').zoom('fit-viewport');
          if (highlight) {
            bpmnJS.get('canvas').addMarker(highlight, 'bpmn-highlight');
          }
        } else {
          console.log('something went wrong:', err);
        }
      });
      if (callback && typeof callback === "function") {
        callback();
      }
    }
  });
});

require(["BPMN/widget/BPMN"]);
