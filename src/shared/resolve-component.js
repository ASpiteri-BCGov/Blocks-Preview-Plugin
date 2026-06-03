/**
 * WordPress dependencies
 */
import * as components from '@wordpress/components';
import { Notice } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Resolves a component from wp.components, including pre-6.8 experimental names.
 *
 * @param {string} stableName       Stable export (WordPress 6.8+).
 * @param {string} experimentalName Legacy __experimental* export.
 * @return {import('react').ComponentType|undefined} Resolved component, if available.
 */
export function resolveComponent( stableName, experimentalName ) {
	return components[ stableName ] || components[ experimentalName ];
}

/**
 * Shown when the editor's WordPress version does not expose the component.
 *
 * @param {Object} props
 * @param {string} props.componentName Display name for the missing component.
 */
export function ComponentUnavailable( { componentName } ) {
	return (
		<Notice status="warning" isDismissible={ false }>
			{ sprintf(
				/* translators: 1: component name, 2: minimum WordPress version */
				__(
					'%1$s is not available in this WordPress version. Update to WordPress %2$s or newer.',
					'blocks-preview'
				),
				componentName,
				'6.8'
			) }
		</Notice>
	);
}
