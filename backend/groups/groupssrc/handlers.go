package groupssrc

import (
	"encoding/json"
	"net/http"
	"path"
	"strconv"
	"strings"
)

//All handlers take in a header that has the user making the request in addition to other inputs. This allows the back-end to know who is making the request; needed for creating new groups/comments/posts / knowing if the user is in a group/pending request in a group/is group admin etc.
//All inputs will be either part of the request url or in the request body. Specifying how exactly feels too implementation-y to be explained here.

//CategoriesHandler is the CategoryHandler, handles requests about categories.
func (ctx *GroupContext) CategoriesHandler(w http.ResponseWriter, r *http.Request) {
	//GET: load categories
	//input: none
	//output: category struct(s), 200 status code
	if r.Method == http.MethodGet {
		rCat := &ReturnCategories{}

		userHeader := r.Header.Get("X-User")
		if len(userHeader) != 0 {
			user := &User{}
			errDecode := json.Unmarshal([]byte(userHeader), &user)
			if errDecode != nil {
				http.Error(w, "Error getting user", http.StatusInternalServerError)
				return
			}

			scts, errGetCts := ctx.GStore.GetSavedCategories(user.UserID)
			if errGetCts != nil {
				http.Error(w, errGetCts.Error(), http.StatusInternalServerError)
				return
			}

			rCat.SavedCategories = scts
		} else {
			scts := make([]*Category, 0)
			rCat.SavedCategories = scts
		}

		cts, errDB := ctx.GStore.GetCategories()
		if errDB != nil {
			http.Error(w, errDB.Error(), http.StatusInternalServerError)
			return
		}
		rCat.Categories = cts

		encoded, errEncode := json.Marshal(rCat)
		if errEncode != nil {
			http.Error(w, "Error encoding user to JSON", http.StatusBadRequest)
			return
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(encoded)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

//SavedCategoriesHandler handles requests to save and unsave categories
func (ctx *GroupContext) SavedCategoriesHandler(w http.ResponseWriter, r *http.Request) {
	userHeader := r.Header.Get("X-User")
	if len(userHeader) == 0 {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	user := &User{}
	errDecode := json.Unmarshal([]byte(userHeader), &user)
	if errDecode != nil {
		http.Error(w, "Error getting user", http.StatusInternalServerError)
		return
	}

	pathid := path.Base(r.URL.Path)
	split := strings.Split(pathid, "&")
	pathid = split[0]
	pid, errConv := strconv.Atoi(pathid)
	if errConv != nil {
		http.Error(w, "Not an integer", http.StatusBadRequest)
		return
	}

	if r.Method == http.MethodPost {
		errSave := ctx.GStore.SaveCategory(pid, user.UserID)
		if errSave != nil {
			http.Error(w, "Error saving category", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("category saved"))
	} else if r.Method == http.MethodDelete {
		errDelete := ctx.GStore.UnsaveCategory(pid, user.UserID)
		if errDelete != nil {
			http.Error(w, "Error unsaving category", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("category unsaved"))
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

//GroupSearchHandler loads groups based on a search query.
func (ctx *GroupContext) GroupSearchHandler(w http.ResponseWriter, r *http.Request) {
	//GET: Load search results
	//inputs: search query
	//outputs: group struct(s), 200 status code
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

	userHeader := r.Header.Get("X-User")
	if len(userHeader) == 0 {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	user := &User{}
	errDecode := json.Unmarshal([]byte(userHeader), &user)
	if errDecode != nil {
		http.Error(w, "Error getting user", http.StatusInternalServerError)
		return
	}

	query, _ := r.URL.Query()["query"]
	if len(query) < 1 {
		query = append(query, "")
	}

	page, _ := r.URL.Query()["page"]
	if len(page) < 1 {
		page = append(page, "1")
	}
	pagenum, errConv := strconv.Atoi(page[0])
	if errConv != nil {
		http.Error(w, "Not an integer", http.StatusBadRequest)
		return
	}

	groups, errDB := ctx.GStore.SearchGroups(query[0], user.UserID, pagenum)
	if errDB != nil {
		http.Error(w, errDB.Error(), http.StatusInternalServerError)
		return
	}

	encoded, errEncode := json.Marshal(groups)
	if errEncode != nil {
		http.Error(w, "Error encoding user to JSON", http.StatusBadRequest)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(encoded)
}

//CreateGroupHandler is the create group controller, handles requests for creating a new group.
func (ctx *GroupContext) CreateGroupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
	//POST: Create new group
	//inputs: group struct
	//output: group struct, 201 status code
	userHeader := r.Header.Get("X-User")
	if len(userHeader) == 0 {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	user := &User{}
	errDecode := json.Unmarshal([]byte(userHeader), &user)
	if errDecode != nil {
		http.Error(w, "Error getting user", http.StatusInternalServerError)
		return
	}

	group := &Group{}
	errDecode = json.NewDecoder(r.Body).Decode(&group)
	if errDecode != nil {
		http.Error(w, "Bad input", http.StatusBadRequest)
		return
	}

	group.User = user
	group, errDB := ctx.GStore.CreateGroup(group)
	if errDB != nil {
		http.Error(w, errDB.Error(), http.StatusInternalServerError)
		return
	}

	encoded, errEncode := json.Marshal(group)
	if errEncode != nil {
		http.Error(w, "Error encoding user to JSON", http.StatusBadRequest)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(encoded)
}

//GroupHandler is the group controller, handles requests for existing groups.
func (ctx *GroupContext) GroupHandler(w http.ResponseWriter, r *http.Request) {
	userHeader := r.Header.Get("X-User")
	if len(userHeader) == 0 {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	user := &User{}
	errDecode := json.Unmarshal([]byte(userHeader), &user)
	if errDecode != nil {
		http.Error(w, "Error getting user", http.StatusInternalServerError)
		return
	}

	pathid := path.Base(r.URL.Path)
	split := strings.Split(pathid, "&")
	pathid = split[0]
	gid, errConv := strconv.Atoi(pathid)
	if errConv != nil {
		http.Error(w, "Not an integer", http.StatusBadRequest)
		return
	}

	group, errDB := ctx.GStore.GetGroup(gid)
	if errDB != nil {
		http.Error(w, errDB.Error(), http.StatusInternalServerError)
		return
	}
	if group == nil {
		http.Error(w, "Group does not exist", http.StatusBadRequest)
		return
	}
	if group.User.UserID != user.UserID {
		http.Error(w, "Access forbidden", http.StatusForbidden)
		return
	}

	//GET: Load group information
	//inputs: group id
	//outputs: group struct, 200 status code
	if r.Method == http.MethodGet {
		encoded, errEncode := json.Marshal(group)
		if errEncode != nil {
			http.Error(w, "Error encoding user to JSON", http.StatusBadRequest)
			return
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(encoded)
		//DELETE: Delete existing group
		//inputs: group id
		//output: 200 status code
	} else if r.Method == http.MethodDelete {
		errDelete := ctx.GStore.DeleteGroup(gid)
		if errDelete != nil {
			http.Error(w, errDelete.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Group deleted successfully"))
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

//SavedGroupHandler is the SavedGroupController, handles request for a user's existing saved groups and to save a new group
func (ctx *GroupContext) SavedGroupHandler(w http.ResponseWriter, r *http.Request) {
	userHeader := r.Header.Get("X-User")
	if len(userHeader) == 0 {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	user := &User{}
	errDecode := json.Unmarshal([]byte(userHeader), &user)
	if errDecode != nil {
		http.Error(w, "Error getting user", http.StatusInternalServerError)
		return
	}

	pathid := path.Base(r.URL.Path)
	split := strings.Split(pathid, "&")
	pathid = split[0]
	gid, errConv := strconv.Atoi(pathid)
	if errConv != nil {
		http.Error(w, "Not an integer", http.StatusBadRequest)
		return
	}

	if r.Method == http.MethodPost {
		errSave := ctx.GStore.SaveGroup(gid, user.UserID)
		if errSave != nil {
			http.Error(w, "Error saving group", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("group saved"))
		//DELETE: Remove a group from saved groups
		//inputs: group id
		//outputs: 200 status code
	} else if r.Method == http.MethodDelete {
		errDelete := ctx.GStore.UnsaveGroup(gid, user.UserID)
		if errDelete != nil {
			http.Error(w, "Error unsaving group", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("group unsaved"))
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
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
