package RouteHandler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"nokogiriwatir/area-selector/internal/DBService"
	"nokogiriwatir/area-selector/internal/Structures"
)

func NumberHandler(g *gin.Context) {
	query := fmt.Sprintf("Select distinct house_number from address where street = '%s'", g.Param("street"))

	db := DBService.PgConnection()

	rows, err := db.Query(query)

	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	houseNumbers := make([]Structures.HouseNumbers, 0)

	for rows.Next() {
		var s string
		err := rows.Scan(&s)
		if err != nil {
			log.Fatal(err)
		}

		houseNumbers = append(houseNumbers, Structures.HouseNumbers{
			Number: s,
		})
	}

	if err != nil {
		log.Fatalln("Can't marchal street struct")
	}

	defer db.Close()

	g.Header("Access-Control-Allow-Origin", "*")
	g.JSON(200, houseNumbers)
}
