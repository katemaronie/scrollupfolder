// Retrieve settings elements
const displayUrlbarIconCheckbox = document.querySelector("#display-urlbar-icon-checkbox");
const enableShortcutsCheckbox = document.querySelector("#enable-shortcuts-checkbox");
const parseAnchorCheckbox = document.querySelector("#parse-anchor-checkbox");
const parseGetVariablesCheckbox = document.querySelector("#parse-get-variables-checbox");

/**
 * Attach event listener to settings elements.
 */
function attachListeners() {
	displayUrlbarIconCheckbox.addEventListener("change", saveOptions);
	enableShortcutsCheckbox.addEventListener("change", saveOptions);
	parseAnchorCheckbox.addEventListener("change", saveOptions);
	parseGetVariablesCheckbox.addEventListener("change", saveOptions);
}

/**
 * Bind current settings values to settings elements.
 */
function bindSettings(settings) {
	displayUrlbarIconCheckbox.checked = settings.displayUrlbarIcon;
	enableShortcutsCheckbox.checked = settings.enableShortcuts;
	parseAnchorCheckbox.checked = settings.parseAnchor;
	parseGetVariablesCheckbox.checked = settings.parseGetVariables;
}

/**
 * Save the current settings elements values.
 */
function saveOptions() {
	browser.storage.sync.set({
		"settings": {
			displayUrlbarIcon: displayUrlbarIconCheckbox.checked,
			enableShortcuts: enableShortcutsCheckbox.checked,
			parseAnchor: parseAnchorCheckbox.checked,
			parseGetVariables: parseGetVariablesCheckbox.checked
		}
	}).then(null, error => {
		console.error("Unable to save settings: " + error);
	})
}

/**
 * Load settings current values.
 */
function loadOptions() {
	// Get the user settings (defining default options otherwise)
	browser.storage.sync.get({
		"settings": {
			displayUrlbarIcon: true,
			enableShortcuts: true,
			parseAnchor: true,
			parseGetVariables: true
		}
	}).then(result => {
		bindSettings(result.settings);
		attachListeners();
	}, error => {
		console.error("Unable to load settings: " + error);
	});
}

// Bind content loaded event to start loading options
document.addEventListener("DOMContentLoaded", loadOptions);
