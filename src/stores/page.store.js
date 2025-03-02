import { PopupTypes } from '../utils/constants';
import { map } from 'lodash';
import { makeAutoObservable } from 'mobx';

const defaultConfirmModalParams = {
  text: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmHandler: () => {},
};

class PageStore {
  confirmModalParams = defaultConfirmModalParams;
  popupMessage = null;

  constructor() {
    makeAutoObservable(this);
  }

  setConfirmModalParams(params) {
    this.confirmModalParams = {
      ...this.confirmModalParams,
      ...params,
    };
  }

  clearConfirmModalParams() {
    this.confirmModalParams = defaultConfirmModalParams;
  }

  setPopupMessage(msg) {
    this.popupMessage = msg;
  }

  errorHandler(error) {
    if (error?.response && error?.response?.status === 422) {
      map(error.response.data.data.errors, (error) => {
        setTimeout(() => {
          this.setPopupMessage({
            type: PopupTypes.Error,
            message: error,
          });
        }, 100);
      });
    } else if (error?.response && error?.response?.status === 401) {
      this.setPopupMessage({
        type: PopupTypes.Error,
        message: error.response.data.message,
      });
    } else if (error?.response?.data) {
      this.setPopupMessage({
        type: PopupTypes.Error,
        message: error.response.data.message,
      });
    } else {
      this.setPopupMessage({
        type: PopupTypes.Error,
        message: error.message,
      });
    }
  }
}

export default new PageStore();
