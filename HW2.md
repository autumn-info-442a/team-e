# Problem

COVID-19, quarantine, online-schooling, and online work will forever shape the way students interact with others. Due to to the lack of social interaction, students are unable to make meaningful connections with others who have similar interests. Social interaction is a pivotal aspect of the college experience as according to Hurst, B., Wallace, R., & Nixon, S. B. (2013), it improves learning by enhancing knowledge of literacy, ciritcal thinking, and problem-solving skills. Finding other students with similar interests is a much larger challenge now than every before as students are quarantined and taking classes from behind a screen. How might we enable students to make meaningful connections with one another in a virtual environment?

# Solution

We envisioned a web application that will allow users to browse categories of interest, join groups, and post updated to groups. This type of platform fosters social interaction with one another and hosts an avenue of making new friends and exploring new interests. We will leverage a card layout for the content on the page, sizable to the screen being used by the user.

<img src="/public/img/explore.png" style="width:700px;border:black">

On the *Explore* page, there are many interactions that a user can make. To start with, *Log in*. Clicking the log in button on the *Explore* page will navigate the user to the log in page, prompting them to enter an email and password. The user can then log in, and be routed to *Explore*. If the user doesn’t have an account, they can create an account by filling out a few questions.

<img src="/public/img/login.png" width="700">

The questions the user will answer allows the web application to generate recommended interest groups. The process flow for filling out the questions are as follows: enter your name > choose at least 3 interests > hit ok > route back to *Explore*. While the user fills out the questions, a progress bar will move closer to 100% as the user completes the survey. 

<img src="/public/img/surveyname.png" width="700">

<img src="/public/img/interestselector.png" width="700" padding="2">

Some errors that may occur during this process flow are: “what is your name? “ is mandatory and won’t let the user click next until there are letters in the text area, given interests will change color once selected, the “OK” button won’t be activated until 3 interests have been selected. Users can always return to *Explore* by hitting the logo on the top left of each page, or the *Explore* button in the header. This route of navigation is available on all pages.

From *Explore*, a user can view a category which will bring them to the underlying groups in that category. 

<img src="/public/img/grouplist.png" width="700">
 
The search bar can be utilized to filter out the groups in real time. 

<img src="/public/img/searchgroup.png" width="700">

If a group doesn’t exist, the user will be prompted to create a new group. 

<img src="/public/img/groupnotexist.png" width="700">

A form will appear asking for group name, category, and search tags. From there, the the group will then be created. The group creator will then become the group admin.

<img src="/public/img/newgroupdetails.png" width="700">

When viewing a group as a user that hasn’t joined it yet, you will see the option to join the group.

<img src="/public/img/groupoverview.png" width="700">

You can only join or post within a group if you have an account. Clicking either of these buttons will redirect to the log in page. Once joined, the join button will be switched to pending as the group admin will admit you to the group.

<img src="/public/img/pendingjoin.png" width="700">

When viewing a group as a user that has already joined, the recent posts in that group will appear in chronological order. When creating a post, a title and description are required. An image is optional. 

<img src="/public/img/createpost.png" width="700">

Users can like and comment on posts they choose. When hitting submit post, the user will be prompted with a confirmation message in which they can cancel and continue editing their post, or confirm the post to the group.

<img src="/public/img/postconfirmation.png" width="700">

<img src="/public/img/groupblog.png" width="700">

My Groups will show the groups that the user has joined, allowing for quick access. If the user is an admin, they will be able to see pending join requests under the Admin Groups tab where they can either decline or accept the potential group member.

<img src="/public/img/mygroups.png" width="700">
