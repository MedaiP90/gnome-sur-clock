/* prefs.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

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

    this._settings = ExtensionUtils.getSettings("org.gnome.shell.extensions.sur-clock");

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
