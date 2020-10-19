# Problem

COVID-19, quarantine, online-schooling, and online work will forever shape the way students interact with others. Due to the lack of social interaction, students are unable to make meaningful connections with others who have similar interests. Social interaction is a pivotal aspect of the college experience as according to Hurst, B., Wallace, R., & Nixon, S. B. (2013). It improves learning by enhancing knowledge of literacy, critical thinking, and problem-solving skills. Finding other students with similar interests is a much larger challenge now than every before as students are quarantined and taking classes from behind a screen. How might we enable students to make meaningful connections with one another in a virtual environment?

# Solution

## Explore

We envisioned a web application that will allow users to browse categories of interest, join groups, and post updates to groups. This type of platform fosters social interaction with one another and hosts an avenue of making new friends and exploring new interests. We will leverage a card layout for the content on the pages, sizable to the screen being used by the user.

This service is for UW students, but could be expanded to other institutions in the future. This platform is meant for broad and specific groups, (i.e. "Studying" or "IMA pick-up basketball 5-7pm"). The overarching goal is to facilitate meaningful connections with other students.

<img src="/public/img/explore.png" width="700">

## Log In

On the *Explore* page, there are many interactions that a user can make. To start with, *Log in*. Clicking the log in button on the *Explore* page will navigate the user to the log in page, prompting them to enter an email and password. The user can then log in, and be routed to *Explore*. If the user doesn’t have an account, they can create an account by filling out a few questions. To log out of their account, the user simply needs to hit the log out button.

<img src="/public/img/login.png" width="700">

## New Account Survey

The questions the user will answer allows the web application to generate recommended interest groups. The process flow for filling out the questions are as follows: enter your name > choose at least 3 interests > hit ok > route back to *Explore*. While the user fills out the questions, a progress bar will move closer to 100% as the user completes the survey. 

<img src="/public/img/surveyname.png" width="700">

<img src="/public/img/interestselector.png" width="700" padding="2">

Some errors that may occur during this process flow are: “what is your name? “ is mandatory and won’t let the user click next until there are letters in the text area, given interests will change color once selected, the “OK” button won’t be activated until 3 interests have been selected. Users can always return to *Explore* by hitting the logo on the top left of each page, or the *Explore* button in the header. This route of navigation is available on all pages.

## Groups

From *Explore*, a user can view a category which will bring them to the underlying groups in that category as seen below. The groups listed will be related to the category that was clicked on.

<img src="/public/img/grouplist.png" width="700">
 
## Search Bar

The search bar can be utilized to filter out the groups in real time. 

<img src="/public/img/searchgroup.png" width="700">

## Create New Group

If a group doesn’t exist after a user searches for it, the user will be prompted to create a new group if they would like.

<img src="/public/img/groupnotexist.png" width="700">

A form will appear asking for group name, category, and search tags. From there, the group will then be created. The group creator will then become the group admin.

<img src="/public/img/newgroupdetails.png" width="700">

## View Group: Unjoined

When viewing a group as the user that hasn’t joined yet, they will see the option to join the group. The back button will route the user to the group list page. The page will show group details.

<img src="/public/img/groupoverview.png" width="700">

Users can only join or post within a group if they have an account. Clicking either of these buttons will redirect to the log in page. Once joined, the join button will change to pending as the group admin will admit the user to the group.

<img src="/public/img/pendingjoin.png" width="700">

## View Group: Joined

When viewing a group as a user that has already joined, the recent posts in that group will appear in chronological order. Users can like and comment on posts they choose.

<img src="/public/img/groupblog.png" width="700">

## Create Post

When creating a post, a title and description are required. An image is optional. The user can hit the back button to return to the recent posts within the group.

<img src="/public/img/createpost.png" width="700">

When hitting submit post, the user will be prompted with a confirmation message in which they can cancel and continue editing their post, or confirm the post to the group.

<img src="/public/img/postconfirmation.png" width="700">

## My Groups

My Groups will show the groups that the user has joined, allowing for quick access. To leave a group that the user has previously joined, the user will only have to hit the leave button on the group tile.

<img src="/public/img/mygroups.png" width="700">

## Admin User

If the user is an admin, they will be able to see pending join requests under the Admin Groups tab where they can either decline or accept the potential group member.

<img src="/public/img/admintab.png" width="700">

The admin user will be prompted a confirmation message if they would like to admit the new user to the group.

<img src="/public/img/adminadmit.png" width="700">
