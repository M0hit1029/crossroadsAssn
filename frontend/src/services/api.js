const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const transformApiUserToDriver = (user) => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    address: user.address,
    company: user.company,
  };
};

export const fetchDrivers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch drivers');
  }
  const users = await response.json();
  return users.map(transformApiUserToDriver);
};
