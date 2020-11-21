package groupssrc

import (
	"database/sql"
	"time"

	_ "github.com/go-sql-driver/mysql" //needed
)

//SQLStore holds db info
type SQLStore struct {
	DB *sql.DB
}

//CATEGORY DB METHODS

//GetCategories returns all categories
func (sqls *SQLStore) GetCategories() ([]*Category, error) {
	cts := make([]*Category, 0)
	insq := "select * from category order by category_name"

	res, errQuery := sqls.DB.Query(insq)
	if errQuery != nil {
		return nil, errQuery
	}
	defer res.Close()

	for res.Next() {

		ct := &Category{}
		errScan := res.Scan(&ct.CategoryID, &ct.CategoryName)
		if errScan != nil {
			return nil, errScan
		}
		cts = append(cts, ct)
	}

	return cts, nil
}

//SaveCategory allows for the ability to save category. Takes an array so multiple can be saved in the same request.
func (sqls *SQLStore) SaveCategory(catid int, userid int) error {
	insq := "insert into saved_category(category_id, user_id) values(?,?)"

	_, errExec := sqls.DB.Exec(insq, catid, userid)
	if errExec != nil {
		return errExec
	}

	return nil
}

//UnsaveCategory unsaves a previously saved category
func (sqls *SQLStore) UnsaveCategory(catid int, userid int) error {
	insq := "delete from saved_category where category_id = ? and user_id = ?"

	_, errExec := sqls.DB.Exec(insq, catid, userid)
	if errExec != nil {
		return errExec
	}

	return nil
}

//GetSavedCategories gets the saved categories for a given user
func (sqls *SQLStore) GetSavedCategories(userid int) ([]*Category, error) {
	cts := make([]*Category, 0)
	insq := "select sc.category_id, c.category_name from saved_category sc join category c on sc.category_id = c.category_id"

	res, errQuery := sqls.DB.Query(insq)
	if errQuery != nil {
		return nil, errQuery
	}
	defer res.Close()

	for res.Next() {
		ct := &Category{}
		errScan := res.Scan(&ct.CategoryID, &ct.CategoryName)
		if errScan != nil {
			return nil, errScan
		}
		cts = append(cts, ct)
	}

	return cts, nil
}

//GROUP DB METHODS

//CreateGroup creates a group
func (sqls *SQLStore) CreateGroup(gp *Group) (*Group, error) {
	insq := "insert into `group`(user_id, category_id, group_name, group_description, created_at) values(?,?,?,?,?)"

	res, errExec := sqls.DB.Exec(insq, gp.User.UserID, gp.Category.CategoryID, gp.GroupName, gp.GroupDescription, time.Now())
	if errExec != nil {
		return nil, errExec
	}

	gpid, errID := res.LastInsertId()
	if errID != nil {
		return nil, errID
	}
	gp.GroupID = int(gpid)

	return gp, nil
}

//SearchGroups searches groups with the given query term, and returns groups with similar group names to the query.
func (sqls *SQLStore) SearchGroups(query string, userid int, page int) ([]*Group, error) {
	gps := make([]*Group, 0)
	wcstring := string('%') + query + string('%')
	offset := 9 * (page - 1)
	insq := "select g.group_id, g.user_id, g.category_id, g.group_name, g.group_description, g.created_at, c.category_name, u.first_name, u.last_name, u.photo_url from `group` g join category c on g.category_id = c.category_id join user u on g.user_id = u.user_id where g.group_name LIKE ? order by g.group_name limit 9 offset ?"

	res, errQuery := sqls.DB.Query(insq, wcstring, offset)
	if errQuery != nil {
		return nil, errQuery
	}
	defer res.Close()

	for res.Next() {
		gp := &Group{}
		user := &User{}
		c := &Category{}
		errScan := res.Scan(&gp.GroupID, &user.UserID, &c.CategoryID, &gp.GroupName, &gp.GroupDescription, &gp.CreatedAt, &c.CategoryName, &user.FirstName, &user.LastName, &user.PhotoURL)
		if errScan != nil {
			return nil, errScan
		}
		gp.User = user
		gp.Category = c

		sgid := 0
		insq = "select sg_id from saved_group where group_id = ? and user_id = ?"
		errQuery = sqls.DB.QueryRow(insq, gp.GroupID, userid).Scan(&sgid)
		if errQuery != nil {
			if errQuery == sql.ErrNoRows {
				gp.IsSaved = false
			} else {
				return nil, errQuery
			}
		} else {
			gp.IsSaved = true
		}

		var state bool
		insq = "select state from membership where group_id = ? and user_id = ?"
		errQuery = sqls.DB.QueryRow(insq, gp.GroupID, userid).Scan(&state)
		if errQuery != nil {
			if errQuery != sql.ErrNoRows {
				return nil, errQuery
			}
		} else {
			gp.IsJoined = state
		}

		gps = append(gps, gp)
	}

	return gps, nil
}

//GetGroup gets a group by groupid and returns it
func (sqls *SQLStore) GetGroup(gpid int) (*Group, error) {
	gp := &Group{}
	user := &User{}
	c := &Category{}

	insq := "select g.group_id, g.user_id, g.category_id, g.group_name, g.group_description, g.created_at, c.category_name, u.first_name, u.last_name, u.photo_url from `group` g join category c on g.category_id = c.category_id join user u on g.user_id = u.user_id where group_id = ?"

	errQuery := sqls.DB.QueryRow(insq, gpid).Scan(&gp.GroupID, &user.UserID, &c.CategoryID, &gp.GroupName, &gp.GroupDescription, &gp.CreatedAt, &c.CategoryName, &user.FirstName, &user.LastName, &user.PhotoURL)
	if errQuery != nil {
		if errQuery == sql.ErrNoRows {
			return nil, nil
		}
		return nil, errQuery
	}
	gp.User = user
	gp.Category = c

	insq = "select group_id from saved_group where group_id = ? and user_id = ?"
	errQuery = sqls.DB.QueryRow(insq, gpid, gp.User.UserID).Scan(&gp.GroupID)
	if errQuery != nil {
		if errQuery == sql.ErrNoRows {
			gp.IsSaved = false
		} else {
			return nil, errQuery
		}
	} else {
		gp.IsSaved = true
	}

	var state bool
	insq = "select state from membership where group_id = ? and user_id = ?"
	errQuery = sqls.DB.QueryRow(insq, gpid, gp.User.UserID).Scan(&state)
	if errQuery != nil {
		if errQuery != sql.ErrNoRows {
			return nil, errQuery
		}
	} else {
		gp.IsJoined = state
	}

	return gp, nil
}

//DeleteGroup deletes a group by groupid
func (sqls *SQLStore) DeleteGroup(gpid int) error {
	//hopefully this is everything we gotta delete.

	insq := "delete from blog_post where group_id = ?"

	_, errExec := sqls.DB.Exec(insq, gpid)
	if errExec != nil {
		return errExec
	}

	insq = "delete from group_comment where group_id = ?"

	_, errExec = sqls.DB.Exec(insq, gpid)
	if errExec != nil {
		return errExec
	}

	insq = "delete from membership where group_id = ?"

	_, errExec = sqls.DB.Exec(insq, gpid)
	if errExec != nil {
		return errExec
	}

	insq = "delete from saved_group where group_id = ?"

	_, errExec = sqls.DB.Exec(insq, gpid)
	if errExec != nil {
		return errExec
	}

	insq = "delete from `group` where group_id = ?"

	_, errExec = sqls.DB.Exec(insq, gpid)
	if errExec != nil {
		return errExec
	}

	return nil
}

//SaveGroup saves a specific group to a specific user's saved groups
func (sqls *SQLStore) SaveGroup(gpid int, userid int) error {
	insq := "insert into saved_group(group_id, user_id) values(?,?)"

	_, errExec := sqls.DB.Exec(insq, gpid, userid)
	if errExec != nil {
		return errExec
	}

	return nil
}

//UnsaveGroup unsaves a specific group to a specific user's saved groups
func (sqls *SQLStore) UnsaveGroup(gpid int, userid int) error {
	insq := "delete from saved_group where group_id = ? and user_id = ?"

	_, errExec := sqls.DB.Exec(insq, gpid, userid)
	if errExec != nil {
		return errExec
	}

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
