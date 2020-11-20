package groupssrc

import "time"

//User is the UserModel, stores information about a user
//No user model methods in groups, however there is one in gateway.
type User struct {
	UserID    int    `json:"id"`
	GoogleID  string `json:"googleId"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	PhotoURL  string `json:"photoUrl"`
}

//Category is the CategoryModel, stores information about a category
type Category struct {
	CategoryID   int    `json:"categoryId"`
	CategoryName string `json:"categoryName"`
}

//SavedCategory is a saved category, saved either from the inital survey or in-site in another fasion
type SavedCategory struct {
	SavedCategoryID int       `json:"savedCategoryId"`
	Category        *Category `json:"category"`
	User            *User     `json:"user"`
}

//ReturnCategories is the return struct type for the getCategories handler
type ReturnCategories struct {
	SavedCategories []*Category `json:"savedCategories"` //normal category because we don't need to send user info to front-end.
	Categories      []*Category `json:"categories"`
}

//Group is the GroupModel, stores information about a group
type Group struct {
	GroupID          int       `json:"groupId"`
	User             *User     `json:"user"`
	Category         *Category `json:"category"`
	GroupName        string    `json:"groupName"`
	GroupDescription string    `json:"groupDescription"`
	CreatedAt        time.Time `json:"createdAt"`
	IsSaved          bool      `json:"isSaved"`
	IsJoined         bool      `json:"isJoined,omitempty"`
}

//GroupComment is the CommentModel, stores information about a comment. Represents comments on group pages
type GroupComment struct {
	GroupCommentID int           `json:"groupCommentId"`
	User           *User         `json:"user"`
	Group          *Group        `json:"group"`
	Reply          *GroupComment `json:"reply"`
	CommentContent string        `json:"commentContent"`
	CreatedAt      time.Time     `json:"time.Time"`
}

//BlogPost is the BlogModel, stores information about a blog post
type BlogPost struct {
	BlogPostID  int       `json:"blogPostId"`
	User        *User     `json:"user"`
	Group       *Group    `json:"group"`
	PostContent string    `json:"postContent"`
	CreatedAt   time.Time `json:"createdAt"`
}

//BlogComment is the CommentModel, stores information about a comment. Represents comments on blog posts
type BlogComment struct {
	BlogCommentID  int          `json:"gropuCommentId"`
	User           *User        `json:"user"`
	Group          *Group       `json:"group"`
	Reply          *BlogComment `json:"reply"`
	CommentContent string       `json:"commentContent"`
	CreatedAt      time.Time    `json:"time.Time"`
}

//MembershipRequest is the MembershipRequestModel, stores information about the status of a membership requets, as well as saved groups
type MembershipRequest struct {
	MembershipID int       `json:"membershipID"`
	User         *User     `json:"user"`
	Group        *Group    `json:"group"`
	UpdatedAt    time.Time `json:"updatedAt"`
	State        bool      `json:"state"`
}

//GroupContext contains the db context
type GroupContext struct {
	GStore GroupsStore
}
