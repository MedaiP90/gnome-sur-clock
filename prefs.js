"use strict";

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {}

function fillPreferencesWindow(window) {
  // Use the same GSettings schema as in `extension.js`
  const settings = ExtensionUtils.getSettings("com.medaip90.Sur_Clock");

  // Create a preferences page and group
  const page = new Adw.PreferencesPage();
  const group = new Adw.PreferencesGroup();

  page.add(group);

  // Create a new preferences row
  const row = new Adw.ActionRow({ title: "Clock position" });

  group.add(row);

  // Create the combo-box and bind its value to the `clock-position` key
  let model = new Gtk.ListStore();

  model.append ([0, "Left of system indicators"]);
  model.append ([1, "Right of system indicators"]);

  const positionCombo = Gtk.ComboBox.new_with_model(model);

  positionCombo.set_active(settings.get_int("clock-position"));
  settings.bind("clock-position", positionCombo, "active", Gio.SettingsBindFlags.DEFAULT);

  // Add the combo-box to the row
  row.add_suffix(positionCombo);
  row.activatable_widget = positionCombo;

  // Add our page to the window
  window.add(page);
}
