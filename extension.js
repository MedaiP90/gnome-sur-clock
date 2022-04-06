/* extension.js
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

/* exported init */

// Settings imports
const Gio = imports.gi.Gio;
const St = imports.gi.St;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

// Ui imports
const Main = imports.ui.main;
const SessionMode = imports.ui.sessionMode;

class Extension {
  constructor() {}

  enable() {
    this._settings = ExtensionUtils.getSettings("org.gnome.shell.extensions.sur-clock");

    // Do nothing if the clock isn't centred
    if (Main.sessionMode.panel.center.indexOf("dateMenu") == -1) {
      return;
    }

    this._loadPanels("_centerBox");

    // Only move the clock if it's in the centre box
    if (this._children.indexOf(this._dateMenu.container) != -1) {
      this._centerBox.remove_actor(this._dateMenu.container);

      this._children = this._rightBox.get_children();

      this._rightBox.insert_child_at_index(
        this._dateMenu.container,
        this._getPosition(this._children.length - 1)
      );
    }
  }

  disable() {
    this._settings = null;

    // Do nothing if the clock isn't centred
    if (Main.sessionMode.panel.center.indexOf("dateMenu") == -1) {
      return;
    }

    this._loadPanels("_rightBox");

    // Only move the clock back if it's in the right box
    if (this._children.indexOf(this._dateMenu.container) != -1) {
      this._rightBox.remove_actor(this._dateMenu.container);
      this._centerBox.add_actor(this._dateMenu.container);
    }
  }

  _loadPanels(childName = "_centerBox") {
    this._centerBox = Main.panel._centerBox;
    this._rightBox = Main.panel._rightBox;
    this._dateMenu = Main.panel.statusArea["dateMenu"];
    this._children = this[childName].get_children();
  }

  _getPosition(defaultPosition) {
    let position = defaultPosition;

    switch (this._settings.get_int("clock-position")) {
      case 1: // Right of actions
        position = -1;
        break;
      default: // Left of actions
        position = defaultPosition;
        break;
    }

    return position;
  }
}

function init() {
  return new Extension();
}
