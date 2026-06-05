/**
 * WordPress dependencies
 */
import * as components from '@wordpress/components';

/**
 * Resolves Navigator and subcomponents across WordPress versions.
 *
 * @return {{
 *   Navigator: import('react').ComponentType|undefined,
 *   Screen: import('react').ComponentType|undefined,
 *   Button: import('react').ComponentType|undefined,
 *   BackButton: import('react').ComponentType|undefined,
 * }} Resolved Navigator component parts.
 */
export function getNavigatorComponents() {
	const Navigator =
		components.Navigator || components.__experimentalNavigatorProvider;

	if ( Navigator?.Screen && Navigator?.Button && Navigator?.BackButton ) {
		return {
			Navigator,
			Screen: Navigator.Screen,
			Button: Navigator.Button,
			BackButton: Navigator.BackButton,
		};
	}

	return {
		Navigator,
		Screen: components.__experimentalNavigatorScreen,
		Button: components.__experimentalNavigatorButton,
		BackButton: components.__experimentalNavigatorBackButton,
	};
}

/**
 * @return {boolean} Whether all Navigator parts are available.
 */
export function canRenderNavigator() {
	const { Navigator, Screen, Button, BackButton } = getNavigatorComponents();
	return Boolean( Navigator && Screen && Button && BackButton );
}
