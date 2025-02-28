import { makeAutoObservable } from 'mobx';

const defaultConfirmModalParams = {
  text: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmHandler: () => {},
};

class PageStore {
  confirmModalParams = defaultConfirmModalParams;

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
}

export default new PageStore();
