import { reqTypes } from '../consts/reqTypes';

const baseUrl = 'https://internsapi.public.osora.ru/api/';

const createUrl = (reqType) => {
  switch (reqType) {
    case reqTypes.LOGIN:
      return `${baseUrl}auth/login`;
    case reqTypes.REGISTER:
      return `${baseUrl}auth/signup`;
    case reqTypes.GAME_START:
    case reqTypes.GAME_ANSWER:
      return `${baseUrl}game/play`;

    default:
      throw new Error('Something went wrong');
  }
};

const createBody = (reqData, reqType) => {
  switch (reqType) {
    case reqTypes.LOGIN:
    case reqTypes.REGISTER:
      return reqData;
    case reqTypes.GAME_START:
      return {
        type_hard: Number(reqData),
        type: 1
      };
    case reqTypes.GAME_ANSWER:
      return {
        answer: Number(reqData.value),
        type_hard: Number(reqData.difficult),
        type: 2
      };

    default:
      throw new Error('Something went wrong');
  }
};

export default async (reqData, reqType) => {
  try {
    const response = await fetch(createUrl(reqType), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(createBody(reqData, reqType))
    });

    const result = await response.json();
    if (result.errors === 'Unauthorized') {
      throw new Error('Invalid login or password');
    }
    if (result.errors) {
      throw new Error(Object.values(result.errors)?.[0]?.[0] || 'Failed to fetch');
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
