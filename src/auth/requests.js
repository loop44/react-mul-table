export const registerUser = async (user) => {
  try {
    const response = await fetch('https://internsapi.public.osora.ru/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(Object.values(result.errors)?.[0]?.[0] || 'Failed to Register');
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await fetch('https://internsapi.public.osora.ru/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });

    const result = await response.json();
    if (result.errors === 'Unauthorized') {
      throw new Error('Invalid login or password');
    }
    if (result.errors) {
      throw new Error('Failed to login');
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const startGame = async (difficult) => {
  try {
    const body = {
      type_hard: Number(difficult),
      type: 1
    };
    const response = await fetch('https://internsapi.public.osora.ru/api/game/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setAnswer = async (answer) => {
  try {
    const body = {
      answer: Number(answer.value),
      type_hard: Number(answer.difficult),
      type: 2
    };
    const response = await fetch('https://internsapi.public.osora.ru/api/game/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`${error.message}. Try to choose answer one more time`);
  }
};
