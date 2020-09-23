import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';

export interface MessageBarAction {
  message: string;
  blockUI?: boolean;
  action?: () => void;
  dismiss?: () => void;
  validate?: string;
  cancel?: string;
}

@Component({
  selector: 'message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageBarComponent {

  timeout: any;

  set action(action: MessageBarAction) {
    if(this.remove ) {
      this.queue.push(action);
    } else {
      if(this.timeout) clearTimeout(this.timeout);
      this._action = action;
      if(action && !action.action) {
        this.timeout = setTimeout(() => this.dismiss(), 4200);
      }
    }
  }

  set showModal(value: boolean) {
    if(value) {
      this.openModal();
    } else if(value !== undefined) {
      this.closeModal();
    }
  }

  modalTimeout: any;
  modal: {
    show: boolean,
    name?: string,
    blockUI?: boolean,
    onClose?: (_: boolean) => void,
    content: TemplateRef<any>;

    add?: boolean,
    animateOverlay?: boolean,
    animateModal?: boolean
  } = {
    show: false,
    name: 'messageBar',
    blockUI: false,
    onClose: () => undefined,
    content: undefined,

    add: false,
    animateModal: false,
    animateOverlay: false
  };
  remove = false;
  _action: MessageBarAction;
  private queue: MessageBarAction[] = [];

  openModal() {
    this.modal.add = true;
    if(this.modalTimeout) clearTimeout(this.modalTimeout);
    this.modalTimeout = setTimeout(() => {
      this.modal.animateOverlay = true;
      this.modal.animateModal = true;
    }, 100);
  }

  closeModal(confirm?: boolean) {
    this.modal.show = false;
    this.modal.animateOverlay = false;
    this.modal.animateModal = false;
    if(this.modalTimeout) clearTimeout(this.modalTimeout);
    this.modalTimeout = setTimeout(() => {
      this.modal.add = false;
      this.modal.onClose(confirm);
      // Reset
      this.modal.onClose = () => undefined;
      this.modal.content = undefined;
      this.modal.blockUI = false;
      this.modal.name = 'messageBar';
    }, 300);
  }

  dismiss() {
    if(this.remove) return;
    this.remove = true;
    setTimeout(() => {
      this.remove = false;
      this.action = undefined;
      this._action = undefined;
      if(this.queue.length > 0) {
        this.action = this.queue.shift();
      }
    }, 400);
  }
}
