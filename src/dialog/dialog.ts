import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import CSS from './dialog.scss';

@customElement('xmas-dialog')
export class Dialog extends LitElement {
	static styles = CSS;

	@query('dialog')
	dialog!: HTMLDialogElement;

	@query('.close-button')
	closeButton!: HTMLButtonElement;

	@property({ type: Boolean, reflect: true })
	open = false;

	render(): TemplateResult {
		return html`
			<dialog ?open=${this.open}>
				<button class="close-button">Close</button>
				<p>This modal dialog has a groovy backdrop!</p>
			</dialog>
		`;
	}

	private onCloseButtonClick = () => this.dialog.close();

	firstUpdated(changedProperties: PropertyValues): void {
		super.firstUpdated?.(changedProperties);

		this.closeButton.addEventListener('click', this.onCloseButtonClick);
	}

	disconnectedCallback(): void {
		this.closeButton.removeEventListener('click', this.onCloseButtonClick);
		super.disconnectedCallback?.();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'xmas-dialog': Dialog;
	}
}
