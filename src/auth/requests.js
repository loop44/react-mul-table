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
      alert(Object.values(result.errors)?.[0]?.[0]) || 'Failed to Register';
    }
    return result;
  } catch (error) {
    alert(error.message);
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
      alert('Invalid login or password');
    } else if (result.errors) {
      alert('Failed to login');
    }
    return result;
  } catch (error) {
    alert(error.message);
  }
};
