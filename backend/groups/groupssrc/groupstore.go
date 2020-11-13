package groupssrc

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql" //needed
)

//SQLStore holds db info
type SQLStore struct {
	DB *sql.DB
}

//CATEGORY DB METHODS

//GetCategories returns all categories
func (sqls *SQLStore) GetCategories() ([]*Category, error) {
	return nil, nil
}

//GROUP DB METHODS

//CreateGroup creates a group
func (sqls *SQLStore) CreateGroup(gp *Group) (*Group, error) {
	return nil, nil
}

//SearchGroups searches groups with the given query term, and returns groups with similar group names to the query.
func (sqls *SQLStore) SearchGroups(query string) ([]*Group, error) {
	return nil, nil
}

//GetGroup gets a group by groupid and returns it
func (sqls *SQLStore) GetGroup(gpid int) (*Group, error) {
	return nil, nil
}

//DeleteGroup deletes a group by groupid
func (sqls *SQLStore) DeleteGroup(gpid int) error {
	return nil
}

//SaveGroup saves a specific group to a specific user's saved groups
func (sqls *SQLStore) SaveGroup(gpid int, userid int) error {
	return nil
}

//GetSavedGroups retuns all groups a given user has saved
func (sqls *SQLStore) GetSavedGroups(userid int) ([]*Group, error) {
	return nil, nil
}

//GROUPCOMMENT DB METHODS

//CreateGroupComment creates a group comment
func (sqls *SQLStore) CreateGroupComment(gc *GroupComment) (*GroupComment, error) {
	return nil, nil
}

//GetGroupComment gets a group comment by groupcomment id
func (sqls *SQLStore) GetGroupComment(gcid int) (*GroupComment, error) {
	return nil, nil
}

//DeleteGroupComment deletes a group comment
func (sqls *SQLStore) DeleteGroupComment(gcid int) error {
	return nil
}

//BLOGCOMMENT DB METHODS

//CreateBlogComment creates a blog comment
func (sqls *SQLStore) CreateBlogComment(bc *BlogComment) (*BlogComment, error) {
	return nil, nil
}

//GetBlogComment gets a blog comment
func (sqls *SQLStore) GetBlogComment(bcid int) (*BlogComment, error) {
	return nil, nil
}

//DeleteBlogComment deletes a specified blog comment
func (sqls *SQLStore) DeleteBlogComment(bcid int) error {
	return nil
}

//BLOGPOST DB METHODS

//CreateBlogPost creates a blog post
func (sqls *SQLStore) CreateBlogPost(bp *BlogPost) (*BlogPost, error) {
	return nil, nil
}

//GetBlogPost gets a blog post
func (sqls *SQLStore) GetBlogPost(bpid int) (*BlogPost, error) {
	return nil, nil
}

//DeleteBlogPost deletes a specified blog post
func (sqls *SQLStore) DeleteBlogPost(bpid int) error {
	return nil
}

//MEMEBERSHIPREQUEST DB METHODS

//CreateMembershipRequest creates a new membership request
func (sqls *SQLStore) CreateMembershipRequest(gpid int, userid int) (*MembershipRequest, error) {
	return nil, nil
}

//GetMembershipRequests gets all membership requests for the given group
func (sqls *SQLStore) GetMembershipRequests(gpid int) ([]*MembershipRequest, error) {
	return nil, nil
}

//AcceptMembershipRequest accepts a request for a user
func (sqls *SQLStore) AcceptMembershipRequest(mr *MembershipRequest) error {
	return nil
}

//DeclineMembershipRequest declines a request for a user
func (sqls *SQLStore) DeclineMembershipRequest(mr *MembershipRequest) error {
	return nil
}
