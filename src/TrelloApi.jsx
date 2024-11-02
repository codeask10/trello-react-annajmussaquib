import axios from "axios";

import { Key, Token } from "./config/Config";

const baseUrl = "https://api.trello.com/1/";

// Globally attaches to all request by default

axios.defaults.params = {
    key: Key,
    token: Token
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
