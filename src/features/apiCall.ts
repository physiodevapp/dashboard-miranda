type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  token?: string | null;
  apiUrl?: string;
  body?: object | null;
};

export const fetchData = async <T = any>(url: string, options: RequestOptions = {}): Promise<T | T[]> => {
  const {
    method = 'GET',
    token = localStorage.getItem('authToken'), 
    apiUrl = 'http://localhost:3000',
    body = null,
  } = options;

  const fullUrl = `${apiUrl}/${url}`;

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData: T | T[] = await response.json();
    return responseData;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
