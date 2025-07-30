import axios from 'axios';

// Using JSONPlaceholder API as mentioned in the requirements
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all users - this should return an array of user objects
export const getUsers = async () => {
  console.log('Fetching all users from API...');
  try {
    const response = await apiClient.get('/users');
    console.log('Users fetched successfully! Got', response.data.length, 'users');
    return response.data;
  } catch (error) {
    console.error('Failed to get users:', error);
    throw error;
  }
};

// Get single user by id
export const getUserById = async (id) => {
  console.log(`Fetching user with id: ${id}`);
  try {
    const response = await apiClient.get(`/users/${id}`);
    console.log('User data received for:', response.data.name);
    return response.data;
  } catch (error) {
    console.error(`Failed to get user ${id}:`, error);
    throw error;
  }
};

// Get all posts - for the main page list
export const getPosts = async () => {
  console.log('Loading posts data...');
  try {
    const response = await apiClient.get('/posts');
    console.log('Posts loaded successfully! Total:', response.data.length, 'posts');
    return response.data;
  } catch (error) {
    console.error('Failed to load posts:', error);
    throw error;
  }
};

// Get single post by id - for detail page
export const getPostById = async (id) => {
  console.log(`Getting post details for id: ${id}`);
  try {
    const response = await apiClient.get(`/posts/${id}`);
    console.log('Post retrieved:', response.data.title.substring(0, 30) + '...');
    return response.data;
  } catch (error) {
    console.error(`Failed to get post ${id}:`, error);
    throw error;
  }
};

// Get posts by specific user - might be useful for user profiles
export const getPostsByUserId = async (userId) => {
  console.log(`Fetching posts written by user ${userId}`);
  try {
    const response = await apiClient.get(`/posts?userId=${userId}`);
    console.log(`Found ${response.data.length} posts by user ${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get posts for user ${userId}:`, error);
    throw error;
  }
};

// Get comments for a post - adding this for the detail page
export const getCommentsByPostId = async (postId) => {
  console.log(`Loading comments for post ${postId}`);
  try {
    const response = await apiClient.get(`/comments?postId=${postId}`);
    console.log(`Retrieved ${response.data.length} comments`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get comments for post ${postId}:`, error);
    throw error;
  }
};