export const events = {
  LOADING_START: 'loading_start',
  LOADING_STOP: 'loading_stop',
  REQUEST_ERROR: 'request_error',
  DIALOG_ERROR: 'dialog_error_visible',

  SAVE: 'save',
  CANCEL: 'cancel',
  SUBMIT: 'submit',
  FILTER: 'filter'
}

export const VERTICAL = 'vertical'
export const TOKEN = 'token'

export const menus = [
  {
    routeName: 'list',
    name: 'Empresas',
    abbreviation: 'E'
  }
]

export default {
  events,
  menus,
  TOKEN
}
