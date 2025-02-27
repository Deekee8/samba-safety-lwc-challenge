import { LightningElement, track } from 'lwc';
import ModalComponent from 'c/modalComponent';
import Button_DefaultLabel from '@salesforce/label/c.Button_DefaultLabel';
import Component_Title from '@salesforce/label/c.Component_Title';

/**
 * @class BaseComponent
 * @extends LightningElement
 * @description This component displays a button that opens a modal. 
 *              The button label updates based on user input from the modal.
 * @author DeQuan Mitchell
 */
export default class BaseComponent extends LightningElement {

    /** @type {string} Label for the button (updates dynamically) */
    @track buttonLabel = Button_DefaultLabel;

    /** @type {Object} Labels for component UI text */
    labels = {
        componentTitle: Component_Title
    };

    /**
     * Handles the button click to open the modal.
     * If a result is returned from the modal, it updates the button label.
     * 
     * @async
     * 
     * @returns {Promise<void>}
     */
    async handleClick() {
        try {
            const result = await ModalComponent.open({});
            if (result) {
                this.buttonLabel = result;
            }
        } catch (error) {
            console.error('Error:', error?.message || error, error?.stack || '');
        }
    }
}
