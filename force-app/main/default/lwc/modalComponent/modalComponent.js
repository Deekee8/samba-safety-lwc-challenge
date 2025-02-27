import LightningModal from 'lightning/modal';
import Modal_Save from '@salesforce/label/c.Modal_Save';
import Modal_Cancel from '@salesforce/label/c.Modal_Cancel';
import Modal_InputLabel from '@salesforce/label/c.Modal_InputLabel';
import Modal_HeaderTitle from '@salesforce/label/c.Modal_HeaderTitle';

/**
 * @class ModalComponent
 * @extends LightningModal
 * @description This modal component provides an input field where users can enter text. 
 *              Pressing "Save" returns the input text to the parent component.
 * @author DeQuan Mitchell
 */
export default class ModalComponent extends LightningModal {
    /** @type {string} - Stores the user's input text. */
    inputText = '';

    /** @type {Object} - Holds label values for UI text. */
    labels = {
        headerTitle: Modal_HeaderTitle,
        inputLabel: Modal_InputLabel,
        save: Modal_Save,
        cancel: Modal_Cancel
    };

    /** @type {boolean} - Flag to ensure focus is set only once when the component is initally rendered. */
    rendered = false;

    /** 
     * Sets focus on the input field when the modal is rendered. 
     */
    renderedCallback() {
        if (!this.rendered) {
            setTimeout(() => {
                const inputField = this.template.querySelector('[data-id="textInput"]');
                if (inputField) {
                    inputField.focus();
                }
            }, 10);
            this.rendered = true;
        }
    }

    /**
     * Handles keydown events. If Enter is pressed, it triggers save.
     * 
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSave();
        }
    }

    /**
     * Updates `inputText` when the user types in the input field.
     * 
     * @param {Event} event - The event object containing the input field value.
     */
    handleInputChange(event) {
        this.inputText = event.target.value;
    }

    /**
     * Closes the modal and returns the user input to the parent component.
     * If no input is provided, it returns `null`.
     * 
     * @returns {string|null} The user input if provided, otherwise `null`.
     */
    handleSave() {
        if (this.inputText.trim() === '') {
            this.close(null);
        } else {
            this.close(this.inputText);
        }
    }

    /**
     * Closes the modal without returning any value.
     * The parent component will receive `null`, but the function itself does not return anything.
     * 
     * @returns {void} This function does not return a value.
     */
    handleCancel() {
        this.close(null);
    }
}
