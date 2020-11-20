package groupssrc

//GroupsStore represents all the database methods, each model's methods are grouped. UserId will be part of all structs in some way, so it is not needed as an input paramter unless there is no other input struct or input struct id.
type GroupsStore interface {
	//Category model methods
	GetCategories() ([]*Category, error)
	SaveCategory(catid int, userid int) error
	UnsaveCategory(catid int, userid int) error
	GetSavedCategories(userid int) ([]*Category, error)

	//Group model methods
	CreateGroup(gp *Group) (*Group, error)
	SearchGroups(query string) ([]*Group, error)
	GetGroup(gpid int) (*Group, error)
	DeleteGroup(gpid int) error
	SaveGroup(gpid int, userid int) error
	UnsaveGroup(gp int, userid int) error
	GetSavedGroups(userid int) ([]*Group, error)

	//GroupComment model methods
	CreateGroupComment(gc *GroupComment) (*GroupComment, error)
	GetGroupComment(gcid int) (*GroupComment, error)
	DeleteGroupComment(gcid int) error

	//BlogComment model methods
	CreateBlogComment(bc *BlogComment) (*BlogComment, error)
	GetBlogComment(bcid int) (*BlogComment, error)
	DeleteBlogComment(bcid int) error

	//BlogPost model methods
	CreateBlogPost(bp *BlogPost) (*BlogPost, error)
	GetBlogPost(bpid int) (*BlogPost, error)
	DeleteBlogPost(bpid int) error

	//MembershipRequest model methods
	CreateMembershipRequest(gpid int, userid int) (*MembershipRequest, error)
	GetMembershipRequests(gpid int) ([]*MembershipRequest, error)
	AcceptMembershipRequest(mr *MembershipRequest) error
	DeclineMembershipRequest(mr *MembershipRequest) error
}
