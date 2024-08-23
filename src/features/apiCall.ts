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
      const { error } = await response.json();

      if ([401, 403].includes(response.status)) {
        window.location.href = '/login';

        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      }
      
      throw new Error(error.message);
    }

    const responseData: T | T[] = await response.json();
    return responseData;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

type LoginOptions = {
  apiUrl?: string;
  body: object;
};

export const requestLogin = async <T>(url: string, options: LoginOptions = { body: {} }): Promise<T | null> => {
  const {
    apiUrl = 'http://localhost:3000',
    body = null,
  } = options;

  const fullUrl = `${apiUrl}/${url}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), 
    });

    if (!response.ok) {
      const { error } = await response.json();
      
      throw new Error(error.message);
    }

    const token = response.headers.get('Authorization')?.split("Bearer ")[1];
    if (token) {
      localStorage.setItem('authToken', token);
    }

    const responseData: T = await response.json();
    
    return responseData;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

