package RouteHandler

import (
	"github.com/gin-gonic/gin"
	"log"
	"nokogiriwatir/area-selector/internal/DBService"
	"nokogiriwatir/area-selector/internal/Structures"
)

func StreetsHandler(g *gin.Context) {
	query := `Select distinct street from address group by street, id order by street`

	db := DBService.PgConnection()

	rows, err := db.Query(query)

	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	streets := make([]Structures.Street, 0)

	for rows.Next() {
		var s string
		err := rows.Scan(&s)
		if err != nil {
			log.Fatal(err)
		}
		streets = append(streets, Structures.Street{
			Name: s,
		})
	}

	if err != nil {
		log.Fatalln("Can't marchal street struct")
	}

	defer db.Close()
	g.Header("Access-Control-Allow-Origin", "*")
	g.JSON(200, streets)
}
