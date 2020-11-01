package groupssrc

//GroupsStore represents all the database methods, each model's methods are grouped. UserId will be part of all structs in some way, so it is not needed as an input paramter unless there is no other input struct or input struct id.
type GroupsStore interface {
	//Category model methods
	GetCategories() error

	//Group model methods
	CreateGroup(group) (Group, error)
	SearchGroups(query) ([]Group, error)
	GetGroup(groupId) (Group, error)
	DeleteGroup(groupId) error
	SaveGroup(groupId, userId) error
	GetSavedGroups(userId) ([]Group, error)

	//Comment model methods
	CreateComment(comment) (Comment, error)
	GetComment(commentId) (Comment, error)
	DeleteComment(commentId) error

	//BlogPost model methods
	CreateBlogPost(blogPost) (BlogPost, error)
	GetBlogPost(blogPostId) (BlogPost, error)
	DeleteBlogPost(blogPostId) error

	//MembershipRequest model methods
	CreateMembershipRequest(groupId, userId) (MembershipRequest, error)	GetMembershipRequests(groupId) ([]MembershipRequest, error)
	AcceptMembershipRequest(membershipRequest) error
	DeclineMembershipRequest(membershipRequest) error
}