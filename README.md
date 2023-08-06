# Content Flow (CMS)

In the fast-paced digital world, managing content efficiently iscritical for businesses. A content management system (CMS) is atthe heart of this, enabling businesses to create, manage, andoptimize their digital content. As a part of your capstone project,you will develop a comprehensive CMS named "ContentFlow",drawing inspiration from Strapi, a popular open-source headless CMS.

> [Documentation (notion.so)](https://anandureghu.notion.site/ContentFlow-36752807b58d476787373f233202beb1?pvs=4)  
> [Github Repository](https://github.com/anandureghu/contentflow)

# Features

## Content Modeling:

Users should be able to define customcontent types with flexible fields. These could range from blog posts and product descriptions to user profiles and comments.This feature should facilitate flexible data structuring.

## API Generation:

The CMS should automatically generate RESTful APIs based on user-defined content types. Usersshould be able to fetch and manipulate data programmaticallyusing these APIs. This should support all basic CRUD (Create,Read, Update, Delete) operations.

## User Management:

Build-in user authentication mechanisms,such as JWT or OAuth, and implement role-based accesscontrol (RBAC) to manage user permissions effectively. Thissystem should handle user registration, login, and assign rolesthat define what actions they can perform.

## Media Management:

Build a media library within ContentFlowto manage files. This should support the uploading, organizing, and deleting of various file types like images,videos, and documents. Incorporate a way to connect themedia to the respective content types

# API Design

```
basePath = http://localhost:3000/api/v1
```

---

## **Auth**

---

### **POST** `/auth/register`

register a user

### **POST** `/auth/login`

login user

---

## **Model**

---

### **GET** `/models`

get all models

### **POST** `/models`

create new model

### **GET** `/models/:modelId`

get a model

### **PUT** `/models/:modelId`

update a model

### **DELETE** `/models/:modelId`

delete a model

### **POST** `/models/:modelId`

create new model data

### **GET** `/models/:modelId/:modelRowId`

get model data

### **PUT** `/models/:modelId`

update a model data

### **DELETE** `/models/:modelId/:modelRowId`

delete a model data

---

## **User**

---

### **GET** `/users`

get all users

### **POST** `/users`

create a user

### **GET** `/users/:userId`

get a user

### **PUT** `/users/:userId`

update a user

### **DELETE** `/users/:userId`

delete a user

# Response Formats

```
# success reponse
{
  code: number
  msg: string
  data: {} | []
}
```
```
# error response
{
  code: number
  msg: string
  errors: {} | []
}
```
