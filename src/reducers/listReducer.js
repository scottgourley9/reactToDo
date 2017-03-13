import {UPDATE_LIST} from '../actions/updateToDo';

const defaultTemplate = {
  items: []
};
export default function (state = defaultTemplate, action) {
    switch (action.type) {
        case UPDATE_LIST:
        console.log(action)
            return Object.assign({}, state, action.update);
        default:
            return state;
    }
}
