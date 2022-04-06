"use strict";

const Gio = imports.gi.Gio;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

function init() {}

function buildPrefsWidget() {
  let settings = new SurClockPrefsWidget();
  let widget = settings.widget;

  widget.show();

  return widget;
}

const SurClockPrefsWidget = new GObject.Class({
  Name: "SurClock.Settings",

  _init: function(params) {
    this.parent(params);

    this._settings = ExtensionUtils.getSettings("com.medaip90.Sur_Clock");

    this.builder = new Gtk.Builder();

    this.builder.add_from_file(Me.path + '/prefs.ui');

    this.widget = this.builder.get_object('prefs-container');

    this._buildSettings();
  },

  _buildSettings: function() {
    let widget = this.builder.get_object("clock-position");

    widget.set_active(this._settings.get_int("clock-position"));
    widget.connect('changed', (w) => {
        this._settings.set_int("clock-position", w.get_active());
    });
  }

});
