import LightningModal from 'lightning/modal';
import Modal_Save from '@salesforce/label/c.Modal_Save';
import Modal_Cancel from '@salesforce/label/c.Modal_Cancel';
import Modal_InputLabel from '@salesforce/label/c.Modal_InputLabel';
import Modal_HeaderTitle from '@salesforce/label/c.Modal_HeaderTitle';

/**
 * This modal component provides an input field where users can enter text. 
 * Pressing "Save" returns the input text to the parent component.
 * 
 * @class ModalComponent
 * @extends LightningModal
 * @author DeQuan Mitchell
 */
export default class ModalComponent extends LightningModal {
    /** 
     * Stores the user's input text
     * 
     * @type {string}
     * @memberof ModalComponent
    */
    inputText = '';

    /** 
     * Holds label values for UI text
     * 
     * @type {Object}
     * @memberof ModalComponent
    */
    labels = {
        headerTitle: Modal_HeaderTitle,
        inputLabel: Modal_InputLabel,
        save: Modal_Save,
        cancel: Modal_Cancel
    };

    /** 
     * Flag to ensure focus is set only once when the component is initally rendered
     * 
     * @type {boolean}
     * @memberof ModalComponent
    */
    rendered = false;

    /** 
     * Sets focus on the input field when the modal is rendered
     * 
     * @callback
     * @memberof ModalComponent
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
     * @memberof ModalComponent
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
     * @param {Event} event - The event object containing the input field value
     * @memberof ModalComponent
     */
    handleInputChange(event) {
        this.inputText = event.target.value;
    }

    /**
     * Closes the modal and returns the user input to the parent component.
     * If no input is provided, it returns `null`.
     * 
     * @returns {string|null} The user input if provided, otherwise `null`.
     * @memberof ModalComponent
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
     * @returns {void} This does not return a value
     * @memberof ModalComponent
     */
    handleCancel() {
        this.close(null);
    }
}
