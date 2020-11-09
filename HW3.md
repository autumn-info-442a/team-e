# Team Explore
## Requirements List

### Home Page (Jayson)

1.  Users must be able to view and type characters into the search bar on the home page.
* If the user is on the home page, the search bar should be displayed at the top of the page, beneath the navbar. If the user clicks on the search bar, they should be able type characters into it.
2.  The system must display fixed categories on the Explore page, as defined by our team, so that the user can browse through categories.
* If the user views the explore page, multiple boxes should appear that contain predefined categories that they can browse through.
3.  Users must be able to click on any category on the Explore page and then be routed to that category’s page.
* If the user clicks on a category, they should be brought to that specific group’s page.
4.  The system must show all categories, and the user must be able to scroll down to see the rest if they do not all fit on the page.
* If the user is on the home page, they should be able to scroll down to view more categories.
5.  The system must display the categories in alphabetical order.
* If the user is on the home page, the categories that are displayed below the recommended categories should be in alphabetical order.
6.  The system must display a recommended section of categories to the user at below the search bar.
* If the user is on the home page, the first section should show them recommended categories based on the interests they selected when creating their account. If the user is not logged on, the recommended category will not be shown.

### Viewing Groups in a Category (Greyson)

7. Users must be able to see all the groups in a certain category once they click on a category.
* If the user clicks on a category they should be routed to the page to view all the existing groups within a category.
8. Users should be able to scroll down to view more groups if the results do not all fit on one screen.
* Users should be able to freely scroll up and down on group pages as the page shows subsequent groups if available.
9. The groups displayed to the user must be in alphabetical order, following a left to right pattern so it is easy to find the exact group they are looking for.
* The groups displayed to the user must be in alphabetical order, following a left to right pattern.
10. Users should be able to create a new group if none of the search results were what they were looking for by clicking on a “create group” button. If the user is logged in, it will redirect to the create new group page, otherwise it will redirect the user to the login page to log in.
* If the user enters a search string and there are no matching groups, a create group button is displayed. If the user is already logged in, the user will be directed to the create new group screen but if the user isn’t logged in, they will be redirected to the log in page where they can log in and then create a new group.
11. The system might display saved groups at the top of the results.
* The groups that the user has saved might be displayed at the top of the group results, allowing the user to view their saved groups at the top of the page.

### Search Bar (Jayson)

12. Users must be able to type into the search bar while the system updates search results as the user types.
* If the user types into the search bar, the system should update their search result as they type.
13. The system must query the term inputted against groups if on the group page, displaying the matching or partially matching results to the user for each new character inputted.
* If the user types into the search bar, the search bar should show the updated matching search result after every character that is inputted.
14. The system must query the term inputted against categories if on the category page, displaying the matching or partially matching results to the user for each new character inputted.
* If the user is on the search bar in the categories page, the search bar should only display categories.
15. The system should display search results for groups in alphabetical order.
* If the user is typing in the search bar on the group page, the results that are shown should be shown in alphabetical order.
16. The system should display search results for categories in alphabetical order.
* If the user is typing in the search bar on the categories page, the results that are shown should be shown in alphabetical order.

### Navigation Bar (Greyson)

17. The system must display a nav bar at the top of all pages to allow for easy navigation.
* If the user traverses through all the pages in the application, a navigation bar must be present on all pages so the user can access the navigation pages at all times.
18. The system must have a logo on the nav bar, redirecting the user to the home page when clicked.
* If the user clicks on the logo on the navigation bar, they must be redirected to the home page.
19. The system must have a My Groups tab on the nav bar, redirecting the user to the My Groups page when clicked and the user is logged in, otherwise will redirect to the Log In page if the user isn’t logged in.
* If the user clicks on My Groups on the navigation bar they must be routed to the My Groups page, if the user is logged in. If the user isn’t logged in, they must be routed to the log in page, and then can complete the process again.
20. The system must have a Log In tab on the nav bar, redirecting the user to the Log In page when clicked. The system must change the Log In element to Log Out once a user has logged in.
* If the user clicks on Log In on the navigation bar they must be routed to the log in page. The log in button must change to Log Out if the user is logged in, allowing the user to log out when they finish their session.

### Log in (Jayson)

21. Users must be able to type into the email and password text box.
* If the user clicks on the email and password text box, they should be able to type into them.
22. The system should show dots/stars instead of letters when typing in the password text box.
* If the user is typing into the password text box, the letters that are being typed should be displayed as dots instead of letters.
23. The system should notify the user if the username or password is incorrect and prompt them to re-enter username and password.
* If the user incorrectly types in their username and/or password, a prompt that says “The username and/or password is incorrect”
24. The system should log the user in if the email and password match an existing account redirecting them to the home(explore) page after a successful authentication.
* If the user clicks on “log in” after typing in the correct username and password, they should be redirected to the home page and be logged into the account.
25. The system should show a sign-up button, directing the user to the new account survey page if clicked.
* If the user clicks on “create an account” they should be directed to the new account survey page to create their account.

### New Account Survey (Greyson)

26. The new account survey is made up of multiple questions, with one question on each page of the survey.
* The new account survey must have multiple questions on different pages for the user to complete.
27. The system should show back and next buttons, allowing the user to move between questions freely, saving inputted information so it doesn’t get lost.
* If the user wants to move forward or backward between survey pages, they should be able to hit the back button and next button. User information should be saved as they complete the forms.
28. The system must be able to calculate the progression percentage as users complete survey items and display in a progression bar on each survey page.
* As the user completes the survey, the progression bar at the top of each survey page should update with their progression out of 100%.
39. Users must be able to type into the name field to enter a name when on the survey name page.
* If the user enters a string into the name field, the form will accept the string and allow the user to move to the next question without any errors. If the user enters an integer, the form will display a notice suggesting to not use numbers in the name field.
30. Users must be able to type their email into the email field when on the survey email page.
* If the user enters a string into the email field, the form will accept the string and allow the user to move to the next question without any errors. If the user enters an integer, the form will accept the string and allow the user to move to the next question without any errors. If the user enters a special character, the form will accept the string and allow the user to move to the next question without any errors.
31. Users should be able to select up to 3 interests from a group of categories on the survey interest page, highlighting the selected categories in an accessible color when selected.
* If the user selects an interest bubble, the selected interest must highlight to notify that the user it has been selected. The user can only select up to 3 interests, displaying an error if the user tries to select more than 3.
32. The system shouldn’t let the user move to the next question if they have not entered information correctly; name must be >0 characters, email should be a valid email address, and the user must select 3 categories for the interest selection, graying out the next button until this is satisfied.
* If the user doesn’t satisfy these requirements, an error message will be displayed describing what needs to be fixed in order to proceed to the next question.
33. The system must be able to generate recommended categories on the home page based on the user’s selected interests, matching their selected interests to existing categories and displaying at the top of the categories search results on the home page.
* After the user selects their 3 interests, categories related to those interests will be displayed on the home page under the recommended section.

### Create New Group (Jayson)

34. The new group page should have 3 inputs, a group name, a group category and a group description.
* If the user is on the new group page, there should be three input fields that the user can interact with; group name, group category, and group description.
35. Users must be able to type into the group name and group description text inputs.
* If the user clicks on the group name or group description box, they should be able to type into them.
36. The system might only allow numbers and letters to be typed into each text box.
* If the user clicks on either the group name or group description, they should be able to type all letters.
37. Users must be able to open the category dropdown menu to choose the correlating category.
* If the user clicks on the dropdown menu, a list of all of the available categories should appear. If the user scrolls up or down on the dropdown menu, the menu will scroll through the different options.
38. The system must allow the user to create a group even if the group name is already the name of an existing group as group names are not unique.
* If the user creates a group name with the same exact group name as another user, the group will still be created.
39. The system must limit the number of characters per text box to 32 characters for group name and 240 for description.
* If the user tries to type in more than 32 characters into the group name field, they will not be able to. If the user tries to type in more than 240 characters into the group description field, they will not be able to.
40. The system must grey out the “Create group” button until all 3 inputs are filled out correctly.
* If the user has not filled out any of the 3 inputs (group name, category, or group description), the “Create group” button will be greyed out. If the user tries to click on the “Create Group” button when the button is greyed out, nothing will happen.
41. Users must be able to create an account if the form contains all of the correct information.
* If the user tries to create an account after filling out all the required fields, they are able to create an account. If the user tries to click on the button without all of the information, the button will be greyed out.

### View Group (Greyson)

42. The system must display the group name, description and category to the user, as defined by the group admin.
* If the user clicks on a group tile, they should be redirected to that group’s page, displaying the group name, description, and category.
43. The group administrator’s email should be displayed if the user is in the group. 
* The user should be able to see the group administrator’s email when viewing a group so that they can reach out if necessary.
44. The system must allow the user to route back to the previous page by clicking the back arrow.
* If the user wants to route back to the previous page, they can click on the back button, taking them to the previous page they were on.
45. If the user is logged in and not in the group, the system must allow the user to request to join the group by clicking the ask to join button.
* If the user has not joined the group, the user can click the ask to join button.
46. The system must change the join status to pending if they requested to join. The join button will now say pending and will be greyed out.
* If the user clicks the ask to join button, the button will change to pending and be greyed out until a decision is made by the group administrator.
47. The system must limit the number of group members to 10, displaying an error message if a user requests to join and the member count is already 10.
* If the user tries to join a group that has more than 10 members, an error will be displayed saying the group member limit has been met. The user can see how many users there are in a group on the group info page.
48. The user must be able to leave any group that they have joined by clicking on the “leave group” button.
* If the user would like to leave a group they have joined, they can click the leave group button. This will disassociate the user’s account with the group, and will make the user rejoin the group in the future if they’d like to come back to it.
49. The system should allow users to leave comments by clicking on the comment button, and each comment should have a max character count where the user is unable to keep typing if they hit the limit.
* If the user would like to create a comment, they can click the comment button. Comments will have a maximum character count, and the user won’t be able to keep typing when they hit the limit. Comments can contain any type of character.
50. The system should display comments below the group information and show these comments in chronological order with the most recent comment being at the top.
* If the user clicks on comments in a blog post, the comments should be listed in chronological order with the most recent comment at the top.
51. Users must be able to view and reply to comments on each post from a thread system below the post.
* If the user clicks on a comment, they should be able to view them in a thread like fashion and have the option to reply to comments if they chose to.
52. The system should only display the three most recent comments unless “load more comments” is pressed.
* If the user clicks on comments, only the three most recent comments will be displayed unless load more comments is clicked by the user, then more comments will continue to load.
53. Users should be able to save the group so they can return to the page at a later date (through the my groups page) by clicking on the save button. Once saved, you can click it again to unsave.
* If the user would like to save a group, they can click on the star button which will save the group, accessible through My Groups. The star will gray out when a group is saved. If the user wants to unsave a group, they can click the star again, turning it back to the original color.

### View Group: Blog Tab (Jayson)

54. The system must display blog posts in the group in chronological order (recent first).
* If the user views the blog posts of any group, the posts should be shown in chronological order with the most recent post being at the top of the page.
55. For each blog post, the system should display the post title, author, description, and may show an image if the post has one.
* If the user views a blog post, they should be able to view the title, author, the actual post, and an image if the user has added an image to the post.
56. Users should be routed to the “create post” screen if they click on the “post” button.
* If the user clicks on the “post” button in the blog page, they should be prompted to create a post in the “Create post” screen. If the user is not logged in, the “post” button should not be displayed.
57. The system should only allow users to post if they have already joined the group by only displaying the add post button to group members. 
* If the user is logged in, the post button should be displayed on the group page. If the user is NOT logged in, the “post” button should not be displayed on the group page.
58. Users must be able to comment on any post in the group by clicking the comment button (comments work the same was as in the view group tab).
* If the user is logged in and clicks on the “comment” button, it should display the three most recent comments, if any, along with a text field to leave their own comment. If the user is logged in and clicks “reply” the comment should be submitted.

### Create Blog Post (Greyson)

59. The system must allow the user to route back to the previous page by clicking the back arrow.
* If the user creates a post, when on the post creation page, the user can route back to the previous page by clicking the back button.
60. The system must allow the user to enter a title for their post, including letters and numbers with a maximum of 50 characters.
* If the user enters a post title, the input box will accept letters and numbers with a maximum of 50 characters. An error message will be displayed if the user does not abide by these requirements.
61. The system must allow the user to enter a description (body text) for their post. Including letters and numbers with a maximum of 1,000 characters.
* If the user enters a post description, the input box will accept letters and numbers with a maximum of 50 characters. An error message will be displayed if the user does not abide by these requirements.
62. The system might allow the user to upload an image for their post of file type jpeg or png.
* If the user might want to upload an image to their post, they can upload either a jpeg or png file from their local machine.
63. The system must allow the user to submit their post by hitting the submit button. 
* If the user is satisfied with their new post content, they can submit the post by hitting the submit button.
64. The system must display an error if the title or description are empty, not allowing the user to post until satisfied.
* If the user has not completed all fields on the create post page, (excluding adding an image), an error message will be displayed to the user, not allowing the user to submit the post until the error is resolved.
65. The system must display a confirmation, ensuring that the user wants to post to the group or not by either clicking the post or cancel button.
* If the user clicks to submit their post and all required fields are satisfied, a post confirmation message will be displayed allowing the user to confirm or cancel their post submission.

### My Groups (Jayson)

66. The system must display every group that the user has joined.
* If the user is in the “My Groups” page, every single group that they have joined on that specific account should be displayed. If the user has not joined any groups, then no groups will be shown. If the user is not logged in, it will notify the user to log in to join groups.
67. For each displayed group, there should be a “leave group” button within the tile that allows users to leave groups that they have previously joined. 
* If the user clicks on the leave button, there should be a pop up to confirm that the user wants to leave the group. If the user is not a part of the group, the button to leave will not be displayed.
68. When hitting the leave button, the system must display a confirmation, ensuring that the user wants to leave the group by clicking the confirm or cancel button.
* If the user is an admin for any groups, the groups should be shown in the “admin groups” section. If the admin is not an admin for any groups, there will be no groups displayed. If the user is not logged in, it will notify the user to log in to be an admin for groups.
69. The system must show the groups that the user is an admin for if they click on the “Admin Groups” button.
* If the user visits the My Groups page, the groups should be displayed in chronological order based on when they joined that specific group. 
70. The system must display the groups that they have joined in chronological order.
* If the user clicks on any group on the My Groups page, they should be routed to the correct specific group page.
71. The system must route the user to the specific group page when clicked on.
* If the user clicks on the create group button, they will be routed to the New Group page if logged in. If the user is not logged in, it will prompt them to log in to create a new group.

### Admin User (Greyson)

72. The system must allow the user to access the Admin Panel tab on the My Groups page, giving access to the user’s Admin groups and pending group requests.
* If the user clicks on My Groups, the user can access the Admin Panel by clicking Admin Groups.
73. For each group the user is an admin in, the system must display the name of each user pending.
* If the user clicks on member requests, the user will be presented with pending member requests from groups they are an admin for.
74. The system must allow the Admin user to click on a pending request to make the decision to admit them.
* If the user wants to make a decision on a member request, they can click on the pending member tile to make a decision.
75. The system must display a confirmation when the Admin user clicks on a pending request, allowing them to click yes or no.
* If the user clicks on a pending member tile, a confirmation message will be displayed allowing them to click yes or no regarding the new member’s join request.
76. The system must allow the pending user to access the group if they are admitted by setting the user as a group member or cancel the request if they are denied.
* If the pending member is admitted, that user will be able to access the group during their next session. If the pending member is declined, their request will be deleted.
77. The system must be able to recognize when a user is an admin for a group (a group they created), giving them the ability to delete the group if desired from the “Your Admin Groups” tab by hitting the delete button.
* If the user is an admin for a group, they will have the ability to delete a group by clicking a group tile and then hitting the delete button.
78. The system must display a delete confirmation screen, allowing the user to delete the group by clicking yes, or no to not delete the group.
* If the user does click to delete a group, a confirmation message will be displayed confirming whether the administrator wants to delete a group or not.
79. The system must remove the pending request from the Admin user’s view after a decision has been made.
* If the administrator makes a decision regarding a pending request, the pending request tile will be removed from the view of the administrator.
