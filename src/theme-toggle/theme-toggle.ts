import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import CSS from './theme-toggle.scss';

@customElement('xmas-theme-toggle')
export class ThemeToggle extends LitElement {
	static styles = CSS;

	@query('#switch')
	button!: HTMLInputElement;

	render(): TemplateResult {
		return html`
			<input type="checkbox" id="switch" /><label for="switch">Toggle</label>
		`;
	}

	/*
	private storageKey = 'theme-preference';
	private theme = '';

	private getColorPreference(): string {
		let result: string = '';
		if (localStorage.getItem(this.storageKey)) {
			result = localStorage.getItem(this.storageKey) ?? '';
		} else {
			result = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		}
		console.log('result:', result);
		return result;
	}

	private setPreference(): void {
		localStorage.setItem(this.storageKey, this.theme);
		this.reflectPreference();
	}

	private reflectPreference() {
		this.button.setAttribute('data-theme', this.theme);
		this.button.setAttribute('aria-label', this.theme);
	}

	private addWindowListeners(): void {
		window.onload = () => {
			// set on load so screen readers can see latest value on the button
			this.reflectPreference();

			// now this script can find and listen for clicks on the control
			this.button.addEventListener('click', this.onClick);
		};

		// sync with system changes
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', ({ matches: isDark }) => {
				this.theme = isDark ? 'dark' : 'light';
				this.setPreference();
			});
	}

	private onClick = (_e: MouseEvent): void => {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		this.setPreference();
	};
	*/

	private onClick = (_e: MouseEvent): void => {
		const href = this.stylesheet?.getAttribute('href');
		if (href === '../themes/light-theme.css') {
			this.stylesheet?.setAttribute('href', '../themes/dark-theme.css');
		} else {
			this.stylesheet?.setAttribute('href', '../themes/light-theme.css');
		}
	};

	private get stylesheet(): HTMLElement | null {
		console.log('get stylesheet()');
		return document.getElementById('theme-stylesheet');
	}

	private addStylesheet(): void {
		const stylesheet = this.stylesheet;
		if (!stylesheet) {
			const newStylesheet = document.createElement('link');
			newStylesheet.id = 'theme-stylesheet';
			newStylesheet.rel = 'stylesheet';
			newStylesheet.href = '../themes/light-theme.css';
			document.head.appendChild(newStylesheet);
		}
	}

	firstUpdated(changedProperties: PropertyValues): void {
		super.firstUpdated?.(changedProperties);

		console.log('this.button', this.button);
		/*
		this.theme = this.getColorPreference();

		this.getColorPreference();
		this.setPreference();
		this.reflectPreference();

		this.addWindowListeners();
		*/

		this.button.addEventListener('click', this.onClick);
		this.addStylesheet();
	}

	disconnectedCallback(): void {
		this.button.removeEventListener('click', this.onClick);
		super.disconnectedCallback?.();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'xmas-theme-toggle': ThemeToggle;
	}
}
