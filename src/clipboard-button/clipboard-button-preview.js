/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useRef } from '@wordpress/element';

const TIMEOUT_MS = 4000;

/** Default copy text; keep in sync with block.json `text` default. */
export const DEFAULT_CLIPBOARD_TEXT =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

/**
 * Normalizes copy text (must be a string).
 *
 * @param {unknown} text Attribute value from the block.
 * @return {string} Copy text safe for the clipboard.
 */
export function normalizeCopyText( text ) {
	if ( typeof text === 'string' ) {
		return text;
	}
	if ( text === null || text === undefined ) {
		return '';
	}
	return String( text );
}

/**
 * Resolves the text shown in the preview and copied to the clipboard.
 *
 * @param {unknown} text Block attribute value.
 * @return {string} Copy text, falling back to the default when empty.
 */
export function getCopyText( text ) {
	const normalized = normalizeCopyText( text );
	return normalized || DEFAULT_CLIPBOARD_TEXT;
}

/**
 * Copies text using the native clipboard API (avoids clipboard.js ref requirements).
 *
 * @param {string} text Text to copy.
 * @return {Promise<boolean>} Whether the copy succeeded.
 */
async function copyTextToClipboard( text ) {
	if ( navigator.clipboard?.writeText ) {
		try {
			await navigator.clipboard.writeText( text );
			return true;
		} catch {
			// Fall through to execCommand fallback.
		}
	}

	const textarea = document.createElement( 'textarea' );
	textarea.value = text;
	textarea.setAttribute( 'readonly', '' );
	textarea.style.position = 'fixed';
	textarea.style.left = '-9999px';
	document.body.appendChild( textarea );
	textarea.select();
	const success = document.execCommand( 'copy' );
	document.body.removeChild( textarea );
	return success;
}

/**
 * Clipboard button preview (same UX as ClipboardButton / useCopyToClipboard).
 *
 * @param {Object}                    props
 * @param {unknown}                   props.text           Text copied to the clipboard.
 * @param {Function}                  props.onCopy         Called after a successful copy.
 * @param {Function}                  [props.onFinishCopy] Called after the copy animation ends.
 * @param {import('react').ReactNode} props.children       Button label.
 */
export default function ClipboardButtonPreview( {
	text,
	onCopy,
	onFinishCopy,
	children,
	...buttonProps
} ) {
	const timeoutIdRef = useRef();
	const copyText = getCopyText( text );

	const handleClick = async () => {
		const success = await copyTextToClipboard( copyText );
		if ( ! success ) {
			return;
		}

		onCopy();

		if ( timeoutIdRef.current ) {
			clearTimeout( timeoutIdRef.current );
		}

		if ( onFinishCopy ) {
			timeoutIdRef.current = setTimeout( onFinishCopy, TIMEOUT_MS );
		}
	};

	return (
		<Button
			{ ...buttonProps }
			className="components-clipboard-button"
			__next40pxDefaultSize
			onClick={ handleClick }
		>
			{ children }
		</Button>
	);
}
