# Team Explore
## Requirements List

### Home Page

1.  Users must be able to view and type characters into the search bar on the home page.
2.  The system must display fixed categories on the Explore page, as defined by our team, so that the user can browse through categories.
3.  Users must be able to click on any category on the Explore page and then be routed to that category’s page.
4.  The system must show all categories, and the user must be able to scroll down to see the rest if they do not all fit on the page.
5.  The system must display the categories in alphabetical order.
6.  The system must display a recommended section of categories to the user at below the search bar.

### Viewing Groups in a Category

7.  Users must be able to see all the groups in a certain category once they click on a category.
8.  Users should be able to scroll down to view more groups if the results do not all fit on one screen.
9.  The system should organize the order of the groups based on alphabetical order.
10. Users should be able to create a new group if none of the search results were what they were looking for by clicking on a “create group” button. If the user is logged in, it will redirect to the create new group page, otherwise it will redirect the user to the login page to log in.
11. The system might display saved groups at the top of the results.

### Search Bar

12. Users must be able to type into the search bar while the system updates search results as the user types.
13. The system must query the term inputted against groups if on the group page, displaying the matching or partially matching results to the user.
14. The system must query the term inputted against categories if on the category page, displaying the matching or partially matching results to the user.
15. The system should display search results for groups in alphabetical order.
16. The system should display search results for categories in alphabetical order.

### Navigation Bar

17. The system must display a nav bar at the top of all pages to allow for easy navigation.
18. The system must have a logo on the nav bar, redirecting the user to the home page when clicked.
19. The system must have a Explore tab on the nav bar, redirecting the user to the home page when clicked.
20. The system must have a My Groups tab on the nav bar, redirecting the user to the My Groups page when clicked and the user is logged in, otherwise will redirect to the Log In page if the user isn’t logged in.
21. The system must have a Log In tab on the nav bar, redirecting the user to the Log In page when clicked. The system must change the Log In element to Log Out once a user has logged in.

### Log in

22. Users must be able to type into the email and password text box.
23. The system should show dots/stars instead of letters when typing in the password text box.
24. The system should notify the user if the username or password is incorrect and prompt them to re-enter username and password.
25. The system should log the user in if the email and password match an existing account redirecting them to the home(explore) page after a successful authentication.
26. The system should show a sign-up button, directing the user to the new account survey page if clicked.

### New Account Survey

27. The new account survey is made up of multiple questions, with one question on each page of the survey.
28. The system should show back and next buttons, allowing the user to move between questions freely, saving inputted information so it doesn’t get lost.
29. The system must be able to calculate the progression percentage as users complete survey items and display in a progression bar on each survey page.
30. Users must be able to type into the name field to enter a name when on the survey name page.
31. Users must be able to type their email into the email field when on the survey email page.
32. Users should be able to select up to 3 interests from a group of categories on the survey interest page, highlighting the selected categories in an accessible color when selected.
33. The system shouldn’t let the user move to the next question if they have not entered information correctly; name must be >0 characters, email should be a valid email address, and the user must select 3 categories for the interest selection, graying out the next button until this is satisfied.
34. The system must be able to generate recommended categories on the home page based on the user’s selected interests, matching their interests to existing categories.

### Create New Group

35. The new group page should have 3 inputs, a group name, a group category and a group description.
36. Users must be able to type into the group name and group description text inputs.
37. The system might only allow numbers and letters to be typed into each text box.
38. Users must be able to open the category dropdown menu to choose the correlating category.
39. The system must allow the user to create a group even if the group name is already the name of an existing group as group names are not unique.
40. The system must limit the number of characters per text box to 32 characters for group name and 240 for description.
41. The system must grey out the “Create group” button until all 3 inputs are filled out correctly.
42. Users must be able to create an account if the form contains all of the correct information.
43. The system might allow the user to submit a photo for a group picture.
44. The system might give the group a default photo if no other photo is updated.

### View Group

45. The system must display the group name, description and category to the user, as defined by the group admin.
46. The group administrator’s email should be displayed if the user is in the group. 
47. The system must allow the user to route back to the previous page by clicking the back arrow.
48. If the user is logged in and not in the group, the system must allow the user to request to join the group by clicking the ask to join button.
49. The system must change the join status to pending if they requested to join. The join button will now say pending and will be greyed out.
50. The system must limit the number of group members to 10, displaying an error message if a user requests to join and the member count is already 10.
51. The user must be able to leave any group that they have joined by clicking on the “leave group” button.
52. The system should allow users to leave comments by clicking on the comment button, and each comment should have a max character count where the user is unable to keep typing if they hit the limit.
53. The system should display comments below the group information and show these comments in chronological order with the most recent comment being at the top.
54. Users must be able to view and reply to comments on each post from a thread system below the post.
55. The system should only display the three most recent comments unless “load more comments” is pressed.
56. Users should be able to save the group so they can return to the page at a later date (through the my groups page) by clicking on the save button. Once saved, you can click it again to unsave.
57. The system should have a mini-navbar at the top of the group page, allowing you to tab to the blog post section of the group page. (see next section)

### View Group: Blog Tab

58. The system must display blog posts in the group in chronological order (recent first).
59. For each blog post, the system should display the post title, author, desciption, and may show an image if the post has one.
60. Users should be routed to the “create post” screen if they click on the “post” button.
61. The system should only allow users to post if they have already joined the group by only displaying the add post button to group members. 
62. Users must be able to comment on any post in the group by clicking the comment button (comments work the same was as in the view group tab).

### Create Blog Post

63. The system must allow the user to route back to the previous page by clicking the back arrow.
64. The system must allow the user to enter a title for their post, including letters and numbers with a maximum of 50 characters.
65. The system must allow the user to enter a description (body text) for their post. Including letters and numbers with a maximum of 1,000 characters.
66. The system might allow the user to upload an image for their post of file type jpeg or png.
67. The system must allow the user to submit their post by hitting the submit button. 
68. The system must display an error if the title or description are empty, not allowing the user to post until satisfied.
69. The system must display a confirmation, ensuring that the user wants to post to the group or not by either clicking the post or cancel button.

### My Groups

70. The system must display every group that the user has joined.
71. For each displayed group, there should be a “leave group” button within the tile that allows users to leave groups that they have previously joined. 
72. When hitting the leave button, the system must display a confirmation, ensuring that the user wants to leave the group by clicking the confirm or cancel button.
73. The system must show the groups that the user is an admin for if they click on the “Admin Groups” button.
74. The system must display the groups that they have joined in chronological order.
75. The system must route the user to the specific group page when clicked on.
76. The user should be able to create a new group by clicking on the “Create group” button.

### Admin User

77. The system must allow the user to access the Admin Panel tab on the My Groups page, giving access to the user’s Admin groups and pending group requests. 
78. For each group the user is an admin in, the system must display the name of each user pending.
79. The system must allow the Admin user to click on a pending request to make the decision to admit them.
80. The system must display a confirmation when the Admin user clicks on a pending request, allowing them to click yes or no.
81. The system must allow the pending user to access the group if they are admitted by setting the user as a group member or cancel the request if they are denied.
82. The system must be able to recognize when a user is an admin for a group (a group they created), giving them the ability to delete the group if desired from the “Your Admin Groups” tab by hitting the delete button.
83. The system must display a delete confirmation screen, allowing the user to delete the group by clicking yes, or no to not delete the group.
84. The system must remove the pending request from the Admin user’s view after a decision has been made.
85. The system must display new groups requests in My Groups > Admin Groups so that the group Admin can admit or decline the pending member.
