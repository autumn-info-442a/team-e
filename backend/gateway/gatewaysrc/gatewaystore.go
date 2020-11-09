package gatewaysrc

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql" //needed
)

//SQLStore holds db info
type SQLStore struct {
	DB *sql.DB
}

//GetUserInfo checks if the user is in the db, and if they are, returns the user info, otherwise creates the user in the databases
func (sqls *SQLStore) GetUserInfo(googleid string) (int, error) {
	var userid int
	insq := "select user_id from user where google_id = ?"

	errQuery := sqls.DB.QueryRow(insq, googleid).Scan(&userid)
	if errQuery != nil {
		if errQuery == sql.ErrNoRows {
			insq = "insert into user(google_id) values(?)"

			res, errExec := sqls.DB.Exec(insq, googleid)
			if errExec != nil {
				return 0, errExec
			}

			id, idErr := res.LastInsertId()
			if idErr != nil {
				return 0, idErr
			}
			userid = int(id)

			return userid, nil
		}
		return 0, errQuery
	}

	return userid, nil
}
