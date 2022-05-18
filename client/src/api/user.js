export const register = async ({ nom, email, password } = {}) => {
  const user = { nom, email, password };

  try {
    const res = await fetch(`http://localhost:8080/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Vous ne pouvez vous inscrire pour le moment ! ${err}`);
  }
};

export const login = async ({ email, password } = {}) => {
  const user = { email, password };

  try {
    const res = await fetch(`http://localhost:8080/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(res);
    return await res.json();
  } catch (err) {
    throw new Error(`Vous ne pouvez vous connecter pour le moment ! ${err}`);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const res = await fetch(`http://localhost:8080/user`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error("Veuillez vous connecter pour continuer !");
  }
};
