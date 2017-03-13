export const UPDATE_LIST = 'UPDATE_LIST';

export function updateToDo(update) {
    return {
        type: UPDATE_LIST,
        update
    };
}
