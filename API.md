API Documentation
Base URL
The base URL for all API endpoints is:
http://localhost:2000/api


---------------------------------------

Authentication

Sign Up
URL: /auth/signup
Method: POST
Description: Register a new user.
Request Body:
username (string, required): The username of the user.
email (string, required): The email address of the user.
password (string, required): The password of the user.
bio (string): Optional bio of the user.
profilePictureUrl (string): Optional URL to the profile picture of the user.
Response:
message: Success message.
token: JWT token for the newly registered user.

Login
URL: /auth/login
Method: POST
Description: Log in an existing user.
Request Body:
email (string, required): The email address of the user.
password (string, required): The password of the user.
Response:
token: JWT token for the logged-in user.


---------------------------------------

Profile

View Profile
URL: /profile
Method: GET
Description: Get the profile of the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Response:
username: Username of the user.
email: Email address of the user.
bio: Bio of the user.
profilePictureUrl: URL to the profile picture of the user.

Update Profile
URL: /profile
Method: PUT
Description: Update the profile of the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Request Body (Optional):
username (string): New username of the user.
bio (string): New bio of the user.
profilePictureUrl (string): New URL to the profile picture of the user.
Response:
Updated profile information.

Delete Profile
URL: /profile
Method: DELETE
Description: Delete the profile of the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Response:
Success message indicating the profile deletion.



---------------------------------------

Posts

Create Post
URL: /posts
Method: POST
Description: Create a new post.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Request Body:
content (string, required): Content of the post.
Response:
Newly created post object.

Read Own Posts
URL: /posts/myposts
Method: GET
Description: Get the posts created by the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Response:
List of posts created by the user.

Update Post
URL: /posts/:postId
Method: PUT
Description: Update a post created by the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Request Parameters:
postId (string, required): ID of the post to be updated.
Request Body:
content (string, required): New content of the post.
Response:
Updated post object.

Delete Post
URL: /posts/:postId
Method: DELETE
Description: Delete a post created by the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Request Parameters:
postId (string, required): ID of the post to be deleted.
Response:
Success message indicating the post deletion.



---------------------------------------

Following

Follow User
URL: /follow
Method: POST
Description: Follow a user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Request Body:
followedUserId (string, required): ID of the user to follow.
Response:
Success message indicating the user followed successfully.

Unfollow User
URL: /follow/unfollow
Method: POST
Description: Unfollow a user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Request Body:
followedUserId (string, required): ID of the user to unfollow.
Response:
Success message indicating the user unfollowed successfully.

Get Followings
URL: /follow/followings
Method: GET
Description: Get the list of users followed by the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Response:
List of user IDs followed by the user.

Get Followers
URL: /follow/followers
Method: GET
Description: Get the list of users following the authenticated user.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Response:
List of user IDs following the user.



---------------------------------------

Social Feed

Get Social Feed
URL: /social-feed/feed
Method: GET
Description: Get the social feed containing posts from followed users.
Headers:
Authorization (string, required): JWT token of the authenticated user.
Response:
Social feed containing posts from followed users.