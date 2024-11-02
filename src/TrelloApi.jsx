import axios from "axios";

import { Key, Token, baseUrl } from "./Config";


// Globally attaches to all request by default

axios.defaults.params = {
    key: Key,
    token: Token
}

export const getAllBoards = async () => {
    const response = await axios.get(
        `${baseUrl}/members/me/boards?fields=name`
    )
    return response
}

export const createBoardByName = async (boardName) => {
    const response = await axios.post(
        `${baseUrl}/boards/?name=${boardName}`
    )
    return response
}

export const getAllLists = async (id) => {
    const res = await axios.get(`${baseUrl}/boards/${id}/lists`);
    return res;
}

export const createList = async (boardId, listName) => {
    const res = await axios.post(`${baseUrl}/boards/${boardId}/lists?name=${listName}`);
    return res;
}

export const deleteListById = async listId => {
    const res = await axios.put(`${baseUrl}/lists/${listId}/closed?&value=true`);
    return res;
}

export const getAllCardByListId = async (listId) => {
    const res = await axios.get(`${baseUrl}/lists/${listId}/cards`);
    return res;

}

export const createCard = async (listId, cardName) => {
    const res = await axios.post(`${baseUrl}/cards?idList=${listId}&name=${cardName}`);
    return res;
}

export const deleteCardByID = async (cardId) => {
    const res = await axios.delete(`${baseUrl}/cards/${cardId}`);
}

export const getCheckList = async cardId => {
    const response = await axios.get(
        `${baseUrl}/cards/${cardId}/checklists?`
    )
    return response
}
export const createCheckListById = async (cardId, name) => {
    const response = await axios.post(
        `${baseUrl}/cards/${cardId}/checklists?&name=${name}`
    )
    return response
}
export const deleteCheckListById = async (cardId, checkListId) => {
    const response = await axios.delete(
        `${baseUrl}/cards/${cardId}/checklists/${checkListId}?`
    )
    return response
}

export const getCheckItems = async (checkListId) => {
    const response = await axios.get(
        `${baseUrl}/checklists/${checkListId}/checkItems?`
    )
    return response
}

export const createCheckItems = async (checkListId, name) => {
    const response = await axios.post(
        `${baseUrl}/checklists/${checkListId}/checkItems?name=${name}`
    )
    return response
}

export const deleteCheckItemById = async (checkListId, checkItemId) => {
    const response = await axios.delete(
        `${baseUrl}/checklists/${checkListId}/checkItems/${checkItemId}?`
    )
    return response
}

export const updateCheckItems = async (
    cardId,
    checkListId,
    itemId,
    newState
) => {
    const response = await axios.put(
        `${baseUrl}/cards/${cardId}/checklist/${checkListId}/checkItem/${itemId}?&state=${newState}`
    )
    return response
}