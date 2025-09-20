/**
 * API Configuration
 * API endpoints and network configuration
 */

interface IApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  endpoints: {
    // Auth
    auth: {
      login: string;
      register: string;
      logout: string;
      refresh: string;
      forgotPassword: string;
      resetPassword: string;
      verifyEmail: string;
      resendVerification: string;
      changePassword: string;
    };
    // User
    user: {
      profile: string;
      updateProfile: string;
      uploadAvatar: string;
      deleteAccount: string;
      settings: string;
      notifications: string;
    };
    // Social
    social: {
      posts: string;
      post: (id: string) => string;
      createPost: string;
      updatePost: (id: string) => string;
      deletePost: (id: string) => string;
      likePost: (id: string) => string;
      unlikePost: (id: string) => string;
      comments: (postId: string) => string;
      createComment: (postId: string) => string;
      deleteComment: (postId: string, commentId: string) => string;
    };
    // Upload
    upload: {
      image: string;
      video: string;
      file: string;
      getPresignedUrl: string;
    };
  };
  // Response codes
  responseCodes: {
    success: number[];
    clientError: number[];
    serverError: number[];
    unauthorized: number;
    forbidden: number;
    notFound: number;
    timeout: number;
  };
}

const development: IApiConfig = {
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      verifyEmail: '/auth/verify-email',
      resendVerification: '/auth/resend-verification',
      changePassword: '/auth/change-password',
    },
    user: {
      profile: '/user/profile',
      updateProfile: '/user/profile',
      uploadAvatar: '/user/avatar',
      deleteAccount: '/user/delete',
      settings: '/user/settings',
      notifications: '/user/notifications',
    },
    social: {
      posts: '/posts',
      post: (id: string) => `/posts/${id}`,
      createPost: '/posts',
      updatePost: (id: string) => `/posts/${id}`,
      deletePost: (id: string) => `/posts/${id}`,
      likePost: (id: string) => `/posts/${id}/like`,
      unlikePost: (id: string) => `/posts/${id}/unlike`,
      comments: (postId: string) => `/posts/${postId}/comments`,
      createComment: (postId: string) => `/posts/${postId}/comments`,
      deleteComment: (postId: string, commentId: string) =>
        `/posts/${postId}/comments/${commentId}`,
    },
    upload: {
      image: '/upload/image',
      video: '/upload/video',
      file: '/upload/file',
      getPresignedUrl: '/upload/presigned-url',
    },
  },
  responseCodes: {
    success: [200, 201, 204],
    clientError: [400, 401, 403, 404, 409, 422],
    serverError: [500, 502, 503, 504],
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    timeout: 408,
  },
};

const staging: IApiConfig = {
  ...development,
  baseURL: 'https://api-staging.baseapp.com/v1',
};

const production: IApiConfig = {
  ...development,
  baseURL: 'https://api.baseapp.com/v1',
};

// Environment detection
const getEnvironment = (): 'development' | 'staging' | 'production' => {
  if (__DEV__) return 'development';
  // You can use environment variables or build configurations here
  return 'production';
};

const configs = {
  development,
  staging,
  production,
};

export const ApiConfig = configs[getEnvironment()];

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${ApiConfig.baseURL}${endpoint}`;
};

// Helper to check response status
export const isSuccessResponse = (status: number): boolean => {
  return ApiConfig.responseCodes.success.includes(status);
};

export const isClientError = (status: number): boolean => {
  return ApiConfig.responseCodes.clientError.includes(status);
};

export const isServerError = (status: number): boolean => {
  return ApiConfig.responseCodes.serverError.includes(status);
};

export type IApiEndpoints = typeof ApiConfig.endpoints;
