package groupssrc

import "net/http"

//All handlers take in a header that has the user making the request in addition to other inputs. This allows the back-end to know who is making the request; needed for creating new groups/comments/posts / knowing if the user is in a group/pending request in a group/is group admin etc.
//All inputs will be either part of the request url or in the request body. Specifying how exactly feels too implementation-y to be explained here.

//CategoriesHandler is the CategoryHandler, handles requests about categories.
func (ctx *GroupContext) CategoriesHandler(w http.ResponseWriter, r *http.Request) {
	//GET: load categories
	//input: none
	//output: category struct(s), 200 status code
	if r.Method == http.MethodGet {
		userHeader := r.Header.Get("X-User")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(userHeader))
	}
}

//GroupSearchHandler loads groups based on a search query.
func (ctx *GroupContext) GroupSearchHandler(w http.ResponseWriter, r *http.Request) {
	//GET: Load search results
	//inputs: search query
	//outputs: group struct(s), 200 status code
	if r.Method == http.MethodGet {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("anything"))
	}
}

//GroupHandler is the group controller, handles requests for an existing group or to create a new group.
func (ctx *GroupContext) GroupHandler(w http.ResponseWriter, r *http.Request) {
	//GET: Load group information
	//inputs: group id
	//outputs: group struct, 200 status code
	if r.Method == http.MethodGet {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("group"))
	}

	//POST: Create new group
	//inputs: group struct
	//output: group struct, 201 status code
	if r.Method == http.MethodPost {
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("group"))
	}

	//DELETE: Delete existing group
	//inputs: group id
	//output: 200 status code
	if r.Method == http.MethodDelete {
		w.WriteHeader(http.StatusOK)
	}
}

//CommentHandler is the comment controller, handles requests for an existing comment or to create a new comment
func (ctx *GroupContext) CommentHandler(w http.ResponseWriter, r *http.Request) {
	//GET: Load comment information
	//inputs: comment id
	//outputs: comment struct, 200 status code
	if r.Method == http.MethodGet {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("group"))
	}

	//POST: Create a new comment
	//inputs: comment struct
	//output: comment struct, 201 status code
	if r.Method == http.MethodPost {
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("group"))
	}

	//DELETE: Delete existing comment
	//inputs: comment id
	//output: 200 status code
	if r.Method == http.MethodDelete {
		w.WriteHeader(http.StatusOK)
	}
}

//BlogPostHandler is the blog controller, handles requests for an existing blog or to create a new blog
func (ctx *GroupContext) BlogPostHandler(w http.ResponseWriter, r *http.Request) {
	//GET: Load blog post information
	//inputs: blog post id
	//outputs: blog struct, 200 status code
	if r.Method == http.MethodGet {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("group"))
	}

	//POST: Create a new blog post
	//inputs: blog post struct
	//output: blog post struct, 201 status code
	if r.Method == http.MethodPost {
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("group"))
	}

	//DELETE: Deletes an existing blog post
	//inputs: blog post id
	//output: 200 status code
	if r.Method == http.MethodDelete {
		w.WriteHeader(http.StatusOK)
	}
}

//GroupMembershipHandler is the membership controller, handles requests to join a group and requests to confirm or reject someone from the group
func (ctx *GroupContext) GroupMembershipHandler(w http.ResponseWriter, r *http.Request) {
	//GET: Get all current membership requests
	//inputs: group id
	//outputs: membership request struct(s), 200 status code
	if r.Method == http.MethodGet {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("group"))
	}

	//POST: Create a new request to join a group
	//inputs: group id
	//outputs: 201 status code
	if r.Method == http.MethodPost {
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("group"))
	}

	//PATCH: Update membership request from pending to confirmed or
	//inputs: group id, membership request id
	//outputs: 200 status code
	if r.Method == http.MethodPatch {
		w.WriteHeader(http.StatusOK)
	}
}

//SaveGroupHandler is the SavedGroupController, handles request for a user's existing saved groups and to save a new group
func (ctx *GroupContext) SaveGroupHandler(w http.ResponseWriter, r *http.Request) {
	//GET: Get all saved groups
	//inputs: user id
	//outputs: group struct(s), 200 status code
	if r.Method == http.MethodGet {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("group"))
	}

	//POST: Add a new group to saved groups
	//inputs: group id
	//outputs: 201 status code
	if r.Method == http.MethodPost {
		w.WriteHeader(http.StatusCreated)
	}

	//DELETE: Remove a group from saved groups
	//inputs: group id
	//outputs: 200 status code
	if r.Method == http.MethodDelete {
		w.WriteHeader(http.StatusOK)
	}
}
