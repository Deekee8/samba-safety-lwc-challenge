import { LightningElement, track } from 'lwc';
import ModalComponent from 'c/modalComponent';
import Button_DefaultLabel from '@salesforce/label/c.Button_DefaultLabel';
import Component_Title from '@salesforce/label/c.Component_Title';

/**
 * This component displays a button that opens a modal. 
 * The button label updates based on user input from the modal.
 * 
 * @class BaseComponent
 * @extends LightningElement
 * @author DeQuan Mitchell
 */
export default class BaseComponent extends LightningElement {

    /** 
     * Label for the button (updates dynamically)
     * 
     * @type {string}
     * @memberof BaseComponent
     * */
    @track buttonLabel = Button_DefaultLabel;

    /** 
     * Labels for component UI text
     * 
     * @type {Object}
     * @memberof BaseComponent
    */
    labels = {
        componentTitle: Component_Title
    };

    /**
     * Handles the button click to open the modal.
     * If a result is returned from the modal, it updates the button label.
     * 
     * @async
     * @returns {Promise<void>}
     * @memberof BaseComponent
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
