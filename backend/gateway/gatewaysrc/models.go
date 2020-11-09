package gatewaysrc

//User is the UserModel, stores information about a user
type User struct {
	UserID    int    `json:"id"`
	GoogleID  string `json:"googleId"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	PhotoURL  string `json:"photoUrl"`
}

//GatewayContext is the context needed for db calls in gateway
type GatewayContext struct {
	GStore GatewayStore
}
