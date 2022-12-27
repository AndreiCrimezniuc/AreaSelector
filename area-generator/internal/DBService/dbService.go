package DBService

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

func PgConnection() *sql.DB {
	db, err := sql.Open("postgres", "user=odmin password=odmin dbname=odmin sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

	return db
}
