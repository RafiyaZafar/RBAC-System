import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import usersData from "./mockUsers";
import rolesData from "./mockRoles"; 


const axiosInstance = axios.create();


const mock = new MockAdapter(axiosInstance);

let users = JSON.parse(localStorage.getItem('users')) || [...usersData];
let roles = JSON.parse(localStorage.getItem('roles')) || [...rolesData];
let permissions = ["Read", "Write", "Delete"]; 


const updateLocalStorage = () => {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('roles', JSON.stringify(roles));
};

// User Management Endpoints

// GET all users
mock.onGet("/users").reply(200, users);

// POST new user
mock.onPost("/users").reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = Date.now(); 
  users.push(newUser);
  updateLocalStorage(); 
  return [201, newUser];
});

// PATCH (Edit) a user
mock.onPatch(/\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop()); 
  const updatedUser = JSON.parse(config.data);

  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return [404, { message: "User not found" }];
  }

  users[userIndex] = { ...users[userIndex], ...updatedUser };
  updateLocalStorage(); 
  return [200, users[userIndex]];
});

// DELETE a user
mock.onDelete(/\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop()); 
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return [404, { message: "User not found" }];
  }

  users.splice(userIndex, 1); 
  updateLocalStorage(); 
  return [204]; 
});

// Role Management Endpoints

// GET all roles
mock.onGet("/roles").reply(200, roles);

// POST new role
mock.onPost("/roles").reply((config) => {
  const newRole = JSON.parse(config.data);
  newRole.id = Date.now(); 
  roles.push(newRole);
  updateLocalStorage(); 
  return [201, newRole];
});

// PATCH (Edit) a role
mock.onPatch(/\/roles\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop()); 
  const updatedRole = JSON.parse(config.data);

  const roleIndex = roles.findIndex((role) => role.id === id);
  if (roleIndex === -1) {
    return [404, { message: "Role not found" }];
  }

  roles[roleIndex] = { ...roles[roleIndex], ...updatedRole };
  updateLocalStorage();
  return [200, roles[roleIndex]];
});

// DELETE a role
mock.onDelete(/\/roles\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const roleIndex = roles.findIndex((role) => role.id === id);
  if (roleIndex === -1) {
    return [404, { message: "Role not found" }];
  }

  roles.splice(roleIndex, 1); 
  updateLocalStorage(); 
  return [204]; 
});

// Permission Management Endpoints

// GET all permissions
mock.onGet("/permissions").reply(200, permissions);

export default axiosInstance;
